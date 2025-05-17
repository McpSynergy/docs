# mcp render docs

## Why

我们为什么需要 MCP render? 为了能够在传统的网页智能助手聊天框中渲染可交互 UI ，并且这个 UI 的数据（props）可以由服务端生成注入进去，好处是不需要在客户端发送请求，保持了简洁的行为和统一的使用姿势。

## 实现步骤

这个方案由三个部分组成

1、前端 SDK，需要实现一个前端的 SDK 用于在指定框架中渲染动态组件，比如 react，需要实现 ChatComponent 组件。

ChatComponent react 组件概述
这是一个动态组件加载器，主要用于加载和渲染 MCP（可能是 Message Component Platform）组件
使用了 React 的 lazy 和 Suspense 实现动态加载
包含了错误边界处理机制
主要功能
动态加载组件：通过 lazy 加载方式实现组件的按需加载
属性验证：通过 validateComponent 函数验证组件必需的属性
错误处理：包含多层错误处理机制（验证错误、加载错误、运行时错误）
上下文提供：通过 MCPComponentContext 提供组件上下文信息
核心特性
支持组件属性验证
提供加载状态展示（fallback）
提供错误状态展示（errorFallback）
支持动态属性传递
使用 TypeScript 确保类型安全

2、需要实现一个构建工具的插件，这里以 vite 为主，识别代码类型中的 @mcp-comp 标识，比如下面的类型


```typescript
/**
 * @mcp-comp Cart
 * @mcp-prop-path books
 */
export interface Book { 
    id: string;    
    title: string;
    author: string;
    cover: string;
    price: number;
    count: number;
}

/**
 * @mcp-comp Cart
 * @mcp-description Display shopping cart information
 * @mcp-server-name mcp-component-render
 */
export interface BooksCartProps {
  books?: Book[];
  handleGoBack?: () => void;
  onRemove?: (id: string) => void;
}
```

会将类型转换成一个 mcp_components.config.json,数据结构如下：

```json
[
  {
    "name": "Cart",
    "propertySchema": {
      "type": "object",
      "properties": {
        "books": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "author": {
                "type": "string"
              },
              "cover": {
                "type": "string"
              },
              "price": {
                "type": "number"
              },
              "count": {
                "type": "number"
              }
            },
            "required": [
              "id",
              "title",
              "author",
              "cover",
              "price",
              "count"
            ]
          }
        },
        "handleGoBack": {
          "type": "object"
        },
        "onRemove": {
          "type": "object"
        }
      },
      "required": []
    },
    "description": "Display shopping cart information",
    "serverName": "mcp-component-render"
  }
]
```

而后会将这个文件的数据上传到指定的服务器中.

```typescript
import { MCPComp } from "vite-plugin-comp";

MCPComp({
    pushConfig: {
      serverUrl: 'http://localhost:3000/api/config',
      projectId: 'antd-example',
      env: 'development'
    }
  })
```


3、在服务端实现一个 mcp host 用于管理 mcp servre，后端需要起一服务，在服务里面使用 mcp host

