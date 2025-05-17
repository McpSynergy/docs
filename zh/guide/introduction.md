# MCP Render 介绍

## 为什么需要 MCP Render？

MCP Render 的设计目的是在传统的网页智能助手聊天框中渲染可交互 UI。它的主要优势在于能够将服务端生成的数据（props）注入到 UI 组件中，无需在客户端发送请求，同时保持了简洁的行为和统一的使用方式。

## 实现组件

该解决方案由三个主要部分组成：

### 1. 前端 SDK

前端 SDK 负责在特定框架（如 React）中渲染动态组件。它实现了 `ChatComponent` 组件。

#### ChatComponent 概述
- MCP（Message Component Platform）组件的动态加载器
- 使用 React 的 lazy 和 Suspense 实现动态加载
- 包含错误边界处理
- 通过 MCPComponentContext 提供组件上下文

#### 主要特性
- 动态组件加载
- 属性验证
- 错误处理
- 上下文提供
- TypeScript 支持

### 2. 构建工具插件

一个 Vite 插件，用于识别 TypeScript 代码中的 `@mcp-comp` 注解，并生成 `mcp_components.config.json` 文件。

TypeScript 接口示例：
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
```

### 3. MCP Host

用于管理 MCP 服务器的服务端实现。

#### MCP Host SDK 特性
- 连接管理
- 配置监控
- 动态服务器更新
- 丰富的 API 接口
- 错误处理
- 安全特性

## 集成步骤

### 前端集成

1. 安装包：
```bash
npm install @mcp-synergy/react
```

2. 导入并使用组件：
```typescript
import { ChatComponent } from "@mcp-synergy/react"
```

### 后端集成（Express 示例）

1. 初始化 MCP Host：
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

2. 实现消息处理路由
3. 配置安全中间件
4. 设置 SSE 响应处理

### 自定义 MCP 服务器

自定义 MCP 服务器应返回一个 `props` 字段，该字段将通过 Express 发送到前端。 