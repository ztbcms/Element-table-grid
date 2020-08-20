# 表格内slot说明

| slot名 | 说明
| :------------ | :------------ |
| first | 该 `slot` 位于`所有表单单元格的前面`，也就是说，如果在该`slot`内写入元素，该元素会在所有`单元格的前面` |
| later | 该 `slot` 位于位于 操作列的`前面`  |
| operation | 该 `slot` 位于操作列的 `单元格内`，该 `slot` 一样用于操作单行表格 |
| bluk | 该单元格位于 `全选栏` 全选checkBox`后面`，一般用于配置一些全选之后的操作ui |
| pagination | 该 `slot` 位于`分页栏`，如果该`slot`写入了`元素`，那默认的分页ui组件就会`消失` |
| searchBefore | 该 `slot` 位于工具栏`前面`，该`slot`会`返回对象`，该对象是`工具栏所有以绑定数据的值` |
| searchAfter | 该 `slot` 位于工具栏`后面`，该`slot`会`返回对象`，该对象是`工具栏所有以绑定数据的值` |
| 自定义slot | 该 `slot` 位于表格头部，该`slot`为自定义模块, 需在<a href="#md/basic?id=渲染列与行">tableConfig.tableHeader</a>配置 |