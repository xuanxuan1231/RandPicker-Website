import { defineConfig } from 'vitepress'

import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
import { 
  InlineLinkPreviewElementTransform 
} from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import { UnlazyImages } from '@nolebase/markdown-it-unlazy-img'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "RandPicker",
  description: "新一代随机选人工具",
  head: [
    ['link', { id: 'favicon', rel: 'icon', type: 'image/x-icon', href: '/icon-dark.ico' }],
    ['script', {}, `
      (() => {
        const root = document.documentElement;
        const icon = document.getElementById('favicon');
        const update = () => icon?.setAttribute('href', root.classList.contains('dark') ? '/icon-dark.ico' : '/icon-light.ico');
        new MutationObserver(update).observe(root, { attributes: true, attributeFilter: ['class'] });
        update();
      })();
    `],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { dark: '/icon-dark.jpg', light: '/icon-light.jpg', width: 32, height: 32 },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xuanxuan1231/RandPicker' }
    ]
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: '新一代随机选人工具',
      themeConfig: {
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        outline: {
          label: '页面导航'
        },
        lastUpdated: {
          text: '最后更新'
        },
        langMenuLabel: '多语言',
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        notFound: {
          title: '页面未找到',
          quote: '别为一页迷途叹息，转身处，\n常有星光为你引路。',
          linkLabel: '返回首页',
          linkText: '带我回首页'
        },
        nav: [
          { text: '首页', link: '/' },
          { text: '了解', link: '/about' },
          { text: '快速上手', link: '/quick-start/' },
          { text: '通知 & 集成', link: '/notification/' }
        ],
        sidebar: {
          '/notification/': [
            {
              text: '通知 & 集成',
              link: '/notification',
              items: [
                { text: '通知格式', link: '/notification/format' },
                {
                  text: 'ClassIsland 集成',
                  link: '/notification/classisland',
                  items: [
                    { text: '安装', link: '/notification/classisland/setup' },
                    { text: '配置', link: '/notification/classisland/configuration'}
                  ]
                },
              ]
            },
          ]
        },
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      description: 'The next-generation random picker tool.',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'About', link: '/en/about' },
          { text: 'Quick Start', link: '/en/quick-start' },
          { text: 'Notifications & Integration', link: '/en/notification' }
        ],
        sidebar: {
          '/en/notification/': [
            {
              text: 'Notifications & Integration',
              link: '/en/notification',
              items: [
                { text: 'Notification Format', link: '/en/notification/format' },
                {
                  text: 'ClassIsland Integration',
                  link: '/en/notification/classisland',
                  items: [
                    { text: 'Setup', link: '/en/notification/classisland/setup' },
                    { text: 'Configuration', link: '/en/notification/classisland/configuration' }
                  ]
                },
              ]
            },
          ]
        },
      }
    }
  },
  markdown: {
    config: (md) => {
      md.use(BiDirectionalLinks());
      md.use(InlineLinkPreviewElementTransform);
      md.use(markdownItFootnote);
      md.use(UnlazyImages(), { 
        imgElementTag: 'NolebaseUnlazyImg', 
      });
    },
  },
  vue: {
    template: {
      transformAssetUrls: {
        // 其他各种配置...
        NolebaseUnlazyImg: ['src'], 
      },
    },
  }
})
