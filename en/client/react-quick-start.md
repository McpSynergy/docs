# React Quick Start

This guide will walk you through integrating `@mcp-synergy/react` into an existing React + Vite project.

## Prerequisites

- Node.js >= 18
- pnpm (recommended)
- A working React + Vite project

---

### Step 1: Install Dependencies

First, add the McpSynergy core packages and the Vite plugin to your project.

```bash
pnpm add @mcp-synergy/react @mcp-synergy/client-core
pnpm add -D @mcp-synergy/vite-plugin-comp
```

### Step 2: Configure the Vite Plugin

In your `vite.config.ts` file, import and use the `MCPComp` plugin. This plugin is the key to enabling dynamic component loading.

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { MCPComp } from '@mcp-synergy/vite-plugin-comp'; // 1. Import the plugin

export default defineConfig({
  plugins: [
    react(),
    MCPComp() // 2. Add the plugin
  ],
});
```
> To learn more about plugin configuration, see the [Vite Plugins](./vite-plugins.md) documentation.

### Step 3: Create Your First MCP Component

In your components directory (e.g., `src/components`), create a new component file. Let's use a simple `UserProfile` card as an example.

**`src/components/UserProfile.tsx`**:
```tsx
import React from 'react';

/**
 * @mcp-comp UserProfile
 * @mcp-description Displays a user's profile information.
 */
export interface UserProfileProps {
  user: {
    name: string;
    title: string;
    avatar: string;
  };
}

/**
 * @mcp-input-required The username to look up.
 */
interface UserProfileInputs {
  name: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) return <div>User not found.</div>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <img src={user.avatar} alt={user.name} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
      <h2>{user.name}</h2>
      <p>{user.title}</p>
    </div>
  );
};

export default UserProfile;
```
> **Key Points:**
> - `@mcp-comp UserProfile`: This JSDoc comment is crucial. It "registers" this component as an MCP tool named `UserProfile`.
> - `@mcp-input-required`: This tells the AI that to use this tool, the `name` parameter must be provided.

### Step 4: Use the `ChatComponent` in Your App

Now, in your chat interface, use the `<ChatComponent />` to handle responses from the server.

```tsx
// src/App.tsx (or your chat interface component)
import { useState, useEffect } from 'react';
import { ChatComponent } from '@mcp-synergy/react';

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
          name: "Jane Doe",
          title: "Senior Software Engineer",
          avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
        }
      }
    }
  }
};

function App() {
  const [response, setResponse] = useState<any>(null);

  // Simulate an API call
  useEffect(() => {
    // In a real app, this would be a fetch call:
    // fetch('/api/message', { ... })
    //   .then(res => res.json())
    //   .then(data => setResponse(data));
    setTimeout(() => setResponse(fakeServerResponse), 1000);
  }, []);

  if (!response) {
    return <div>Waiting for AI response...</div>;
  }

  const { meta } = response.data;

  return (
    <div>
      <h1>My Chat App</h1>
      {meta?.toolName && meta.toolName !== 'null' ? (
        <ChatComponent
          name={meta.toolName}
          props={meta.componentProps}
          fallback={<div>Loading Component...</div>}
        />
      ) : (
        <div>{response.data.content}</div>
      )}
    </div>
  );
}

export default App;
```

### Step 5: Launch Your Project

Run your development server:
```bash
pnpm dev
```

You should now see the `UserProfile` component rendered successfully.

You have successfully integrated the McpSynergy Client! Next, you can check out the [API Reference](./api-reference.md) and the [API Contract](../shared/api-contract.md) to learn more.
