# Introduction to MCP Render

## Why MCP Render?

MCP Render is designed to enable interactive UI rendering within traditional web-based AI assistant chat interfaces. Its key advantage is the ability to inject server-generated data (props) into the UI components, eliminating the need for client-side requests while maintaining clean behavior and consistent usage patterns.

## Implementation Components

The solution consists of three main parts:

### 1. Frontend SDK

The frontend SDK is responsible for rendering dynamic components in specific frameworks (e.g., React). It implements the `ChatComponent` component.

#### ChatComponent Overview
- Dynamic component loader for MCP (Message Component Platform) components
- Uses React's lazy and Suspense for dynamic loading
- Includes error boundary handling
- Provides component context through MCPComponentContext

#### Key Features
- Dynamic component loading
- Property validation
- Error handling
- Context provision
- TypeScript support

### 2. Build Tool Plugin

A Vite plugin that identifies `@mcp-comp` annotations in TypeScript code and generates an `mcp_components.config.json` file.

Example TypeScript interface:
```typescript
/**
 * @mcp-comp Cart
 * @mcp-prop-path books
 */
export interface Book { 
    id: string;    
    title: string;
    author: string;
    cover: string;
    price: number;
    count: number;
}
```

### 3. MCP Host

A server-side implementation for managing MCP servers.

#### MCP Host SDK Features
- Connection management
- Configuration monitoring
- Dynamic server updates
- Rich API interface
- Error handling
- Security features

## Integration Steps

### Frontend Integration

1. Install the package:
```bash
npm install @mcp-synergy/react
```

2. Import and use the component:
```typescript
import { ChatComponent } from "@mcp-synergy/react"
```

### Backend Integration (Express Example)

1. Initialize MCP Host:
```typescript
const mcpHost = new MCPHost({
  mcpServer: {
    configPath: path.join(process.cwd(), "servers/express/mcp_servers.config.json")
  },
  mcpComponent: {
    configPath: path.join(process.cwd(), "servers/express/mcp_components.config.json")
  },
  watch: process.env.NODE_ENV !== 'production'
});
```

2. Implement message handling route
3. Configure security middleware
4. Set up SSE response handling

### Custom MCP Server

Custom MCP servers should return a `props` field that will be sent to the frontend through Express. 