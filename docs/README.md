#### 表单

##### 表单配置
| 参数  |  说明 | 类型  | 默认值  | 可选值  |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| tableConfig | 配置 | Object | - | - |

**tableConfig参数**

| 参数  |  说明 | 类型  | 默认值  | 可选值  |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| multistage | 二级弹窗配置 | Object | - | - |
| isSelection | 是否开启多选 | Boolean | false | - |
| isSingle | 是否开启单选 | Boolean | false | - |

**multistage参数**

| 参数  |  说明 | 类型  | 默认值  | 可选值  |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| turnOn | 是否开启二级弹窗(如果设置`true`在操作列会默认出现一个查看按钮 | Boolean | false | - |
| prop | 在一级数据里面指定某个`key`的`value`作为二级数据 | String | - | - |
| name | 默认查看按钮内容 | String | - | - |
| buttonAttr | 默认查看按钮配置，和element一样 [传送门](https://element.eleme.cn/#/zh-CN/component/button) | Boolean | - | - |
| childrenConfig | 二级弹窗表单配置，配置和一级表单配置一样，如果不填默认以一级配置为准 | Boolean | false | - |

&emsp;&emsp;
##### 功能区域（表单左下按钮列表
**属性说明**

| 参数  |  说明 | 类型  | 默认值  | 可选值  |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| allselect | 按钮列表 | Array | - | - |

**allselect**

| 参数  |  说明 | 类型  | 默认值  | 可选值  |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| name | 按钮内容 | String | - | - |
| size | 按钮大小 | String | mini | medium / small / mini |
| buttonAttr | 按钮配置和element一样 [传送门](https://element.eleme.cn/#/zh-CN/component/button) | Object | - | - |
| prop | 设置click返回列表数据的key | String | - | - |
| click | 按钮被点击之后的函数，返回已选列表的数据 | Function | - | - |

**数据格式**
```javascript
allselect: [
  { name: '删除', size: '', click: row => console.log('tag', row), buttonAttr: { type: 'danger' }, prop: 'id' }
]
```
&emsp;&emsp;
##### 二级弹窗
和一级弹窗配置一样
