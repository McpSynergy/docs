# Introduction to MCP Render

## Overview

MCP Render is a powerful system that enables rendering interactive UI components in traditional web chat interfaces. It consists of three main parts:

1. Frontend SDK
2. Build Tool Plugin
3. Backend MCP Host

## 概述

MCP Render 是一个强大的系统，使我们能够在传统的网页智能助手聊天框中渲染可交互 UI。它由三个主要部分组成：

1. 前端 SDK
2. 构建工具插件
3. 后端 MCP Host

## Architecture

### Frontend SDK

The frontend SDK provides a `ChatComponent` that enables dynamic component loading in React applications. Key features include:

- Dynamic component loading using React.lazy and Suspense
- Property validation
- Error boundary handling
- Context provision through MCPComponentContext
- Loading state management
- TypeScript support

### 架构

#### 前端 SDK

前端 SDK 提供了 `ChatComponent`，用于在 React 应用中实现动态组件加载。主要特性包括：

- 使用 React.lazy 和 Suspense 实现动态组件加载
- 属性验证
- 错误边界处理
- 通过 MCPComponentContext 提供上下文
- 加载状态管理
- TypeScript 支持

### Build Tool Plugin

The build tool plugin (currently supporting Vite) processes TypeScript interfaces marked with `@mcp-comp` annotations to generate component configurations. It:

- Identifies MCP components through annotations
- Generates JSON schema for component properties
- Uploads configuration to specified servers

### 构建工具插件

构建工具插件（目前支持 Vite）处理带有 `@mcp-comp` 注解的 TypeScript 接口，生成组件配置。它：

- 通过注解识别 MCP 组件
- 生成组件属性的 JSON schema
- 将配置上传到指定服务器

### Backend MCP Host

The MCP Host is a server-side component that manages MCP servers. It provides:

- Connection management
- Configuration monitoring
- Tool execution
- Resource management
- Server installation and uninstallation

### 后端 MCP Host

MCP Host 是一个服务器端组件，用于管理 MCP 服务器。它提供：

- 连接管理
- 配置监控
- 工具执行
- 资源管理
- 服务器安装和卸载

## Getting Started

To get started with MCP Render, you'll need to:

1. Install the frontend SDK
2. Configure the build tool plugin
3. Set up the MCP Host server

See the following sections for detailed instructions.

## 开始使用

要开始使用 MCP Render，你需要：

1. 安装前端 SDK
2. 配置构建工具插件
3. 设置 MCP Host 服务器

请参阅以下章节获取详细说明。 