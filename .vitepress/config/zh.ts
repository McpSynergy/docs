import { defineConfig, type DefaultTheme } from 'vitepress'

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '介绍',
      items: [
        { text: 'MCP Render 是什么？', link: '/zh/guide/introduction' },
      ]
    },
    {
      text: '协议',
      items: [
        { text: 'API 协议与数据校验', link: '/zh/shared/api-contract' },
      ]
    }
  ]
}

function sidebarClient(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/zh/client/' },
        { text: '在 React 中使用', link: '/zh/client/react-quick-start' },
        { text: '在 Vue 中使用', link: '/zh/client/vue-integration' },
      ]
    },
    {
      text: '核心功能',
      items: [
        { text: 'Vite 插件 (React & Vue)', link: '/zh/client/vite-plugins' },
        { text: 'API 参考', link: '/zh/client/api-reference' },
      ]
    },
    {
      text: '其他',
      items: [
        { text: '项目架构', link: '/zh/client/architecture' },
      ]
    }
  ]
}

function sidebarServer(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/zh/server/' },
        { text: '快速入门', link: '/zh/server/quick-start' },
      ]
    },
    {
      text: '核心功能',
      items: [
        { text: '核心概念', link: '/zh/server/concepts' },
        { text: '创建新工具', link: '/zh/server/creating-tools' },
      ]
    },
    {
      text: '其他',
      items: [
        { text: '项目架构', link: '/zh/server/architecture' },
      ]
    }
  ]
}

export const zh = defineConfig({
  lang: 'zh-CN',
  title: 'MCP Render',
  description: '一个强大的 AI 聊天界面 UI 渲染解决方案',

  themeConfig: {
    nav: nav(),
    sidebar: {
      '/zh/guide/': sidebarGuide(),
      '/zh/client/': sidebarClient(),
      '/zh/server/': sidebarServer(),
      '/zh/shared/': sidebarGuide(), // API协议页也使用通用指南侧边栏
    },
    editLink: {
      pattern: 'https://github.com/McpSynergy/docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    footer: {
      message: '基于 ISC 协议发布',
      copyright: 'Copyright © 2024-present McpSynergy'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '指南',
      activeMatch: '/zh/(guide|shared)/',
      link: '/zh/guide/introduction'
    },
    {
      text: '客户端',
      activeMatch: '/zh/client/',
      link: '/zh/client/'
    },
    {
      text: '服务端',
      activeMatch: '/zh/server/',
      link: '/zh/server/'
    }
  ]
}

