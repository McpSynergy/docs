# React 快速入门

本指南将引导您如何将 `@mcp-synergy/react` 集成到一个现有的 React + Vite 项目中。

## 先决条件

- Node.js >= 18
- pnpm (推荐)
- 一个可用的 React + Vite 项目

---

### 步骤 1: 安装依赖

首先，将 McpSynergy 的核心包和 Vite 插件添加到您的项目中。

```bash
pnpm add @mcp-synergy/react @mcp-synergy/client-core
pnpm add -D @mcp-synergy/vite-plugin-comp
```

### 步骤 2: 配置 Vite 插件

在您的 `vite.config.ts` 文件中，导入并使用 `MCPComp` 插件。这个插件是实现动态组件加载的关键。

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { MCPComp } from "@mcp-synergy/vite-plugin-comp"; // 1. 导入插件

export default defineConfig({
  plugins: [
    react(),
    MCPComp(), // 2. 添加插件
  ],
});
```

> 了解更多插件配置，请查阅 [Vite 插件](./vite-plugins.md) 文档。

### 步骤 3: 创建您的第一个 MCP 组件

在您的组件目录（例如 `src/components`）下，创建一个新的组件文件。让我们以一个简单的 `UserProfile` 卡片为例。

**`src/components/UserProfile.tsx`**:

```tsx
import React from "react";

/**
 * @mcp-comp UserProfile
 * @mcp-description 显示用户信息的卡片。
 */
export interface UserProfileProps {
  user: {
    name: string;
    title: string;
    avatar: string;
  };
}

/**
 * @mcp-input-required 需要查询的用户名
 */
interface UserProfileInputs {
  name: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) return <div>用户不存在</div>;

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}
    >
      <img
        src={user.avatar}
        alt={user.name}
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
      />
      <h2>{user.name}</h2>
      <p>{user.title}</p>
    </div>
  );
};

export default UserProfile;
```

> **关键点:**
>
> - `@mcp-comp UserProfile`: 这行 JSDoc 注释至关重要。它将这个组件“注册”为一个名为 `UserProfile` 的 MCP 工具。
> - `@mcp-input-required`: 这告诉 AI，要调用这个工具，必须提供 `name` 这个参数。

### 步骤 4: 在您的应用中使用 `ChatComponent`

现在，在您的聊天界面中，使用 `<ChatComponent />` 来处理来自服务器的响应。

```tsx
// src/App.tsx (或您的聊天界面组件)
import { useState, useEffect } from "react";
import { ChatComponent } from "@mcp-synergy/react";

// 模拟从服务器获取的响应
const fakeServerResponse = {
  code: 0,
  data: {
    content: "这是用户的个人资料。",
    meta: {
      serverName: "mcp-component-render",
      toolName: "UserProfile", // AI决定调用这个工具
      componentProps: {
        // AI准备好的props
        user: {
          name: "Jay",
          title: "高级软件工程师",
          avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
        },
      },
    },
  },
};

function App() {
  const [response, setResponse] = useState<any>(null);

  // 模拟API请求
  useEffect(() => {
    // 在真实应用中，这里会是一个 fetch 调用
    // fetch('/api/message', { ... })
    //   .then(res => res.json())
    //   .then(data => setResponse(data));
    setTimeout(() => setResponse(fakeServerResponse), 1000);
  }, []);

  if (!response) {
    return <div>正在等待AI响应...</div>;
  }

  const { meta } = response.data;

  return (
    <div>
      <h1>我的聊天应用</h1>
      {meta?.toolName && meta.toolName !== "null" ? (
        <ChatComponent
          name={meta.toolName}
          props={meta.componentProps}
          fallback={<div>组件加载中...</div>}
        />
      ) : (
        <div>{response.data.content}</div>
      )}
    </div>
  );
}

export default App;
```

### 步骤 5: 启动项目

运行您的开发服务器：

```bash
pnpm dev
```

现在您应该能看到 `UserProfile` 组件被成功渲染出来了。

您已经成功集成了 McpSynergy Client！接下来，您可以查阅 [API 参考](./api-reference.md) 和 [API 协议](../shared/api-contract.md) 来了解更多细节。
