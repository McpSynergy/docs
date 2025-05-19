# ChatComponent

## Overview

`ChatComponent` is a dynamic component loader for React applications that enables rendering MCP components in chat interfaces.

## 概述

`ChatComponent` 是一个用于 React 应用的动态组件加载器，用于在聊天界面中渲染 MCP 组件。

## Installation

```bash
npm install @mcp-synergy/react
# or
yarn add @mcp-synergy/react
# or
pnpm add @mcp-synergy/react
```

## 安装

```bash
npm install @mcp-synergy/react
# 或
yarn add @mcp-synergy/react
# 或
pnpm add @mcp-synergy/react
```

## Usage

```typescript
import { ChatComponent } from "@mcp-synergy/react"

function App() {
  return (
    <ChatComponent
      name="Cart"
      props={{
        books: [
          {
            id: "1",
            title: "Book 1",
            author: "Author 1",
            cover: "cover1.jpg",
            price: 29.99,
            count: 1
          }
        ],
        handleGoBack: () => console.log("Go back"),
        onRemove: (id) => console.log("Remove", id)
      }}
      fallback={<div>Loading...</div>}
    />
  )
}
```

## 使用

```typescript
import { ChatComponent } from "@mcp-synergy/react"

function App() {
  return (
    <ChatComponent
      name="Cart"
      props={{
        books: [
          {
            id: "1",
            title: "书籍 1",
            author: "作者 1",
            cover: "cover1.jpg",
            price: 29.99,
            count: 1
          }
        ],
        handleGoBack: () => console.log("返回"),
        onRemove: (id) => console.log("删除", id)
      }}
      fallback={<div>加载中...</div>}
    />
  )
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| name | string | Yes | The name of the MCP component to render |
| props | object | Yes | The props to pass to the component |
| fallback | ReactNode | No | Component to show while loading |

## 属性

| 属性 | 类型 | 是否必需 | 描述 |
|------|------|----------|-------------|
| name | string | 是 | 要渲染的 MCP 组件名称 |
| props | object | 是 | 传递给组件的属性 |
| fallback | ReactNode | 否 | 加载时显示的组件 |

## Features

- Dynamic component loading using React.lazy and Suspense
- Property validation
- Error boundary handling
- Context provision through MCPComponentContext
- Loading state management
- TypeScript support

## 特性

- 使用 React.lazy 和 Suspense 实现动态组件加载
- 属性验证
- 错误边界处理
- 通过 MCPComponentContext 提供上下文
- 加载状态管理
- TypeScript 支持

## Error Handling

The component includes multiple layers of error handling:

1. Validation errors
2. Loading errors
3. Runtime errors

Each error type has its own error boundary and fallback UI.

## 错误处理

组件包含多层错误处理：

1. 验证错误
2. 加载错误
3. 运行时错误

每种错误类型都有自己的错误边界和降级 UI。

## TypeScript Support

The component is fully typed and provides type checking for:

- Component names
- Props structure
- Event handlers
- Context values

## TypeScript 支持

组件完全支持类型检查，包括：

- 组件名称
- 属性结构
- 事件处理函数
- 上下文值 