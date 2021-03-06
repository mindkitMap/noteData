# @mind-kit/note-data

笔记相关数据结构及相关核心功能。

## 如何运行

作为底层支持库使用，一般不单独运行。

使用方法参照本文档和测试用例。

## 如何工作

本库规定了MindKit体系中的核心概念、实体结构、基本功能等。体现了MindKit体系的领域逻辑。后面的章节详细描述。

## 概念

| 名词   | 名词       | 说明                                                         |
| ------ | ---------- | ------------------------------------------------------------ |
| 库     | Repository | 一个笔记的集合，包含了多个节点及它们之间的结构关系。可能有多中实现。有些可以有存储能力。有些可以有更改能力。默认的库可以参见下面的具体说明。 |
| 节点   | Node       | 一个含有笔记相关内容的节点。可能含有内容，也可能不含有内容，只有结构类作用。比如下面的“引用”。 |
| 引入   | Include    | 对其他库的内容引入。引入是传播的，引入一个库就同时也引入了它的包含。 |
| 内容   | Content    | 笔记的内容，特别是一个节点的内容，可能是文本、多媒体、链接等各种类别。 |
| 元数据 | Meta       | 节点的一些元数据。一般用于支持功能，并不直接可见。           |
| 标签   | Tag        | 一种特殊的元数据。有较多的业务意义。                         |
| 主题   | Topic      | 对节点库的一个不严格分片，便于人类用户在失去工具的时候仍然能对节点进行编辑和简单组织。一般一个主题包括一个节点和它的子节点。并不是所有的库都严格支持主题。只有人类用户需要直接编辑和组织的库需要这个概念。主题所在的节点不一定是”根“节点。 |
| 应用   |            | 是对核心业务和数据的一种使用。通过插件的方式叠加在核心逻辑上。比如TODO。  具体例子见@mind-kit/app-todo |

## 实体结构

|            |          |      |                                                              |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| Repository |          |      |                                                              |
|            | type     |      |                                                              |
|            | ...      |      | 不定，由type决定，包含构造此类Respository的必要信息。        |
| Include    |          |      | object，对另一个Respository的引用。                          |
|            | type     |      | string，必须                                                 |
|            | ...      |      | 不定，由type决定，包含寻找到此类repository的必要信息。       |
| Node       | id       |      | string，必须                                                 |
|            | children |      | Node[]                                                       |
|            | content  |      | object，节点的内容信息，见下面”Content“详细说明              |
|            |          | type | string，必须                                                 |
|            |          | ...  | 不定，由type决定，包含寻找到此种content的必要信息。          |
|            | meta     |      | object， 节点的非内容信息。由内容衍生的信息也可能会在这里。比如tag，properties，markers |
| Topic      | id       |      | string，必须，等于root.id                                    |
|            | root     |      | Node，必须                                                   |

### Repository

| 类型     |                                                              |      |
| -------- | ------------------------------------------------------------ | ---- |
| Valult   | 默认类型 - 详见专门的子项目 https://github.com/mindkitMap/store |      |
| Folder   | 组合类型，在一个文件夹（或相似结构）中，递归寻找，可以有其他Repository能识别的内容。 |      |
| XMind    | XMind的存储文件，每个文件对应一个topic。                     |      |
| Markdown | Markdown文件，每个文件对应一个topic                          |      |
| RoamEdit | RoamEdit的备份文件，取最新的一个，单个文件中有所有topic      |      |

### Content

| 类型  | 属性 |                                                              |
| ----- | ---- | ------------------------------------------------------------ |
| text  | body |                                                              |
| ref   | id   | 指向另一个节点，如何使用看应用层。                           |
| embed | mime | 多媒体嵌入，包括图片，视频，音频等。如果使用看应用层。也可以解释为附件。 |
|       | url  |                                                              |

### Meta

|                |      |                                         |                                                              |
| -------------- | ---- | --------------------------------------- | ------------------------------------------------------------ |
| repositoryInfo |      | object                                  | 跟节点来源有关数据。                                         |
| viewInfo       |      | object                                  | 跟节点展示有关的数据。比如展开、隐藏等。但此层面并不详细规定。由界面层自由使用。 |
| properties     |      | key，value值对，value为任意可json的对象 |                                                              |
|                | tags | Tag[]                                   | Tag是重要对象。有业务意义。在properties中相对特殊。如下详述。 |


### Tag

|          |          |            |                                                              |
| -------- | -------- | ---------- | ------------------------------------------------------------ |
| tag      |          |            | tag是一种机制，本身是可以附着在节点上的任意数据。其规则制定由应用负责。比如 - |
| category |          |            | 如果tag没有被其他应用识别，则被认为是category。              |
|          | Category | string     | 以/分割的分类名称                   |


