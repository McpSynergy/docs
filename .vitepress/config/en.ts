import { defineConfig, type DefaultTheme } from 'vitepress'

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      link: '/guide/introduction',
      activeMatch: '/guide/'
    },
    {
      text: 'Client',
      link: '/client/',
      activeMatch: '/client/'
    },
    {
      text: 'Server',
      link: '/server/',
      activeMatch: '/server/'
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      items: [
        { text: 'What is MCP Render?', link: '/guide/introduction' },
      ]
    },
    {
      text: 'Protocol',
      items: [
        { text: 'API Contract & Validation', link: '/shared/api-contract' },
      ]
    }
  ]
}

function sidebarClient(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/client/' },
        { text: 'React Quick Start', link: '/client/react-quick-start' },
        { text: 'Vue Integration Guide', link: '/client/vue-integration' },
      ]
    },
    {
      text: 'Core Features',
      items: [
        { text: 'Vite Plugins (React & Vue)', link: '/client/vite-plugins' },
        { text: 'API Reference', link: '/client/api-reference' },
      ]
    },
    {
      text: 'Others',
      items: [
        { text: 'Project Architecture', link: '/client/architecture' },
      ]
    }
  ]
}

function sidebarServer(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/server/' },
        { text: 'Quick Start', link: '/server/quick-start' },
      ]
    },
    {
      text: 'Core Features',
      items: [
        { text: 'Core Concepts', link: '/server/concepts' },
        { text: 'Creating New Tools', link: '/server/creating-tools' },
      ]
    },
    {
      text: 'Others',
      items: [
        { text: 'Project Architecture', link: '/server/architecture' },
      ]
    }
  ]
}


export const en = defineConfig({
  lang: 'en-US',
  description: 'A powerful UI rendering solution for AI chat interfaces',

  themeConfig: {
    nav: nav(),
    sidebar: {
      '/guide/': sidebarGuide(),
      '/client/': sidebarClient(),
      '/server/': sidebarServer(),
      '/shared/': sidebarGuide(),
    },
    editLink: {
      pattern: 'https://github.com/McpSynergy/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Released under the ISC License.',
      copyright: 'Copyright © 2024-present McpSynergy'
    }
  }
})
