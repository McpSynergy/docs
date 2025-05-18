# Getting Started

## Prerequisites

Before you begin, make sure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn
- A modern web browser

## Installation

### Frontend Setup

1. Install the React SDK:
```bash
npm install @mcp-synergy/react
```

2. Import the ChatComponent in your React application:
```typescript
import { ChatComponent } from "@mcp-synergy/react"
```

3. Use the component in your chat interface:
```typescript
function ChatInterface() {
  return (
    <div className="chat-container">
      <ChatComponent
        name="Cart"
        props={cartProps}
        fallback={<div>Loading...</div>}
      />
    </div>
  )
}
```

### Backend Setup

1. Install the MCP Host package:
```bash
npm install @mcp-synergy/host
```

2. Initialize MCP Host in your Express application:
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

// Start the host
await mcpHost.start()
```

3. Set up the message handling route:
```typescript
app.post('/message', async (req, res) => {
  try {
    const { messages } = req.body
    
    // Get available tools from MCP Host
    const tools = await mcpHost.getTools()
    
    // Process the message and handle tool calls
    // ... implementation details ...
    
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

## Build Tool Configuration

1. Install the Vite plugin:
```bash
npm install vite-plugin-mcp --save-dev
```

2. Configure the plugin in your `vite.config.ts`:
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

## Next Steps

- Learn about [Configuration](/en/guide/configuration)
<!-- - Explore [API Reference](/en/api/)
- Check out [Examples](/en/examples/)  -->