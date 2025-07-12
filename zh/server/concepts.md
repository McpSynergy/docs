
# 核心概念

要有效地使用 `server` 项目，理解其背后的核心概念至关重要。服务器的核心职责是充当 **AI** 和 **前端UI** 之间的智能协调器。

## MCP (模型上下文协议)

MCP 是一种规范，允许大型语言模型（LLM）不仅仅返回文本，还能请求调用“工具（Tools）”。在本项目中，“调用工具”的最终结果就是在用户界面上渲染一个丰富的UI组件。

## “工具”是什么？

在我们的上下文中，一个“工具”就是一个在前端已经定义好的 React 或 Vue 组件。服务器通过以下方式向 AI “宣告”这些工具的存在：

1.  **Schema 定义**: 前端使用 `vite-plugin-mcp-comp` 插件扫描代码，并根据 JSDoc 注释（`@mcp-comp`, `@mcp-input-required` 等）生成一个 `mcp-comp-schema.json` 文件。
2.  **System Prompt**: 服务器读取这个 schema，并将其格式化后插入到发送给 AI 的系统提示（System Prompt）中。这等于告诉 AI：“你拥有以下这些能力（工具），以及在何种情况下、需要哪些参数才能使用它们。”

## 工作流程

1.  **用户提问**: 用户向聊天机器人发送一条消息，例如“帮我找找关于《阿凡达》的电影”。
2.  **AI 决策**: `express` 服务器将用户的消息和可用的工具列表一起发送给 AI。AI 分析后认为用户的意图匹配 `MediaCard` 这个工具，并且识别出参数 `title` 是“阿凡达”。
3.  **AI 返回工具调用**: AI 不会直接回答，而是返回一个结构化的 JSON，表示它想调用 `MediaCard` 工具，并传入参数 `{"title": "阿凡达"}`。
4.  **服务器执行工具**: `express` 服务解析这个 JSON，并调用 `component-render-mcp` 服务中的 `MediaCard` 处理器。
5.  **服务器准备数据**: `MediaCard` 处理器可能会查询数据库或调用其他 API，获取关于《阿凡达》的详细信息（如描述、海报等），然后将这些信息组装成符合前端组件 Props 要求的 `componentProps` 对象。
6.  **服务器响应**: `express` 服务最后将包含 `toolName: "MediaCard"` 和准备好的 `componentProps` 的完整数据结构返回给前端。
7.  **前端渲染**: 前端的 `ChatComponent` 接收到此响应，动态加载并渲染 `MediaCard` 组件，并将 `componentProps` 作为 props 传入。

通过这个流程，服务器成功地将用户的自然语言请求转化成了一个具体的 UI 组件渲染指令。
