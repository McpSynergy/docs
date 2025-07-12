# Vue 集成指南

本指南将引导您如何将 McpSynergy Client 集成到一个现有的 Vue 3 + Vite 项目中。

## 先决条件

- Node.js >= 18
- pnpm (推荐)
- 一个可用的 Vue 3 + Vite 项目

---

### 步骤 1: 安装依赖

首先，将 McpSynergy 的 Vue 核心包和专用的 Vite 插件添加到您的项目中。

```bash
pnpm add @mcp-synergy/vue @mcp-synergy/client-core
pnpm add -D @mcp-synergy/vite-plugin-comp-vue
```

### 步骤 2: 配置 Vite 插件

在您的 `vite.config.ts` 文件中，导入并使用 `MCPCompVue` 插件。

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { MCPCompVue } from "@mcp-synergy/vite-plugin-comp-vue"; // 1. 导入Vue插件

export default defineConfig({
  plugins: [
    vue(),
    MCPCompVue(), // 2. 添加插件
  ],
});
```

> 了解更多插件配置和 React 的用法，请查阅 [Vite 插件](./vite-plugins.md) 文档。

### 步骤 3: 创建您的第一个 MCP 组件

在您的组件目录（例如 `src/components`）下，创建一个新的 `.vue` 文件。我们将以一个 `UserProfile` 卡片为例。

**`src/components/UserProfile.vue`**:

```vue
<script setup lang="ts">
import { defineProps } from "vue";

// 1. 定义组件的 Props 接口
interface UserProfileProps {
  user: {
    name: string;
    title: string;
    avatar: string;
  };
}

// 2. 使用 defineProps 声明 props
const props = defineProps<UserProfileProps>();

// 3. 使用 defineMCPComponent 宏“注册”该组件
defineMCPComponent({
  name: "UserProfile",
  description: "显示用户信息的卡片。",
  // 从 UserProfileProps 中挑选 'user' 属性，将其 props 的信息加入 schema
  pickProps: ["user"],
  // 定义 AI 调用此工具所需的输入参数
  inputSchema: {
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "需要查询的用户名",
      },
    },
  },
});
</script>

<template>
  <div
    v-if="props.user"
    style="border: 1px solid #ccc; padding: 16px; border-radius: 8px;"
  >
    <img
      :src="props.user.avatar"
      :alt="props.user.name"
      style="width: 80px; height: 80px; border-radius: 50%;"
    />
    <h2>{{ props.user.name }}</h2>
    <p>{{ props.user.title }}</p>
  </div>
  <div v-else>用户不存在</div>
</template>
```

### 步骤 4: 在您的应用中使用 `ChatComponent`

现在，在您的聊天界面中，使用 `<ChatComponent />` 来处理来自服务器的响应。

```vue
<!-- src/views/ChatView.vue (或您的聊天界面组件) -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ChatComponent } from "@mcp-synergy/vue";

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
          title: "全栈工程师",
          avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
        },
      },
    },
  },
};

const response = ref<any>(null);

// 模拟API请求
onMounted(() => {
  setTimeout(() => {
    response.value = fakeServerResponse;
  }, 1000);
});
</script>

<template>
  <div>
    <h1>我的 Vue 聊天应用</h1>
    <div v-if="!response">正在等待AI响应...</div>
    <div v-else>
      <ChatComponent
        v-if="
          response.data.meta?.toolName && response.data.meta.toolName !== 'null'
        "
        :name="response.data.meta.toolName"
        :props="response.data.meta.componentProps"
      >
        <template #fallback>
          <div>组件加载中...</div>
        </template>
      </ChatComponent>
      <div v-else>
        {{ response.data.content }}
      </div>
    </div>
  </div>
</template>
```

### 步骤 5: 启动项目

运行您的开发服务器：

```bash
pnpm dev
```

现在您应该能看到 `UserProfile` 组件被成功渲染出来了。

您已经成功集成了 McpSynergy Client 的 Vue 版本！接下来，您可以查阅 [API 参考](./api-reference.md) 和 [API 协议](../shared/api-contract.md) 来了解更多细节。
