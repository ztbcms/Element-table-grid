# 介绍

本组件由以下4部分组成：

* 功能栏
* 表格
  * 数据展示区
  * 列动作区
* 左下按钮/全选区
* 分页栏

![dZYBPf.png](../image/t1.png)

## 功能栏
工具栏完全是由用户自定义的，通常情况下`功能`都可以是独立于 `diy-tables` 之外的, 如果有必要的话，可以通过名为`fromData`的[具名插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%85%B7%E5%90%8D%E6%8F%92%E6%A7%BD)将`工具栏`插入 `功能栏` 中。具体内容请参见[工具栏](/md/functionBar.md)章节。

## 表格
这一部分实际上就是一个内置的 [el-table](http://element.eleme.io/#/zh-CN/component/table)，如果你不了解 [el-table](http://element.eleme.io/#/zh-CN/component/table) 请先仔细阅读其文档。

## 全选/按钮区
这个功能区是由一个内置的[el-Checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox)和多个[el-button](https://element.eleme.cn/#/zh-CN/component/checkbox)组成的,一般用于多选删除。

## 分页栏
实际上是一个内置的 [el-pagination](http://element.eleme.io/#/component/pagination), 如果不了解请仔细阅读其[文档](http://element.eleme.io/#/zh-CN/component/pagination)。`分页栏`在本库内的使用，请参见[分页](/md/paging.md)章节。
