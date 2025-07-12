import { defineConfig } from 'vitepress'
import { en } from './en'
import { zh } from './zh'

import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader
} from 'vitepress-plugin-group-icons'

export default defineConfig({
  title: 'MCP Render',
  description: 'A powerful UI rendering solution for AI chat interfaces',
  base: process.env.NODE_ENV === 'production' ? '/docs/' : '',
  rewrites: {
    'en/:rest*': ':rest*'
  },

  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${process.env.NODE_ENV === 'production' ? '/docs/logo.svg' : '/logo.svg'}` }],
    ['link', { rel: 'icon', type: 'image/png', href: `${process.env.NODE_ENV === 'production' ? '/docs/logo.png' : '/logo.png'}` }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'MCP Render | A powerful UI rendering solution for AI chat interfaces' }],
    ['meta', { property: 'og:site_name', content: 'MCP Render' }],
    ['meta', { property: 'og:url', content: 'https://github.com/orgs/McpSynergy' }],
    ['meta', { name: 'description', content: 'A powerful UI rendering solution for AI chat interfaces' }],
    ['meta', { name: 'keywords', content: 'MCP Render, AI, UI, chat interface, rendering' }],
    ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
  ],
  markdown: {
    math: true,
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],
    config(md) {
      // md.renderer.rules.softbreak
      const fence = md.renderer.rules.fence!
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const { localeIndex = 'root' } = env
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case 'es':
              return 'Copiar código'
            case 'fa':
              return 'کپی کد'
            case 'ko':
              return '코드 복사'
            case 'pt':
              return 'Copiar código'
            case 'ru':
              return 'Скопировать код'
            case 'zh':
              return '复制代码'
            default:
              return 'Copy code'
          }
        })()
        return fence(tokens, idx, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`
        )
      }
      md.use(groupIconMdPlugin)
    }
  },

  sitemap: {
    hostname: 'https://inhiblabcore.github.io/vue-hooks-plus/',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  themeConfig: {
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/orgs/McpSynergy/repositories' }
    ]
  },
  vite: {
    plugins: [
      // @ts-ignore
      groupIconVitePlugin({
        customIcon: {
          vitepress: localIconLoader(
            import.meta.url,
            '../../public/logo.svg'
          ),
          firebase: 'logos:firebase'
        }
      })
    ]
  }
}) 