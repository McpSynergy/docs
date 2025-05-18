---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: MCP Render
  text: 强大的聊天界面组件渲染系统
  tagline: 在传统网页聊天界面中渲染交互式 UI 组件
  image:
    src: /logo.svg
    alt: MCP Render
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/orgs/McpSynergy/repositories


features:
  - title: 动态组件加载
    details: 使用 React 的 lazy 和 Suspense 在聊天界面中动态加载和渲染组件
  - title: 服务端属性注入
    details: 无需客户端请求，直接从服务端注入组件属性
  - title: 类型安全
    details: 完整的 TypeScript 支持，提供全面的类型检查和验证
  - title: 构建工具集成
    details: 通过插件与 Vite 等构建工具无缝集成
---



## 为什么选择 MCP Render？

MCP Render 使我们能够在传统的网页聊天界面中渲染交互式 UI 组件。其核心优势在于组件数据（props）可以由服务端生成注入，无需在客户端发送请求，保持了简洁的行为和统一的使用姿势。

## 核心特性

- 基于 React 的动态组件加载
- 服务端属性注入
- TypeScript 支持
- 构建工具集成
- 错误边界处理
- 加载状态管理
