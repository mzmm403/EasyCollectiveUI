import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Easy-Collective-UI",
  description: "一款基于vue3的组件库",
  base:"/EasyCollectiveUI/",
  head: [["link", { rel: "icon", href: "favicon.png" }]],
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
          { text: "Button 按钮", link: "components/button" },
          { text: "Icon 图标", link: "components/icon" }
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
        text: "导航",
        collapsed: false,
        items: [
          { text: "Dropdown 下拉菜单",link: "components/dropdown" }
        ]
      },
      {
        text: "反馈组件",
        collapsed: false,
        items: [
          { text: "Alert 提示", link: "components/alert" },
          { text: "Tooltip 文字提示", link: "components/tooltip" },
          { text: "Popconfirm 气泡确认框", link: "components/popconfirm" },
          { text: "Notification 通知", link: "components/notification" }
        ]
      },
      {
        text: "表单组件",
        collapsed: false,
        items: [
          { text: "Input 输入框", link: "components/input" },
          { text: "Form 表单", link: "components/form" },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mzmm403/EasyCollectiveUI' }
    ],
    footer: {
        copyright:"Copyright © 2024-present Mzmm"
    }
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
