import { defineConfig } from 'vite'
import { join } from 'node:path'
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import {
  PageProperties,
  PagePropertiesMarkdownSection,
} from '@nolebase/vitepress-plugin-page-properties/vite'
import {
  ThumbnailHashImages,
} from '@nolebase/vitepress-plugin-thumbnail-hash/vite'

export default defineConfig({
  optimizeDeps: {
    exclude: [
      '@nolebase/vitepress-plugin-enhanced-readabilities/client',
      '@nolebase/vitepress-plugin-inline-link-preview/client',
      'vitepress',
      '@nolebase/ui',
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
      repoURL: () => 'https://github.com/xuanxuan1231/RandPicker-Website',
    }),
    GitChangelogMarkdownSection(),
    ThumbnailHashImages(),
  ],
  ssr: {
    noExternal: [
      '@nolebase/vitepress-plugin-enhanced-readabilities',
      '@nolebase/ui',
      '@nolebase/vitepress-plugin-inline-link-preview',
      '@unlazy/vue',
      '@nolebase/vitepress-plugin-thumbnail-hash',
    ],
  },
})