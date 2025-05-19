# 配置

## 前端配置

### ChatComponent 属性

`ChatComponent` 接受以下属性：

```typescript
interface ChatComponentProps {
  name: string;           // 要渲染的组件名称
  props: any;            // 传递给组件的属性
  fallback?: ReactNode;  // 加载状态组件
  errorFallback?: ReactNode; // 错误状态组件
}
```

### 使用示例

## 后端配置

### MCP Host 配置

MCP Host 可以使用以下选项进行配置：

```typescript
interface MCPHostConfig {
  mcpServer: {
    configPath: string;  // mcp_servers.config.json 的路径
  };
  mcpComponent: {
    configPath: string;  // mcp_components.config.json 的路径
  };
  watch?: boolean;      // 启用配置文件监视
}
```

### 服务器配置文件

`mcp_servers.config.json` 文件应遵循以下结构：

```json
{
  "servers": [
    {
      "name": "cart-server",
      "type": "stdio",
      "command": "node ./servers/cart-server.js",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

### 组件配置文件

`mcp_components.config.json` 文件由 Vite 插件自动生成，但您也可以手动创建：

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
              "id": { "type": "string" },
              "title": { "type": "string" },
              "author": { "type": "string" },
              "cover": { "type": "string" },
              "price": { "type": "number" },
              "count": { "type": "number" }
            }
          }
        }
      }
    },
    "description": "显示购物车信息",
    "serverName": "cart-server"
  }
]
```

## 构建工具配置

### Vite 插件配置

Vite 插件可以使用以下选项进行配置：

```typescript
interface MCPCompConfig {
  pushConfig?: {
    serverUrl: string;    // 配置服务器 URL
    projectId: string;    // 项目标识符
    env: string;         // 环境（development/production）
  };
  outputPath?: string;   // 配置文件的自定义输出路径
}
```

### 配置示例

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { MCPComp } from 'vite-plugin-mcp'

export default defineConfig({
  plugins: [
    MCPComp({
      pushConfig: {
        serverUrl: 'http://localhost:3000/api/config',
        projectId: 'my-project',
        env: process.env.NODE_ENV
      },
      outputPath: './dist/mcp'
    })
  ]
})
```

## 环境变量

以下环境变量可用于配置系统：

- `MCP_SERVER_URL`: MCP 服务器 URL
- `MCP_PROJECT_ID`: 项目标识符
- `MCP_ENV`: 环境（development/production）
- `MCP_WATCH`: 启用文件监视（true/false）

## 安全注意事项

1. 始终在服务器端验证组件属性
2. 对所有服务器通信使用 HTTPS
3. 实现适当的身份验证和授权
4. 清理所有用户输入
5. 保持依赖项更新 