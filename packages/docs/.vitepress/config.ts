import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Easy-Collective-UI",
  description: "一款基于vue3的组件库",
  base:"/EasyCollectiveUI/",
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/get-started' },
      { text: '组件', link: '/components/button' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '快速开始', link: '/get-started' },
        ]
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [
          { text: "Button 按钮", link: "components/button" }
        ],
      },
      {
        text: "数据展示",
        collapsed: false,
        items: [
          { text: "Collapse 折叠面板",link: "components/collapse" }
        ]
      },
      {
        text: "反馈组件",
        collapsed: false,
        items: [
          { text: "Alert 提示", link: "components/alert" }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mzmm403/EasyCollectiveUI' }
    ]
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    lineNumbers: true,
    config:(md) => {
      md.use(componentPreview)
      md.use(containerPreview)
    }
  }
})