## mcp host sdk
MCP Host 的功能和实现：
这是一个名为 MCPHost 的类，它看起来是一个连接管理器的主机实现。让我详细解释它的主要功能：
基本结构：
类中包含一个私有的 connectionManager 属性，类型为 MCPConnectionManager 或 null
通过构造函数接收配置信息，包括 mcpServer、mcpComponent 和 watch 参数
核心功能：
start(): 启动连接管理器
shutdown(): 停止连接管理器
withAction: 一个高阶函数，用于包装各种操作，确保在执行操作前检查连接管理器是否存在
提供的操作接口：
getTools: 获取工具列表
toolCall: 调用工具
toolsBatch: 批量调用工具
getResources: 获取资源
readResource: 读取资源
updateConnections: 更新连接
batchInstallServer: 批量安装服务器
uninstallServer: 卸载服务器（注意：这里似乎有一个bug，它使用了 batchInstallServer 作为实现）
设计特点：
使用了 TypeScript 的泛型特性，特别是在 withAction 方法中
采用了函数式编程的方式，通过 withAction 统一处理各种操作
每个操作都会返回一个包含 meta 信息的对象，或者在没有连接管理器时返回 null
让我查看一下相关的实现文件，以便提供更多细节。
基于搜索结果，我可以更详细地解释这个 MCP Host 的功能：
核心功能：
这是一个服务器连接管理器，用于管理和维护与多个 MCP 服务器的连接
支持动态监控配置文件变化，自动更新连接状态
提供了丰富的 API 接口用于与服务器进行交互
主要组件：
MCPConnectionManager：核心连接管理器，负责：
维护服务器连接池
监控配置文件变化
处理连接的创建、更新和删除
管理连接状态
配置管理：
支持两种配置：
mcpServer：服务器配置
mcpComponent：组件配置
可以实时监控配置文件变化，自动更新连接
连接管理功能：
自动连接管理：
创建新连接
重启现有连接
移除失效连接
连接状态追踪：
记录每个连接的状态（connected、connecting、error、disconnected）
维护配置缓存
提供的操作接口：
getTools：获取可用工具列表
toolCall：调用单个工具
toolsBatch：批量调用工具
getResources：获取资源
readResource：读取资源内容
updateConnections：更新连接状态
batchInstallServer：批量安装服务器
uninstallServer：卸载服务器
安全特性：
防止并发更新操作
错误处理和日志记录
连接状态监控和自动恢复
扩展性：
使用 TypeScript 泛型实现灵活的操作包装
支持自定义配置和监控选项
提供统一的错误处理机制
这个系统主要用于管理多个 MCP 服务器的连接，支持动态配置更新，并提供了丰富的 API 接口用于与这些服务器进行交互。它特别适合需要管理多个服务器连接，并且需要实时响应配置变化的场景。


## 集成步骤

### 前端

前端需要下载安装 @mcp-synergy/react

```typescript

import { ChatComponent } from "@mcp-synergy/react"

```

使用步骤

用户输入消息后，通过 Sender 组件的 onSubmit 触发 onRequest
onRequest 会调用 useXAgent 中定义的请求函数
请求函数发送 POST 请求到服务器，并处理响应数据
响应数据通过 onSuccess 传递给 useXChat
useXChat 更新消息列表
消息列表通过 Bubble.List 组件渲染
如果消息中包含 meta 数据，就会渲染 ChatComponent，并将 meta.toolName 和 meta.componentProps 传递给 ChatComponent
特别注意的是，ChatComponent 接收三个属性：
name: 来自 meta.toolName
props: 来自 meta.componentProps
fallback: 一个空组件，用于降级显示


从上面的信息得知，接口返回的数据结构需要包含 ChatComponent 需要的 name ，以及 props



### 后端
以 express 为例子

这个 express 应用做了什么事情？

需要集成 mcp host
MCP 集成
支持多种 MCP 服务器类型：
stdio 类型服务器
SSE 类型服务器
可配置的 MCP 组件系统
支持动态更新 MCP 配置

```typescript
const mcpHost = new MCPHost({
  mcpServer: {
    configPath: path.join(process.cwd(), "servers/express/mcp_servers.config.json")
  },
  mcpComponent: {
    configPath: path.join(process.cwd(), "servers/express/mcp_components.config.json")
  },
  watch: process.env.NODE_ENV !== 'production'
});

```

而后在聊天的 route `/message` 路径中实现

让我为您详细解释 /message 路由的实现流程：
请求处理流程
接收 POST 请求，需要包含 messages 数组
请求需要包含 x-signature 头部进行签名验证
使用 SSE（Server-Sent Events）格式返回响应
工具获取和配置

从 MCP 主机获取可用工具列表
将工具列表转换为 OpenAI 工具格式
工具名称格式为：${serverName}_${functionName}
AI 对话处理

使用 DeepSeek API 进行对话
支持工具调用功能
默认系统提示词为 "You are a helpful assistant."
工具调用处理
如果 AI 决定调用工具（finish_reason === "tool_calls"）：
解析工具名称和参数
从工具名称中提取服务器名和函数名
通过 MCP 主机执行工具调用
处理工具调用结果
响应格式

错误处理
捕获并处理所有可能的错误
返回 500 状态码和错误信息
在生产环境中隐藏详细错误信息
安全特性
使用签名中间件验证请求
支持 CORS 配置
使用 SSE 进行流式响应
示例请求

这个路由实现了一个智能对话系统，它能够：
处理用户输入
调用 AI 模型进行响应
支持工具调用功能
提供流式响应
确保安全性
处理错误情况
这是一个完整的对话处理流程，集成了 AI 模型和工具调用功能，适合用于构建智能对话应用。


### 自定义的 mcp server

需要返回一个 props 字段，用于在 express 返回给前端
