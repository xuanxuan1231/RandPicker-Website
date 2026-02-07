import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme as ThemeConfig } from 'vitepress'
import {
    InjectionKey,
    NolebaseEnhancedReadabilitiesMenu,
    NolebaseEnhancedReadabilitiesScreenMenu,
    Options
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import { 
  NolebaseInlineLinkPreviewPlugin, 
} from '@nolebase/vitepress-plugin-inline-link-preview/client'
import { 
  NolebaseGitChangelogPlugin 
} from '@nolebase/vitepress-plugin-git-changelog/client'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import './index.css'
import Layout from './Layout.vue'


export const Theme: ThemeConfig = {
    extends: DefaultTheme,
    Layout: () => {
        return h(Layout, null, {
            // 为较宽的屏幕的导航栏添加阅读增强菜单
            'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
            // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
            'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
        })
    },
    enhanceApp({ app }) {
        app.provide(InjectionKey, {
            locales: { // 配置国际化
                'zh-CN': { // 配置简体中文
                    title: {
                        title: '阅读增强插件',
                    }
                },
                'en': { // 配置英文
                    title: {
                        title: 'Enhanced Readabilities Plugin',
                    }
                }
            }
        } as Options);
        app.use(NolebaseInlineLinkPreviewPlugin);
        app.use(NolebaseGitChangelogPlugin)
    },
}

export default Theme