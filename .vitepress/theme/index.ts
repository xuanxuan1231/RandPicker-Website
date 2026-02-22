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
    NolebasePageProperties,
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

const zhPageProperties = [
    {
        key: 'tags',
        type: 'tags' as const,
        title: '标签',
    },
    {
        key: 'progress',
        type: 'progress' as const,
        title: '进度',
    },
    {
        key: 'createdAt',
        type: 'datetime' as const,
        title: '创建时间',
        formatAsFrom: true,
        dateFnsLocaleName: 'zhCN' as const,
    },
    {
        key: 'updatedAt',
        type: 'datetime' as const,
        title: '更新时间',
        formatAsFrom: true,
        dateFnsLocaleName: 'zhCN' as const,
    },
    {
        key: 'wordsCount',
        type: 'dynamic' as const,
        title: '字数',
        options: {
            type: 'wordsCount' as const,
        },
    },
    {
        key: 'readingTime',
        type: 'dynamic' as const,
        title: '阅读时间',
        options: {
            type: 'readingTime' as const,
            dateFnsLocaleName: 'zhCN' as const,
        },
    },
]

const enPageProperties = [
    {
        key: 'tags',
        type: 'tags' as const,
        title: 'Tags',
    },
    {
        key: 'progress',
        type: 'progress' as const,
        title: 'Progress',
    },
    {
        key: 'createdAt',
        type: 'datetime' as const,
        title: 'Created at',
        formatAsFrom: true,
        dateFnsLocaleName: 'enUS' as const,
    },
    {
        key: 'updatedAt',
        type: 'datetime' as const,
        title: 'Updated at',
        formatAsFrom: true,
        dateFnsLocaleName: 'enUS' as const,
    },
    {
        key: 'wordsCount',
        type: 'dynamic' as const,
        title: 'Word count',
        options: {
            type: 'wordsCount' as const,
        },
    },
    {
        key: 'readingTime',
        type: 'dynamic' as const,
        title: 'Reading time',
        options: {
            type: 'readingTime' as const,
            dateFnsLocaleName: 'enUS' as const,
        },
    },
]


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
            },
            spotlight: {
                defaultToggle: true,
            },
        } as Options);
        
        app.use(NolebaseInlineLinkPreviewPlugin);
        app.use(NolebaseGitChangelogPlugin);
        app.use(NolebasePagePropertiesPlugin);

        // 某些构建环境下插件注册可能被跳过，显式注册一次确保 <NolebasePageProperties /> 可解析
        app.component('NolebasePageProperties', NolebasePageProperties);
        
        // 注册页面属性编辑器组件
        app.component('NolebasePagePropertiesEditor', NolebasePagePropertiesEditor);
        app.component('NolebaseUnlazyImg', NolebaseUnlazyImg);
        
        // 配置页面属性
        app.provide(NolebasePagePropertiesInjectionKey, {
            properties: {
                'zh-CN': zhPageProperties,
                'zh-Hans': zhPageProperties,
                'zh': zhPageProperties,
                'en': enPageProperties,
                'en-US': enPageProperties,
            },
        });
    },
}

export default Theme