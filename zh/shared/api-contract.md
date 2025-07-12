# API 协议与数据校验

为了使 `client` 和 `server` 能够无缝且安全地协同工作，它们必须严格遵守由 `mcp-comp-schema.json` 文件定义的统一协议。这份 schema 不仅仅是数据结构的说明，更是**前后端进行数据校验的契约**。

## 作为“单一事实来源”的 Schema

由 Vite 插件生成的 `mcp-comp-schema.json` 文件是整个系统的“单一事实来源”（Single Source of Truth）。

-   **客户端（Client）**: `ChatComponent` 在接收到来自服务器的数据后，会**使用这份 schema 来校验 `componentProps`**。只有当 props 的结构和类型与 schema 定义完全匹配时，组件才会进行渲染。这可以防止格式错误或恶意的数据注入导致客户端崩溃或出现意外行为。
-   **服务端（Server）**: 服务器在将从大型语言模型（LLM）处获得的参数传递给工具函数之前，也**应该使用这份 schema 来校验这些参数**。这确保了只有符合预期的、合法的数据才能进入您的核心业务逻辑，从而增强了后端的健壮性。

## 服务器响应结构

客户端期望从服务器收到的 API 响应具有以下结构。

```json
{
  "code": 0,
  "data": {
    "content": "这是AI的文本回复，可以包含Markdown格式。",
    "meta": {
      "serverName": "mcp-component-render",
      "toolName": "MediaCard",
      "componentProps": {
        "movie": {
          "id": 1,
          "title": "阿凡达：水之道",
          "description": "电影描述...",
          "poster": "https://..."
        }
      },
      "aiOutput": "已为您找到电影《阿凡达：水之道》的信息。"
    }
  }
}
```

### `meta` 对象

这是实现动态渲染的核心。

| 字段             | 类型                  | 描述                                                                                                                                                           |
| ---------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `serverName`     | `string`              | 实现了该工具的 MCP 服务器的名称。                                                                                                                              |
| `toolName`       | `string`              | 要渲染的组件的名称。这必须与 schema 中定义的组件名称完全匹配。如果值为 `"null"` 或不存在，则不渲染组件。                                                         |
| `componentProps` | `Record<string, any>` | 一个对象，其键值对将作为 props 传递给被渲染的组件。**其结构必须严格遵守 `mcp-comp-schema.json` 中为该组件定义的 `propertySchema`**。 |
| `aiOutput`       | `string`              | （可选）AI 关于此次工具调用的纯文本输出。                                                                                                                        |

## 契约总结

-   **`toolName`** 是连接的桥梁。
-   **`componentProps`** 是数据的载体，其合法性由共享的 **`mcp-comp-schema.json`** 来保证。

任何一方对 schema 的偏离都将导致校验失败，从而中断数据流，保证了整个系统的稳定和安全。