# Client Introduction

Welcome to the McpSynergy Client: a powerful client-side solution designed to enable your AI chat applications to dynamically render rich, interactive UI components.

Traditionally, AI chatbots have been limited to returning text or static images. McpSynergy Client breaks this limitation. By working in concert with a backend service that implements the Model Context Protocol (MCP), your chat interface can seamlessly display a wide variety of UI elements—from simple information cards to complex data forms—all based on the context of the conversation.

***

## Core Value

> **Dynamic UI Generation**
> Introduce new UI components into your chat on the fly through backend logic and AI decisions, without needing to redeploy the frontend application.

> **Rich User Experience**
> Replace plain text with interactive components to dramatically improve the intuitiveness of information presentation and the convenience of user actions. For example, use an interactive chart to display data instead of a dry text description.

> **Frontend-Backend Decoupling**
> The frontend is responsible for defining and implementing a series of available UI "building blocks" (components), while the backend and AI decide when, where, and which "blocks" to use to construct the most suitable interface.

> **Development Efficiency**
> The Vite-based `vite-plugin-mcp-comp` provides automated component discovery, type extraction, and schema generation, greatly simplifying the development and maintenance workflow.

## Workflow Overview

1.  **Define Components**: You create standard components in your React (`.tsx`) or Vue (`.vue`) project.
2.  **Add Metadata**: You use special JSDoc comments (for React) or a `defineMCPComponent` macro (for Vue) to "register" these components, making them recognizable to the system.
3.  **Automatic Scanning**: The Vite plugin automatically scans these components during development and build processes, generating a detailed schema.
4.  **Backend Decision-Making**: The backend service uses this schema to inform the AI about the available UI tools.
5.  **Dynamic Rendering**: When the AI decides to use a tool, the backend sends a command (containing the component name and props) to the client.
6.  **Seamless Presentation**: The client's `<ChatComponent />` receives this command and then automatically and safely loads and renders the corresponding UI component.

Now, proceed to the [React Quick Start](./react-quick-start.md) or [Vue Integration Guide](./vue-integration.md) to integrate the McpSynergy Client into your project!
