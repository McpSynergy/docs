
# 项目架构

`server` 项目采用 pnpm + Turborepo 管理的 Monorepo 架构，代码库被划分为 `servers` 和 `packages`。

## 目录结构

```
.
├── servers/             # 服务实现目录
│   ├── express/         # Express 服务
│   └── mcpServers/      # MCP 相关服务
├── packages/            # 共享包目录
│   └── mcp-host/        # MCP Host 相关逻辑
└── ...
```

### `servers`

此目录包含项目核心的后端服务。

- **express**: 基于 Express 框架的 Web 服务器，是整个后端服务的入口。它处理 HTTP 请求，并与 `mcpServers` 进行交互。
- **mcpServers**: 实现了 MCP 协议的核心逻辑，负责与 AI 模型通信并构建 UI 组件的上下文。

### `packages`

此目录包含可共享的模块。

- **mcp-host**: 封装了作为 MCP Host 的通用功能和逻辑。
