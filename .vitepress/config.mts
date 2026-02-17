import { defineConfig } from 'vitepress'

import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
import { 
  InlineLinkPreviewElementTransform 
} from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import markdownItFootnote from 'markdown-it-footnote'
import { 
  ThumbnailHashImages, 
} from '@nolebase/vitepress-plugin-thumbnail-hash/vite'
import { UnlazyImages } from '@nolebase/markdown-it-unlazy-img'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "RandPicker",
  description: "新一代随机选人工具",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { dark: '/icon-dark.jpg', light: '/icon-light.jpg', width: 32, height: 32 },

    nav: [
      { text: '首页', link: '/' },
      { text: '了解', link: '/about' },
      { text: '快速上手', link: '/quick-start' },
      { text: '通知 & 集成', link: '/notification' }
    ],

    sidebar: {
      '/notification/': [
        {
          text: '通知',
          link: '/notification',
          items: [
            { text: '通知格式', link: '/notification/format' },
            { text: 'ClassIsland 集成', link: '/notification/classisland' },
          ]
        },
      ]
    },

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
      md.use(InlineLinkPreviewElementTransform);
      md.use(markdownItFootnote);
      md.use(UnlazyImages(), { 
        imgElementTag: 'NolebaseUnlazyImg', 
      });
    },
  },
  vite: { 
    plugins: [ 
      ThumbnailHashImages(), 
    ],
    ssr: {
      noExternal: [
        '@unlazy/vue',
        '@nolebase/vitepress-plugin-thumbnail-hash',
      ],
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
