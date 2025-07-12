# API 参考

`@mcp-synergy/react` 和 `@mcp-synergy/vue` 包的核心都是 `ChatComponent` 组件，它负责动态加载和渲染由服务器指定的 UI 组件。

## `<ChatComponent />`

该组件根据从服务器接收到的元数据动态呈现不同的子组件。以下是 React 和 Vue 版本的详细信息。

---

### React 版本

#### **Props**

| Prop            | 类型                  | 必需 | 默认值                       | 描述                                                                 |
| --------------- | --------------------- | :--: | ---------------------------- | -------------------------------------------------------------------- |
| `name`          | `string`              |  是  | -                            | 要渲染的组件的名称。应与服务器响应中的 `toolName` 相匹配。         |
| `serverName`    | `string`              |  否  | -                            | 可选的服务器名称，用于区分来自不同后端的同名组件。                   |
| `props`         | `Record<string, any>` |  否  | `{}`                         | 一个对象，包含要传递给动态渲染组件的属性。                           |
| `fallback`      | `React.ReactNode`     |  否  | `<div>Validating...</div>`   | 在组件加载和验证期间显示的 React 节点。                              |
| `errorFallback` | `React.ReactNode`     |  否  | `<div>Failed to validate</div>` | 当组件加载、验证或渲染失败时显示的 React 节点。 |

#### **示例用法**

```tsx
import { ChatComponent } from "@mcp-synergy/react";

function MyChatInterface({ serverResponse }) {
  // serverResponse 是从您的后端API获取的数据
  const { content, meta } = serverResponse.data;

  // 如果 meta.toolName 存在，则渲染组件
  if (meta?.toolName && meta.toolName !== 'null') {
    return (
      <ChatComponent
        name={meta.toolName}
        serverName={meta.serverName}
        props={meta.componentProps}
        fallback={<div>正在加载组件...</div>}
        errorFallback={<div>组件加载失败</div>}
      />
    );
  }

  // 否则，显示AI的文本响应
  return <div>{content}</div>;
}
```

---

### Vue 版本

#### **Props**

| Prop         | 类型     | 必需 | 默认值 | 描述                                                              |
| ------------ | -------- | :--: | ------ | ----------------------------------------------------------------- |
| `name`       | `String` |  是  | -      | 要渲染的组件的名称。应与服务器响应中的 `toolName` 相匹配。      |
| `serverName` | `String` |  否  | -      | 可选的服务器名称，用于区分来自不同后端的同名组件。                |
| `props`      | `Object` |  否  | `{}`   | 一个对象，包含要传递给动态渲染组件的属性。                        |

#### **插槽 (Slots)**

| 名称            | Props | 描述                                                                    |
| --------------- | ----- | ----------------------------------------------------------------------- |
| `fallback`      | -     | 在组件加载和验证期间显示的内容。                                        |
| `error-fallback`| `{ error: string }` | 组件加载失败时显示的内容。`error` prop 包含验证或渲染的错误信息。 |

#### **示例用法**

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ChatComponent } from '@mcp-synergy/vue';

const response = ref<any>({
  /* 从服务器获取的数据 */
});
</script>

<template>
  <ChatComponent
    v-if="response.data.meta?.toolName && response.data.meta.toolName !== 'null'"
    :name="response.data.meta.toolName"
    :props="response.data.meta.componentProps"
  >
    <template #fallback>
      <div>组件加载中...</div>
    </template>
    <template #error-fallback="{ error }">
      <div>组件加载失败: {{ error }}</div>
    </template>
  </ChatComponent>
  <div v-else>
    {{ response.data.content }}
  </div>
</template>
```