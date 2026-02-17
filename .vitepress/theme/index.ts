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
import {
  NolebasePagePropertiesPlugin,
  NolebasePagePropertiesEditor,
  InjectionKey as NolebasePagePropertiesInjectionKey,
} from '@nolebase/vitepress-plugin-page-properties/client'
import { 
  NolebaseUnlazyImg, 
} from '@nolebase/vitepress-plugin-thumbnail-hash/client'

import '@nolebase/vitepress-plugin-thumbnail-hash/client/style.css'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-page-properties/client/style.css'
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css'
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
        app.use(NolebaseGitChangelogPlugin);
        app.use(NolebasePagePropertiesPlugin);
        
        // 注册页面属性编辑器组件
        app.component('NolebasePagePropertiesEditor', NolebasePagePropertiesEditor);
        app.component('NolebaseUnlazyImg', NolebaseUnlazyImg);
        
        // 配置页面属性
        app.provide(NolebasePagePropertiesInjectionKey, {
            properties: {
                'zh-CN': [
                    {
                        key: 'tags',
                        type: 'tags',
                        title: '标签',
                    },
                    {
                        key: 'progress',
                        type: 'progress',
                        title: '进度',
                    },
                    {
                        key: 'createdAt',
                        type: 'datetime',
                        title: '创建时间',
                        formatAsFrom: true,
                        dateFnsLocaleName: 'zhCN',
                    },
                    {
                        key: 'updatedAt',
                        type: 'datetime',
                        title: '更新时间',
                        formatAsFrom: true,
                        dateFnsLocaleName: 'zhCN',
                    },
                    {
                        key: 'wordsCount',
                        type: 'dynamic',
                        title: '字数',
                        options: {
                            type: 'wordsCount',
                        },
                    },
                    {
                        key: 'readingTime',
                        type: 'dynamic',
                        title: '阅读时间',
                        options: {
                            type: 'readingTime',
                            dateFnsLocaleName: 'zhCN',
                        },
                    },
                ],
                'en': [
                    {
                        key: 'tags',
                        type: 'tags',
                        title: 'Tags',
                    },
                    {
                        key: 'progress',
                        type: 'progress',
                        title: 'Progress',
                    },
                    {
                        key: 'createdAt',
                        type: 'datetime',
                        title: 'Created at',
                        formatAsFrom: true,
                        dateFnsLocaleName: 'enUS',
                    },
                    {
                        key: 'updatedAt',
                        type: 'datetime',
                        title: 'Updated at',
                        formatAsFrom: true,
                        dateFnsLocaleName: 'enUS',
                    },
                    {
                        key: 'wordsCount',
                        type: 'dynamic',
                        title: 'Word count',
                        options: {
                            type: 'wordsCount',
                        },
                    },
                    {
                        key: 'readingTime',
                        type: 'dynamic',
                        title: 'Reading time',
                        options: {
                            type: 'readingTime',
                            dateFnsLocaleName: 'enUS',
                        },
                    },
                ],
            },
        });
    },
}

export default Theme