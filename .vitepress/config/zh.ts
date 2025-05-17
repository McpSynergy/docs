import { defineConfig, type DefaultTheme } from 'vitepress'

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/zh/guide/introduction' },
        { text: '快速开始', link: '/zh/guide/getting-started' },
        { text: '配置', link: '/zh/guide/configuration' }
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
      '/zh/guide/': sidebarGuide()
    },
    editLink: {
      pattern: 'https://github.com/InhiblabCore/vue-hooks-plus/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    footer: {
      message: '基于 MIT 协议发布',
      copyright: 'Copyright (c) 2022 YongGit'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '指南',
      activeMatch: '/zh/guide/',
      items: [
        { text: '介绍', link: '/zh/guide/introduction' },
        { text: '快速开始', link: '/zh/guide/getting-started' },
        { text: '配置', link: '/zh/guide/configuration' }
      ]
    }
  ]
} 