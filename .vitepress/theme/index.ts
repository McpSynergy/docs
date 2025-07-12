import { h } from 'vue'
import Theme from 'vitepress/theme'
import './custom.css'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // 如果需要自定义插槽，可以在这里添加
    })
  },
  enhanceApp({ app }) {
    // 注册组件等其他增强功能
  }
}