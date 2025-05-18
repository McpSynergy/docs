# 快速开始

## 前置要求

在开始之前，请确保您已安装以下软件：
- Node.js（版本 14 或更高）
- npm 或 yarn
- 现代网页浏览器

## 安装

### 前端设置

1. 安装 React SDK：
```bash
npm install @mcp-synergy/react
```

2. 在您的 React 应用中导入 ChatComponent：
```typescript
import { ChatComponent } from "@mcp-synergy/react"
```

3. 在聊天界面中使用组件：
```typescript
function ChatInterface() {
  return (
    <div className="chat-container">
      <ChatComponent
        name="Cart"
        props={cartProps}
        fallback={<div>加载中...</div>}
      />
    </div>
  )
}
```

### 后端设置

1. 安装 MCP Host 包：
```bash
npm install @mcp-synergy/host
```

2. 在您的 Express 应用中初始化 MCP Host：
```typescript
import { MCPHost } from '@mcp-synergy/host'
import path from 'path'

const mcpHost = new MCPHost({
  mcpServer: {
    configPath: path.join(process.cwd(), "servers/express/mcp_servers.config.json")
  },
  mcpComponent: {
    configPath: path.join(process.cwd(), "servers/express/mcp_components.config.json")
  },
  watch: process.env.NODE_ENV !== 'production'
})

// 启动 host
await mcpHost.start()
```

3. 设置消息处理路由：
```typescript
app.post('/message', async (req, res) => {
  try {
    const { messages } = req.body
    
    // 从 MCP Host 获取可用工具
    const tools = await mcpHost.getTools()
    
    // 处理消息并处理工具调用
    // ... 实现细节 ...
    
    res.json({
      content: response,
      meta: {
        toolName: 'Cart',
        componentProps: cartProps
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
```

## 构建工具配置

1. 安装 Vite 插件：
```bash
npm install vite-plugin-mcp --save-dev
```

2. 在 `vite.config.ts` 中配置插件：
```typescript
import { defineConfig } from 'vite'
import { MCPComp } from 'vite-plugin-mcp'

export default defineConfig({
  plugins: [
    MCPComp({
      pushConfig: {
        serverUrl: 'http://localhost:3000/api/config',
        projectId: 'your-project-id',
        env: 'development'
      }
    })
  ]
})
```

## 下一步

- 了解[配置](/zh/guide/configuration)
<!-- - 探索[API 参考](/zh/api/)
- 查看[示例](/zh/examples/)  -->