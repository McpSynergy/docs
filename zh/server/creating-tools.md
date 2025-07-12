# 创建新工具

在 `server` 端添加一个新的工具（即让 AI 能够调用一个新的前端组件）涉及以下步骤。我们将以创建一个新的 `WeatherCard` 组件为例。

## 1. 在前端定义组件和 Schema

首先，你必须在 `client` 项目中创建对应的 React/Vue 组件，并使用 JSDoc 注释来标记它。

**`client/src/components/WeatherCard.tsx`**:

```tsx
import React from "react";

/**
 * @mcp-comp WeatherCard
 * @mcp-title 天气卡片
 * @mcp-description 显示指定城市的天气信息。
 */
export interface WeatherCardProps {
  weather: {
    city: string;
    temperature: number;
    description: string;
    icon: string;
  };
}

/**
 * @mcp-input-required 用户想要查询的城市名称
 */
interface WeatherCardInputs {
  city: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  // ... 组件实现
  return (
    <div>
      <h3>{weather.city}</h3>
      <p>
        {weather.temperature}°C, {weather.description}
      </p>
    </div>
  );
};

export default WeatherCard;
```

- 运行 `client` 的开发服务 (`pnpm dev`) 后，`vite-plugin-mcp-comp` 会更新 `mcp-comp-schema.json` 文件，现在其中会包含 `WeatherCard` 的定义。

## 2. 让服务器知道新工具的存在

`vite-plugin-mcp-comp` 的 `pushConfig` 功能可以将最新的 schema 自动推送到服务器。确保你的 `vite.config.ts` 中配置了正确的 `serverUrl`。

或者，你可以手动将 `mcp-comp-schema.json` 的内容复制到服务器可以访问的地方。在本项目中，`express` 服务通过 `MCPService.getAvailableTools()` 读取这个 schema。

## 3. 在 MCP 服务中实现工具逻辑

现在，打开 `server/servers/mcpServers/component-render-mcp/index.ts` 文件，在 `handleToolCall` 方法的 `switch` 语句中添加一个新的 `case`。

```typescript
// in server/servers/mcpServers/component-render-mcp/index.ts

// ... other cases
  private async handleToolCall(
    name: string,
    args: any,
  ): Promise<CallToolResult> {

    switch (name) {
      // ... other cases (MediaCard, MusicCard, etc.)

      case 'WeatherCard': {
        const { city } = args;
        if (!city || !city.trim()) {
          throw new McpError(ErrorCode.InvalidParams, `city is required`);
        }

        // 在这里，你可以调用一个真正的天气API
        // const weatherData = await fetch(`https://api.weather.com?city=${city}`);
        // 为了演示，我们使用假数据
        const fakeWeatherData = {
          city: city,
          temperature: 25,
          description: '晴朗',
          icon: 'sunny_icon_url',
        };

        return {
          content: [
            { type: "text", text: `已为您查询到 ${city} 的天气信息。` },
          ],
          _meta: {
            props: {
              // 这里的 `weather` 属性必须与前端 WeatherCardProps 中的定义匹配
              weather: fakeWeatherData,
            },
          },
        };
      }

      default: {
        // ...
      }
    }
  }
// ...
```

## 4. 重启服务器并测试

保存文件并重启 `server` 项目 (`pnpm dev:express`)。

现在，你可以和聊天机器人对话，尝试触发新的工具：“今天上海的天气怎么样？”。AI 应该能够识别到 `WeatherCard` 工具，调用它，然后服务器会执行你新添加的逻辑，最终在前端渲染出 `WeatherCard` 组件。
