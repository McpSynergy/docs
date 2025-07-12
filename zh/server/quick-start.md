# 快速入门

本指南将引导您如何设置和运行 `server` 项目，并理解其基本工作流程。

## 先决条件

- Node.js >= 18
- pnpm (推荐)
- 一个可用的 OpenAI API 密钥

---

### 步骤 1: 安装依赖

首先，克隆整个 monorepo（如果尚未克隆），然后进入 `server` 目录并安装其依赖项。

```bash
# 假设您在 monorepo 的根目录
cd server
pnpm install
```

### 步骤 2: 配置环境变量

`server` 项目需要连接到 OpenAI 服务。您需要创建一个 `.env` 文件，并填入您的 API 密钥。

1.  在 `server` 目录下，直接创建一个名为 `.env` 的新文件。
2.  在 `.env` 文件中添加以下内容：

    ```
    OPENAI_API_KEY="sk-..."
    ```

    将 `sk-...` 替换为您自己的 OpenAI API 密钥。

### 步骤 3: 理解工具 Schema

服务器需要知道客户端有哪些可用的组件（工具）。这是通过一个名为 `mcp-comp-schema.json` 的文件实现的。

在我们的示例设置中，`express` 服务会尝试从一个预设的路径或环境变量加载这个 schema。为了快速启动，您可以将 `client` 项目生成的 `mcp-comp-schema.json` 文件复制到 `server/servers/express/src/config` 目录下，或者配置相应的环境变量指向该文件。

> 在一个典型的开发流程中，`client` 端的 Vite 插件会自动将这个 schema 推送到 `server` 的某个端点。

### 步骤 4: 启动开发服务器

现在，您可以启动 `express` 开发服务器。

```bash
pnpm dev:express
```

此命令会：

1.  首先构建 `mcpServers` 包。
2.  然后以热重载模式启动 `express` 服务器。

默认情况下，服务器会运行在 `http://localhost:3000`。

### 步骤 5: 测试 API

您可以使用 `curl` 或任何 API 测试工具向服务器发送请求，来模拟一次聊天交互。

```bash
curl -X POST http://localhost:3000/api/message \
-H "Content-Type: application/json" \
-d '{
  "messages": [
    {
      "role": "user",
      "content": "给我推荐几本书"
    }
  ]
}'
```

观察服务器的控制台输出和返回的 JSON 数据。如果您的提问命中了某个工具（例如 `RecommendBook`），您将在返回的 `meta` 对象中看到 `toolName` 和 `componentProps` 字段。

如果返回的数据中 `toolName` 不为 `null`，那么恭喜您，服务器已经成功地将您的自然语言请求转换为了一个 UI 组件渲染指令！

<!-- 接下来，您可以尝试 [创建您自己的工具](./creating-tools.md)。 -->
