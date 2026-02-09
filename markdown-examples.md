---
title: Markdown 使用示例
description: RandPicker 文档的 Markdown 语法示例
---

# Markdown 使用示例

本页面展示 RandPicker 文档中常用的 Markdown 语法。

## 代码高亮

VitePress 提供由 [Shiki](https://github.com/shikijs/shiki) 驱动的语法高亮功能：

### JSON 配置示例

```json
{
  "students": [
    {
      "id": "uuid-generated-id",
      "name": "张三",
      "weight": 1,
      "enabled": true,
      "avatar": "",
      "properties": []
    }
  ]
}
```

### Python 代码示例

```python
from core.choice import ChoiceMaker

# 创建选择器实例
choice_maker = ChoiceMaker(parent)

# 随机选择学生
result = choice_maker.choosePeople(number=3, notify=True)
```

### Bash 命令示例

```bash
# 安装依赖
uv sync

# 启动应用
python app.py
```

## 自定义容器

### 提示框

::: tip 提示
权重值越高，该学生被选中的概率越大。
:::

### 信息框

::: info 信息
RandPicker 支持 Windows、macOS 和 Linux 多个平台。
:::

### 警告框

::: warning 注意
启用 UIAccess 权限需要管理员权限，程序将以管理员权限重新启动。
:::

### 危险警告

::: danger 警告
删除 `settings.json` 文件会重置所有设置，请谨慎操作。
:::

### 详情折叠

::: details 高级配置
点击展开查看完整的配置选项：

```json
{
  "notification": {
    "fallback": true,
    "options": {
      "native": {
        "enabled": true,
        "format": {
          "title": "抽选了 {count} {suffix}",
          "body": "{names}"
        }
      }
    }
  }
}
```
:::

## 表格示例

| 通知方式 | 说明 | 配置选项 |
|---------|------|---------|
| 原生通知 | 使用系统原生通知 | 启用状态、格式化内容 |
| ClassIsland | 与 ClassIsland 应用集成 | 遮罩时长、正文类型 |
| RandPicker | 内置通知方式 | 启用状态 |
| ClassWidgets | 与 ClassWidgets 集成 | 启用状态 |

## 引用示例

> RandPicker 是一款功能强大的随机选人工具，支持 GUI 界面、权重选择、多种通知方式等功能。

## 列表示例

### 无序列表

- 权重随机选择
- 多种通知方式
- 现代化界面
- 学生管理
- 系统托盘集成
- 跨平台支持

### 有序列表

1. 安装依赖
2. 添加学生
3. 启动应用
4. 开始抽选

## 链接示例

- [快速开始](/guide/quick-start)
- [使用指南](/guide/usage)
- [Markdown 扩展文档](https://vitepress.dev/guide/markdown)

## 更多语法

查看 [VitePress 官方文档](https://vitepress.dev/guide/markdown) 了解更多 Markdown 扩展语法。
