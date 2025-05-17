import { defineConfig, type DefaultTheme } from 'vitepress'

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Configuration', link: '/guide/configuration' }
      ]
    }
  ]
}

export const en = defineConfig({
  lang: 'en-US',
  title: 'MCP Render',
  description: 'A powerful UI rendering solution for AI chat interfaces',

  themeConfig: {
    nav: nav(),
    sidebar: {
      '/guide/': sidebarGuide()
    },
    editLink: {
      pattern: 'https://github.com/InhiblabCore/vue-hooks-plus/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright (c) 2022 YongGit'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      activeMatch: '/guide/',
      items: [
        { text: 'Introduction', link: '/guide/introduction' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        { text: 'Configuration', link: '/guide/configuration' }
      ]
    }
  ]
}

