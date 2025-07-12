
# 项目架构

`client` 项目采用 pnpm + Turborepo 管理的 Monorepo 架构，代码库被划分为 `apps` 和 `packages`。

## 目录结构

```
.
├── apps/                # 应用程序目录
│   ├── antd-example/    # Ant Design 示例应用
│   └── vue3-exmplate/   # Vue3 示例应用
├── packages/            # 共享包目录
│   ├── client-core      # 客户端核心逻辑
│   ├── react            # React 组件库
│   ├── vue              # Vue 组件库
│   ├── vite-plugin-comp # Vite 插件
│   └── vite-plugin-comp-vue # Vue 相关的 Vite 插件
└── ...
```

### `apps`

此目录包含可以直接运行的示例应用程序，用于展示 `client` 的集成和使用方法。

- **antd-example**: 一个基于 Ant Design 的 React 示例。
- **vue3-exmplate**: 一个基于 Vue 3 的示例。

### `packages`

此目录包含可共享的模块，是 `client` 项目的核心功能所在。

- **client-core**: 封装了与 MCP 协议交互的核心逻辑。
- **react**: 提供了在 React 应用中渲染 UI 组件的封装。
- **vue**: 提供了在 Vue 应用中渲染 UI 组件的封装。
- **vite-plugin-comp**: Vite 插件，用于处理组件的编译和集成。
- **vite-plugin-comp-vue**: 针对 Vue 的 Vite 插件。
