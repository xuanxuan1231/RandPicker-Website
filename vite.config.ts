import { join } from 'path'
import { defineConfig } from 'vite'
import { 
  GitChangelog, 
  GitChangelogMarkdownSection, 
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import {
  PageProperties,
  PagePropertiesMarkdownSection,
} from '@nolebase/vitepress-plugin-page-properties/vite'

export default defineConfig(() => {
  return {
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        '@nolebase/vitepress-plugin-inline-link-preview/client', 
        'vitepress',
        '@nolebase/ui',
      ],
    },
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/ui',
        '@nolebase/vitepress-plugin-inline-link-preview', 
      ],
    },
    plugins: [
      PageProperties(),
      PagePropertiesMarkdownSection({
        excludes: [
          join('pages', 'en', 'index.md'),
          join('pages', 'zh-CN', 'index.md'),
        ],
      }),
      GitChangelog({ 
        // 填写在此处填写您的仓库链接
        repoURL: () => 'https://github.com/xuanxuan1231/RandPicker-Website', 
      }), 
      GitChangelogMarkdownSection(), 
    ]
  }
})