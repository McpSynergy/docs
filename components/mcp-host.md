# MCP Host

## Overview

MCP Host is a server-side component that manages MCP servers and provides a unified interface for component rendering and tool execution.

## 概述

MCP Host 是一个服务器端组件，用于管理 MCP 服务器，并提供统一的组件渲染和工具执行接口。

## Installation

```bash
npm install @mcp-synergy/host
# or
yarn add @mcp-synergy/host
# or
pnpm add @mcp-synergy/host
```

## 安装

```bash
npm install @mcp-synergy/host
# 或
yarn add @mcp-synergy/host
# 或
pnpm add @mcp-synergy/host
```

## Usage

```typescript
import { MCPHost } from "@mcp-synergy/host"

const mcpHost = new MCPHost({
  mcpServer: {
    configPath: path.join(process.cwd(), "servers/express/mcp_servers.config.json")
  },
  mcpComponent: {
    configPath: path.join(process.cwd(), "servers/express/mcp_components.config.json")
  },
  watch: process.env.NODE_ENV !== 'production'
})

// Start the host
await mcpHost.start()

// Get available tools
const tools = await mcpHost.getTools()

// Call a tool
const result = await mcpHost.toolCall({
  serverName: "mcp-component-render",
  functionName: "render",
  params: {
    componentName: "Cart",
    props: {
      books: []
    }
  }
})
```

## 使用

```typescript
import { MCPHost } from "@mcp-synergy/host"

const mcpHost = new MCPHost({
  mcpServer: {
    configPath: path.join(process.cwd(), "servers/express/mcp_servers.config.json")
  },
  mcpComponent: {
    configPath: path.join(process.cwd(), "servers/express/mcp_components.config.json")
  },
  watch: process.env.NODE_ENV !== 'production'
})

// 启动主机
await mcpHost.start()

// 获取可用工具
const tools = await mcpHost.getTools()

// 调用工具
const result = await mcpHost.toolCall({
  serverName: "mcp-component-render",
  functionName: "render",
  params: {
    componentName: "Cart",
    props: {
      books: []
    }
  }
})
```

## Configuration

### MCPHost Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| mcpServer | object | Yes | Server configuration |
| mcpComponent | object | Yes | Component configuration |
| watch | boolean | No | Enable config file watching |

### 配置

### MCPHost 选项

| 选项 | 类型 | 是否必需 | 描述 |
|--------|------|----------|-------------|
| mcpServer | object | 是 | 服务器配置 |
| mcpComponent | object | 是 | 组件配置 |
| watch | boolean | 否 | 启用配置文件监控 |

## Features

- Connection management
- Configuration monitoring
- Tool execution
- Resource management
- Server installation and uninstallation
- Error handling
- TypeScript support

## 特性

- 连接管理
- 配置监控
- 工具执行
- 资源管理
- 服务器安装和卸载
- 错误处理
- TypeScript 支持

## API Reference

### Methods

| Method | Description |
|--------|-------------|
| start() | Start the MCP host |
| shutdown() | Shutdown the MCP host |
| getTools() | Get available tools |
| toolCall() | Call a specific tool |
| toolsBatch() | Batch call multiple tools |
| getResources() | Get available resources |
| readResource() | Read a specific resource |
| updateConnections() | Update server connections |
| batchInstallServer() | Install multiple servers |
| uninstallServer() | Uninstall a server |

### API 参考

### 方法

| 方法 | 描述 |
|--------|-------------|
| start() | 启动 MCP 主机 |
| shutdown() | 关闭 MCP 主机 |
| getTools() | 获取可用工具 |
| toolCall() | 调用特定工具 |
| toolsBatch() | 批量调用多个工具 |
| getResources() | 获取可用资源 |
| readResource() | 读取特定资源 |
| updateConnections() | 更新服务器连接 |
| batchInstallServer() | 安装多个服务器 |
| uninstallServer() | 卸载服务器 |

## Error Handling

The MCP Host includes comprehensive error handling:

1. Connection errors
2. Configuration errors
3. Tool execution errors
4. Resource access errors

Each error type is properly logged and can be handled by the application.

## 错误处理

MCP Host 包含全面的错误处理：

1. 连接错误
2. 配置错误
3. 工具执行错误
4. 资源访问错误

每种错误类型都会被正确记录，并可以由应用程序处理。 