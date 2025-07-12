# Vite 插件

`@mcp-synergy/client` 生态系统依赖于 Vite 插件来自动化组件的发现和 schema 的生成。根据您使用的前端框架，需要选择不同的插件。

- **React**: `@mcp-synergy/vite-plugin-comp`
- **Vue**: `@mcp-synergy/vite-plugin-comp-vue`

尽管插件不同，但它们的核心功能是一致的。

## 核心功能

- **自动组件发现**: 插件会根据 `include` 和 `exclude` 选项扫描您的项目，以查找被标记为 MCP 组件的文件。
- **Schema 生成**: 插件会解析组件的元信息和类型定义，以创建一个 schema 文件（例如 `mcp-comp-schema.json`）。这个文件是**至关重要的前后端通信契约**，它不仅定义了数据结构，还被用于**客户端和服务端的数据校验**。
- **动态导入**: 插件设置了虚拟模块（如 `virtual:mcp-comp/imports`），使得 `ChatComponent` 能够懒加载（lazy-load）和动态渲染组件，而无需您手动注册。
- **配置推送**: （可选）插件可以将生成的 schema 推送到指定的服务器端点，从而实现开发流程的自动化。

---

## React 框架插件 (`vite-plugin-comp`)

### 配置

在您的 `vite.config.ts` 文件中，导入并使用该插件。

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { MCPComp } from "@mcp-synergy/vite-plugin-comp"; // 导入插件

export default defineConfig({
  plugins: [
    react(),
    MCPComp({
      debug: true,
      pushConfig: {
        serverUrl: "http://localhost:3000/config",
        projectId: "your-project-id",
      },
    }),
  ],
});
```

### 创建组件 (使用 JSDoc)

React 插件通过解析 `.tsx` 文件中的 JSDoc 注释和 TypeScript `interface` 来识别组件。

```tsx
import React from "react";

/**
 * @mcp-comp MediaCard
 * @mcp-title 媒体卡片
 * @mcp-description 用于显示电影或视频信息的卡片。
 */
export interface MediaCardProps {
  /**
   * @mcp-prop-title 电影信息
   */
  movie: {
    id: number;
    title: string;
    poster: string;
  };
  /**
   * @mcp-input-required 用户想看的电影标题
   */
  title: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ movie }) => {
  // ... 组件实现
};

export default MediaCard;
```

- `@mcp-comp <ComponentName>`: **必需**。将一个 `interface` 标记为 MCP 组件的 Props 定义。
- `@mcp-input-required <Description>`: 标记一个属性为 AI 的必需输入参数。

---

## Vue 框架插件 (`vite-plugin-comp-vue`)

对于 Vue，插件的用法有所不同，它依赖于**宏调用**而不是 JSDoc。

### 配置

在您的 `vite.config.ts` 文件中，导入并使用 Vue 专用的插件。

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { MCPCompVue } from "@mcp-synergy/vite-plugin-comp-vue"; // 导入Vue插件

export default defineConfig({
  plugins: [
    vue(),
    MCPCompVue({
      debug: true,
      pushConfig: {
        serverUrl: "http://localhost:3000/config",
        projectId: "your-project-id",
      },
    }),
  ],
});
```

### 创建组件 (使用宏)

在 `.vue` 文件的 `<script setup>` 中，使用 `defineMCPComponent` 宏和 `defineProps`。

```vue
<script setup lang="ts">
import { defineProps } from "vue";

// 1. 定义组件的 Props
interface MediaCardProps {
  movie: {
    id: number;
    title: string;
    poster: string;
  };
}

// 2. 使用 defineProps
const props = defineProps<MediaCardProps>();

// 3. 使用宏注册 MCP 组件
defineMCPComponent({
  name: "MediaCard",
  description: "用于显示电影或视频信息的卡片。",
  // 指定需要从 Props 中提取并放入 schema 的属性
  pickProps: ["movie"],
  // 定义 AI 调用此工具所需的输入
  inputSchema: {
    required: ["title"],
    properties: {
      title: {
        type: "string",
        description: "用户想看的电影标题",
      },
    },
  },
});
</script>

<template>
  <div>
    <!-- ... 组件模板 ... -->
  </div>
</template>
```

- `defineMCPComponent({...})`: **必需**。这是一个宏，用于注册该 Vue 文件为一个 MCP 组件。
  - `name`: 组件的唯一名称。
  - `pickProps`: 一个数组，指定需要从 `defineProps` 的接口中提取哪些属性来生成 `propertySchema`。
  - `inputSchema`: 一个对象，用于定义 AI 调用此工具所需的参数，会生成 schema 中的 `inputSchema`。
