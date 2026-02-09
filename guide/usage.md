# 使用指南

RandPicker 是一款功能强大的随机选人工具，支持 GUI 界面、权重选择、多种通知方式等功能。

## 系统要求

- Python 3.12 或更高版本（< 3.15）
- 支持的操作系统：Windows、macOS、Linux

## 安装

```bash
# 进入 RandPicker 目录
cd RandPicker

# 使用 uv 安装依赖（推荐）
uv sync

# 或使用 pip
pip install -r requirements.txt
```

## 启动应用

```bash
python app.py
```

## 基本功能

### 学生管理

RandPicker 使用 JSON 格式存储学生数据，每个学生包含以下信息：

```json
{
  "students": [
    {
      "id": "唯一标识符（自动生成）",
      "name": "学生姓名",
      "weight": 1,
      "enabled": true,
      "avatar": "头像文件路径",
      "properties": []
    }
  ]
}
```

**字段说明：**
- `id`：学生的唯一标识符，系统自动生成
- `name`：学生姓名
- `weight`：权重值，权重越高的学生被选中的概率越大
- `enabled`：是否启用该学生参与抽选
- `avatar`：学生头像图片路径（可选）
- `properties`：附加属性列表（可选）

### 随机抽选

支持基于权重的随机抽选功能：

- 单人抽选：随机选择一名学生
- 多人抽选：可一次抽取多名学生
- 权重系统：根据设置的权重值调整被选中概率

### 通知功能

RandPicker 支持多种通知方式，可在设置中配置：

1. **原生通知**（Native）：使用系统原生通知
2. **ClassIsland 集成**：与 ClassIsland 应用集成
3. **RandPicker 内置通知**
4. **ClassWidgets 集成**

通知格式可自定义：
- 标题格式：支持 `{count}`（数量）和 `{suffix}`（后缀）变量
- 正文格式：支持 `{names}`（姓名列表）变量
- 姓名分隔符：可自定义多个姓名之间的分隔符

## 设置选项

### 通知设置

- **通知回退**：当首选通知方式失败时，自动尝试其他通知方式
- **遮罩持续时间**（ClassIsland）：设置通知遮罩显示时长（毫秒）
- **正文持续时间**（ClassIsland）：设置通知正文显示时长（毫秒）
- **正文类型**（ClassIsland）：
  - Simple：简单显示
  - Rolling：滚动显示
  - Auto：自动选择

### 窗口位置

程序会自动保存和恢复窗口位置，下次启动时会显示在上次关闭的位置。

### 高级选项

- **UIAccess**：启用 UIAccess 权限（需要管理员权限）
  - 仅在需要特定 UI 访问权限时启用
  - 启用后将以管理员权限重新启动程序

## 快捷键

应用支持系统托盘操作：
- 点击托盘图标可快速访问设置
- 支持最小化到托盘
- 可从托盘菜单退出程序

## 文件结构

```
RandPicker/
├── app.py                 # 应用入口文件
├── pyproject.toml         # 项目配置和依赖
├── core/                  # 核心功能模块
│   ├── main.py           # 主程序逻辑
│   ├── choice.py         # 随机选择功能
│   ├── config/           # 配置管理
│   ├── integration/      # 第三方集成
│   ├── settings/         # 设置窗口
│   ├── tray.py           # 系统托盘
│   ├── widget.py         # 浮窗组件
│   └── uiaccess.py       # UIAccess 权限管理
├── src/                  # UI 资源
│   ├── widget.qml        # 主窗口 QML 文件
│   ├── components/       # UI 组件
│   └── settings/         # 设置界面
└── students.json         # 学生数据文件
```

## 配置文件

### students.json

存储学生数据，包含学生列表、权重、头像等信息。

### settings.json

存储应用设置，包括：
- 通知配置
- 窗口位置
- 高级选项
- UIAccess 设置

## 常见问题

### 如何添加学生？

在应用设置界面添加学生，或直接编辑 `students.json` 文件。

### 如何调整学生权重？

每个学生的 `weight` 字段决定其被选中的概率。权重越高，被选中的概率越大。

### 通知不显示怎么办？

1. 检查通知设置是否启用
2. 确保系统通知权限已授予
3. 尝试启用"通知回退"选项

### 如何重置设置？

删除或重命名 `settings.json` 文件，程序将使用默认配置重新生成。

## 技术架构

- **UI 框架**：PySide6（Qt for Python）
- **UI 框架**：RinUI（现代化 UI 组件库）
- **配置管理**：JSON 格式
- **日志系统**：loguru
- **通知系统**：plyer

## 开发者信息

如需查看完整源代码或参与开发，请访问项目仓库。