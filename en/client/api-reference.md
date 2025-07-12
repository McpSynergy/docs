# API Reference

The core of the `@mcp-synergy/react` and `@mcp-synergy/vue` packages is the `ChatComponent`, which is responsible for dynamically loading and rendering UI components specified by the server.

## `<ChatComponent />`

This component dynamically renders different child components based on metadata received from the server. Below are the details for both the React and Vue versions.

---

### For React

#### **Props**

| Prop            | Type                  | Required | Default                       | Description                                                                 |
| --------------- | --------------------- | :------: | ----------------------------- | --------------------------------------------------------------------------- |
| `name`          | `string`              |   Yes    | -                             | The name of the component to render. Should match `toolName` from the server. |
| `serverName`    | `string`              |    No    | -                             | An optional server name to disambiguate components with the same name.      |
| `props`         | `Record<string, any>` |    No    | `{}`                          | An object containing the properties to pass to the dynamic component.       |
| `fallback`      | `React.ReactNode`     |    No    | `<div>Validating...</div>`    | A React node to display while the component is loading and validating.      |
| `errorFallback` | `React.ReactNode`     |    No    | `<div>Failed to validate</div>` | A React node to display if the component fails to load, validate, or render. |

#### **Example Usage**

```tsx
import { ChatComponent } from "@mcp-synergy/react";

function MyChatInterface({ serverResponse }) {
  // serverResponse is the data fetched from your backend API
  const { content, meta } = serverResponse.data;

  // Render the component if meta.toolName exists
  if (meta?.toolName && meta.toolName !== 'null') {
    return (
      <ChatComponent
        name={meta.toolName}
        serverName={meta.serverName}
        props={meta.componentProps}
        fallback={<div>Loading Component...</div>}
        errorFallback={<div>Failed to load component.</div>}
      />
    );
  }

  // Otherwise, display the AI's text response
  return <div>{content}</div>;
}
```

---

### For Vue

#### **Props**

| Prop         | Type     | Required | Default | Description                                                              |
| ------------ | -------- | :------: | ------- | ------------------------------------------------------------------------ |
| `name`       | `String` |   Yes    | -       | The name of the component to render. Should match `toolName` from the server. |
| `serverName` | `String` |    No    | -       | An optional server name to disambiguate components with the same name.   |
| `props`      | `Object` |    No    | `{}`    | An object containing the properties to pass to the dynamic component.    |

#### **Slots**

| Name            | Props | Description                                                                    |
| --------------- | ----- | ------------------------------------------------------------------------------ |
| `fallback`      | -     | Content to display while the component is loading and validating.              |
| `error-fallback`| `{ error: string }` | Content to display if the component fails. The `error` prop contains the validation or render error message. |

#### **Example Usage**

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ChatComponent } from '@mcp-synergy/vue';

const response = ref<any>({
  /* data from server */
});
</script>

<template>
  <ChatComponent
    v-if="response.data.meta?.toolName && response.data.meta.toolName !== 'null'"
    :name="response.data.meta.toolName"
    :props="response.data.meta.componentProps"
  >
    <template #fallback>
      <div>Loading Component...</div>
    </template>
    <template #error-fallback="{ error }">
      <div>Failed to load component: {{ error }}</div>
    </template>
  </ChatComponent>
  <div v-else>
    {{ response.data.content }}
  </div>
</template>
```
