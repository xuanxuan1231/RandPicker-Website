import { defineConfig } from 'vitepress'

import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
import { UnlazyImages } from '@nolebase/markdown-it-unlazy-img'
import { 
  InlineLinkPreviewElementTransform 
} from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "RandPicker",
  description: "新一代随机选人工具",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '示例',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xuanxuan1231/RandPicker' }
    ]
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
    fr: {
      label: 'English',
      lang: 'en',
      link: '/en'
    }
  },
  markdown: {
    config: (md) => {
      md.use(BiDirectionalLinks());
      md.use(UnlazyImages(), { 
        imgElementTag: 'NolebaseUnlazyImg', 
      });
      md.use(InlineLinkPreviewElementTransform)
    },
  },
  vue: {
    template: {
      transformAssetUrls: {
        // 其他各种配置...
        NolebaseUnlazyImg: ['src'], 
      },
    },
  },
})
