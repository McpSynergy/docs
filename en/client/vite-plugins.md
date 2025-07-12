# Vite Plugins

The `@mcp-synergy/client` ecosystem relies on Vite plugins to automate component discovery and schema generation. You will need to choose a different plugin depending on the frontend framework you are using.

- **For React**: `@mcp-synergy/vite-plugin-comp`
- **For Vue**: `@mcp-synergy/vite-plugin-comp-vue`

Although the plugins are different, their core functionality is consistent.

## Core Features

- **Automatic Component Discovery**: The plugin scans your project based on `include` and `exclude` options to find files marked as MCP components.
- **Schema Generation**: The plugin parses component metadata and type definitions to create a schema file (e.g., `mcp-comp-schema.json`). This file is the **critical contract for frontend-backend communication**, used not only for defining data structures but also for **data validation on both the client and server**.
- **Dynamic Imports**: The plugin sets up virtual modules (like `virtual:mcp-comp/imports`) that allow the `ChatComponent` to lazy-load and dynamically render components without manual registration.
- **Configuration Pushing**: (Optional) The plugin can push the generated schema to a specified server endpoint, thus automating the development workflow.

---

## React framework plugin (`vite-plugin-comp`)

### Configuration

In your `vite.config.ts` file, import and use the plugin.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { MCPComp } from "@mcp-synergy/vite-plugin-comp"; // Import the plugin

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

### Creating Components (with JSDoc)

The React plugin identifies components by parsing JSDoc comments and TypeScript `interface` definitions in `.tsx` files.

```tsx
import React from "react";

/**
 * @mcp-comp MediaCard
 * @mcp-title Media Card
 * @mcp-description A card for displaying movie or video information.
 */
export interface MediaCardProps {
  /**
   * @mcp-prop-title Movie Information
   */
  movie: {
    id: number;
    title: string;
    poster: string;
  };
  /**
   * @mcp-input-required The title of the movie the user wants to find.
   */
  title: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ movie }) => {
  // ... component implementation
};

export default MediaCard;
```

- `@mcp-comp <ComponentName>`: **Required**. Marks an `interface` as the props definition for an MCP component.
- `@mcp-input-required <Description>`: Marks a property as a required input parameter for the AI.

---

## Vue framework plugin (`vite-plugin-comp-vue`)

For Vue, the plugin's usage is different, relying on a **macro call** instead of JSDoc.

### Configuration

In your `vite.config.ts` file, import and use the Vue-specific plugin.

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { MCPCompVue } from "@mcp-synergy/vite-plugin-comp-vue"; // Import the Vue plugin

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

### Creating Components (with a Macro)

In the `<script setup>` block of a `.vue` file, use the `defineMCPComponent` macro along with `defineProps`.

```vue
<script setup lang="ts">
import { defineProps } from "vue";

// 1. Define the component's Props
interface MediaCardProps {
  movie: {
    id: number;
    title: string;
    poster: string;
  };
}

// 2. Use defineProps
const props = defineProps<MediaCardProps>();

// 3. Register the MCP component with the macro
defineMCPComponent({
  name: "MediaCard",
  description: "A card for displaying movie or video information.",
  // Specify which props to extract from the interface for the schema
  pickProps: ["movie"],
  // Define the inputs required for the AI to call this tool
  inputSchema: {
    required: ["title"],
    properties: {
      title: {
        type: "string",
        description: "The title of the movie the user wants to find",
      },
    },
  },
});
</script>

<template>
  <div>
    <!-- ... component template ... -->
  </div>
</template>
```

- `defineMCPComponent({...})`: **Required**. A macro that registers the `.vue` file as an MCP component.
  - `name`: The unique name of the component.
  - `pickProps`: An array specifying which properties to extract from the `defineProps` interface to generate the `propertySchema`.
  - `inputSchema`: An object defining the parameters required for the AI to call this tool, which generates the `inputSchema` in the schema.
