---
outline: deep
---

# API 参考

本文档介绍 RandPicker 的核心 API 接口。

## ChoiceMaker 类

随机选择器，负责执行随机抽选操作。

### 构造函数

```python
def __init__(self, parent)
```

**参数：**
- `parent`: 父对象，通常为 `RPMain` 实例

### 方法

#### choosePeople

随机选择学生。

```python
@Slot(int, bool, result=list)
def choosePeople(self, number: int = 1, notify: bool = True) -> list[Any] | None
```

**参数：**
- `number`: 选择的学生数量，默认为 1
- `notify`: 是否发送通知，默认为 True

**返回值：**
- 当 `notify=True` 时，返回 None（通知已发送）
- 当 `notify=False` 时，返回学生信息列表，每个学生包含：
  - `name`: 学生姓名
  - `weight`: 权重值
  - `enabled`: 是否启用
  - `properties`: 附加属性
  - `avatar`: 头像路径

**示例：**

```python
# 发送通知的抽选
choice_maker.choosePeople(number=3, notify=True)

# 不发送通知的抽选
result = choice_maker.choosePeople(number=2, notify=False)
print(result)  # 输出学生信息列表
```

---

## StudentsConfig 类

学生配置管理，负责学生数据的读取和写入。

### 构造函数

```python
def __init__(self, parent=None)
```

**参数：**
- `parent`: 父对象（可选）

### 方法

#### get_students

获取所有学生的列表。

```python
@Slot(result=list)
def get_students(self) -> list
```

**返回值：**
- 学生列表，每个学生为一个字典对象

#### get_enabled_students

返回启用学生的 GUID 列表。

```python
@Slot(result=list)
def get_enabled_students(self) -> list
```

**返回值：**
- 已启用学生的 GUID 列表

#### add_student

添加新学生。

```python
@Slot(str, int, bool)
def add_student(self, name: str, weight: int = 1, enabled: bool = True) -> None
```

**参数：**
- `name`: 学生姓名
- `weight`: 权重值，默认为 1
- `enabled`: 是否启用，默认为 True

**示例：**

```python
students_config.add_student("王五", weight=2, enabled=True)
```

#### remove_student

删除学生。

```python
@Slot(str)
def remove_student(self, guid: str) -> None
```

**参数：**
- `guid`: 要删除的学生 GUID

#### save_config

保存学生配置到文件。

```python
@Slot()
def save_config(self)
```

**示例：**

```python
students_config.add_student("赵六")
students_config.save_config()
```

---

## SettingsConfig 类

应用设置配置管理，负责应用设置的读取和写入。

### 构造函数

```python
def __init__(self, parent=None)
```

**参数：**
- `parent`: 父对象（可选）

### 方法

#### getWidgetPosition

获取主窗口位置。

```python
@Slot(result="QVariantList")
def getWidgetPosition(self) -> list[int | None]
```

**返回值：**
- 窗口位置列表 `[x, y]`，如果未设置则为 `[None, None]`

#### setWidgetPosition

设置主窗口位置。

```python
@Slot(int, int)
def setWidgetPosition(self, x: int, y: int) -> None
```

**参数：**
- `x`: 窗口 X 坐标
- `y`: 窗口 Y 坐标

#### getNotifyOptionStatus

获取通知方式状态。

```python
@Slot(str, result=bool)
def getNotifyOptionStatus(self, option: str) -> bool
```

**参数：**
- `option`: 通知方式名称（`native`、`classisland`、`randpicker`、`classwidgets`）

**返回值：**
- 该通知方式是否启用

**示例：**

```python
is_native_enabled = settings_config.getNotifyOptionStatus("native")
```

#### setNotifyOptionStatus

设置通知方式状态。

```python
@Slot(str, bool)
def setNotifyOptionStatus(self, option: str, status: bool) -> None
```

**参数：**
- `option`: 通知方式名称
- `status`: 是否启用

---

## RPMain 类

主程序类，负责应用的生命周期管理。

### 构造函数

```python
def __init__(self)
```

### 方法

#### open_settings

打开设置窗口。

```python
def open_settings(self)
```

#### restart

重新启动应用。

```python
@Slot()
def restart(self)
```

#### quit

退出应用。

```python
@Slot()
def quit(self)
```

---

## 数据结构

### 学生对象

```python
{
    "id": "uuid-string",        # 唯一标识符
    "name": "学生姓名",         # 姓名
    "weight": 1,                 # 权重值
    "enabled": True,             # 是否启用
    "avatar": "/path/to/avatar", # 头像路径
    "properties": []             # 附加属性
}
```

### 配置文件位置

- 学生数据：`CONFIG_DIR / students.json`
- 应用设置：`CONFIG_DIR / settings.json`

---

## 使用示例

### 完整的抽选流程

```python
from PySide6.QtWidgets import QApplication
from core.main import RPMain

# 创建应用
app = QApplication(sys.argv)

# 创建主实例
instance = RPMain()

# 获取配置管理器
students_config = instance.studentsConfig
choice_maker = instance.choiceMaker

# 添加学生
students_config.add_student("小明", weight=1)
students_config.add_student("小红", weight=2)
students_config.save_config()

# 执行抽选
choice_maker.choosePeople(number=1, notify=True)

# 运行应用
app.exec()
```

### 自定义通知格式

```python
from core.config import SettingsConfig

settings_config = SettingsConfig()

# 设置原生通知格式
format_data = {
    "title": "恭喜 {count} 位同学被选中",
    "body": "{names}",
    "names": {"separator": "、"},
    "suffix": {"person": "位同学", "group": "个小组"}
}
settings_config.setNotifyFormat("native", format_data)
```
