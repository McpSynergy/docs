# Vue Integration Guide

This guide will walk you through integrating McpSynergy Client into an existing Vue 3 + Vite project.

## Prerequisites

- Node.js >= 18
- pnpm (recommended)
- A working Vue 3 + Vite project

---

### Step 1: Install Dependencies

First, add the McpSynergy Vue core package and its dedicated Vite plugin to your project.

```bash
pnpm add @mcp-synergy/vue @mcp-synergy/client-core
pnpm add -D @mcp-synergy/vite-plugin-comp-vue
```

### Step 2: Configure the Vite Plugin

In your `vite.config.ts` file, import and use the `MCPCompVue` plugin.

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { MCPCompVue } from '@mcp-synergy/vite-plugin-comp-vue'; // 1. Import the Vue plugin

export default defineConfig({
  plugins: [
    vue(),
    MCPCompVue() // 2. Add the plugin
  ],
});
```
> To learn more about plugin configuration and the React equivalent, see the [Vite Plugins](./vite-plugins.md) documentation.

### Step 3: Create Your First MCP Component

In your components directory (e.g., `src/components`), create a new `.vue` file. We'll use a `UserProfile` card as an example.

**`src/components/UserProfile.vue`**:
```vue
<script setup lang="ts">
import { defineProps } from 'vue';

// 1. Define the component's Props interface
interface UserProfileProps {
  user: {
    name: string;
    title: string;
    avatar: string;
  };
}

// 2. Declare props using defineProps
const props = defineProps<UserProfileProps>();

// 3. "Register" the component using the defineMCPComponent macro
defineMCPComponent({
  name: 'UserProfile',
  description: 'Displays a user\'s profile information.',
  // Pick 'user' from UserProfileProps to include it in the schema
  pickProps: ['user'],
  // Define the input parameters required for the AI to call this tool
  inputSchema: {
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        description: 'The username to look up'
      }
    }
  }
});
</script>

<template>
  <div v-if="props.user" style="border: 1px solid #ccc; padding: 16px; border-radius: 8px;">
    <img :src="props.user.avatar" :alt="props.user.name" style="width: 80px; height: 80px; border-radius: 50%;" />
    <h2>{{ props.user.name }}</h2>
    <p>{{ props.user.title }}</p>
  </div>
  <div v-else>
    User not found.
  </div>
</template>
```

### Step 4: Use the `ChatComponent` in Your App

Now, in your chat interface, use the `<ChatComponent />` to handle responses from the server.

```vue
<!-- src/views/ChatView.vue (or your chat interface component) -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ChatComponent } from '@mcp-synergy/vue';

// Mock response from a server
const fakeServerResponse = {
  code: 0,
  data: {
    content: "Here is the user's profile.",
    meta: {
      serverName: "mcp-component-render",
      toolName: "UserProfile", // The AI decided to call this tool
      componentProps: {       // The AI prepared these props
        user: {
          name: "John Doe (Vue)",
          title: "Full-Stack Developer",
          avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2"
        }
      }
    }
  }
};

const response = ref<any>(null);

// Simulate an API call
onMounted(() => {
  setTimeout(() => {
    response.value = fakeServerResponse;
  }, 1000);
});
</script>

<template>
  <div>
    <h1>My Vue Chat App</h1>
    <div v-if="!response">
      Waiting for AI response...
    </div>
    <div v-else>
      <ChatComponent
        v-if="response.data.meta?.toolName && response.data.meta.toolName !== 'null'"
        :name="response.data.meta.toolName"
        :props="response.data.meta.componentProps"
      >
        <template #fallback>
          <div>Loading Component...</div>
        </template>
      </ChatComponent>
      <div v-else>
        {{ response.data.content }}
      </div>
    </div>
  </div>
</template>
```

### Step 5: Launch Your Project

Run your development server:
```bash
pnpm dev
```

You should now see the `UserProfile` component rendered successfully.

You have successfully integrated the McpSynergy Client with Vue! Next, you can check out the [API Reference](./api-reference.md) and the [API Contract](../shared/api-contract.md) to learn more.
