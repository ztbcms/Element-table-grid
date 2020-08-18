# 功能栏
功能栏是位于表格之上,能够快速创建出一些按钮, `el-checkbox`、`el-search`、`el-input`、`el-button`等几种组件

```html
/*vue*/
<template>
  <div class="cpy-main">
    <el-card>
      <diy-search-form v-bind="formConfig"></diy-search-form>
      <diy-table
        v-bind="tableConfig"
        ref="diyTable"
      >
      </diy-table>
    </el-card>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
// import data from './data'
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        // 是否显示表单按钮
        isHandle: true,
        // 表单设置
        searchForm: [
          { type: 'Input', label: '', prop: 'name', width: '180px', placeholder: '请输入姓名...' },
          { type: 'Select', label: '', prop: 'age', width: '180px', placeholder: '选择' ,options: sexs},
          { type: 'Radio', label: '单选',  prop: 'che2', option: {},options: sexs},
          { type: 'Checkbox',label: '多选', prop: 'che', option: {},options: sexs},
          { type: 'Date', label: '日期', prop: 'sex3', width: '180px' },
          { type: 'DateTime', label: '日期时间', prop: 'sex4', width: '180px' },
          { type: 'Switch', label: '开关', prop: 'sex5', width: '180px' },
          { type: 'Button', name: '查询', option: { type: 'primary' }, click: function(fromData) {console.log(fromData)} }
        ],
      },
      // table配置
      tableConfig: {
        tableHeader: [
          {
            label: 'ID',
            prop: 'id',
            showSummary: true,
            tableColumnAttr: { sortable: 'custom', align: 'center', width: '80' }
          },
          {
            label: '姓名',
            prop: 'name',
            tableColumnAttr: { align: 'center' },
            edit: {
                type: 'Input',
                change: (row, index, event) => {
                    console.log('change', row, index, event)
                }
            }
          },
          {
            label: '操作',
            type: 'Button',
            tableColumnAttr: { fixed: 'right', align: 'center', 'width': '250px' },
            buttonGroup: [
                { name: '编辑', size: '', click: this.click, buttonAttr: { type: 'primary' }, hidKey: 'buttonHid' },
                { name: '删除', size: '', click: this.click, buttonAttr: { type: 'danger' }, hidKey: '' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    click(row) {
        console.log(row)
    }
  }
}
</script>
```

## 配置项
**属性说明**

| 参数 | 说明 | 类型 | 默认值 | 可选值 | 其他 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| type | 功能类型 | String | <div style="width: 45px">-</div> | Input / Button / Select / Radio / Checkbox / Date / DateTime / Switch | 可选值可查看下方的type详细说明 |
| name | 按钮内容 | String | - | - | **这个属性只有type: Button的时候才能使用** |
| label | 自定义名字 | String | - | - | - |
| prop | 绑定的key值 | String | - | - | - |
| width | 宽度 | String | - | - | - |
| option | 功能配置 | Object | - | - | 这个时element对应功能的配置,详情查看下方的type详细说明 |
| placeholder | 当为空时的提示文字 | String | - | - | **当type:Input / Select / Date / DateTime**可用 |
| options | 选项列表 | Array | - | - | **当type:Select / Radio / Checkbox**可用 |
| click | button点击事件 | Function | - | - | **当click:function**之后,**它会有回调参数,回调参数正是功能区所有绑定和更改的数据**,可以用来做查询和筛选查询 |

## type说明
上方配置的type每个值对应的其实`element-ui`的组件,`option`是每个`element-ui`组件的配置,比如`样式` `是否禁用`等`element-ui`自带的功能配置

| type值 | 说明 | 对应element-ui组件 | option配置传送门 | options数据格式 |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| Input | 文本输入框 | [el-Input](https://element.eleme.cn/#/zh-CN/component/input#input-shu-ru-kuang) | [el-Input](https://element.eleme.cn/#/zh-CN/component/input#input-attributes) | - |
| Button | 按钮 | [el-button ](https://element.eleme.cn/#/zh-CN/component/button) | [el-button](https://element.eleme.cn/#/zh-CN/component/button#attributes) | - |
| Select | 选择框 | [el-Select](https://element.eleme.cn/#/zh-CN/component/select) | [el-Select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes) | `[{ label: '男', value: 'M' }, { label: '女', value: 'F' }]` |
| Radio | 单选框 | [el-Radio](https://element.eleme.cn/#/zh-CN/component/radio) | [el-Radio](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes) |`[{ label: '男', value: 'M' }, { label: '女', value: 'F' }]` |
| Checkbox | 复选框 | [el-Checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox) | [el-Checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes) |`[{ label: '男', value: 'M' }, { label: '女', value: 'F' }]` |
| Date | 日期选择器 | [el-DatePicker](https://element.eleme.cn/#/zh-CN/component/date-picker) | [el-DatePicker](https://element.eleme.cn/#/zh-CN/component/date-picker#attributes) | - |
| DateTime | 日期时间选择器 | [el-DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker) | [el-DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker#attributes) | - |
| Switch | 开关 | [el-Switch](https://element.eleme.cn/#/zh-CN/component/switch) | [el-Switch](https://element.eleme.cn/#/zh-CN/component/switch#attributes) | - |

## slot说明
在功能区会有一个`slot`,该`slot`用于表格内置的组件满足不了需求的时候用于扩展功能用的,`slot`会**暴露一个行参,该行参是功能区所有绑定和更改的数据**,可以使用slot-scope来接收

```html
/*vue*/
<template>
  <div class="cpy-main">
    <el-card>
      <diy-search-form v-bind="formConfig">
        <template slot-scope="fromData">
          <p>{{fromData}}</p>
        </template>
      </diy-search-form>
      <diy-table
        v-bind="tableConfig"
        ref="diyTable3"
      >
      </diy-table>
    </el-card>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
// import data from './data'
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        // 表单设置
        searchForm: [
            { type: 'Input', label: '', prop: 'name', width: '180px', placeholder: '请输入姓名...' },
            { type: 'Select', label: '', prop: 'age', width: '180px', placeholder: '选择' ,options: sexs},
            { type: 'Radio', label: '单选',  prop: 'che2', option: {},options: sexs},
            { type: 'Checkbox',label: '多选', prop: 'che', option: {},options: sexs},
            { type: 'Date', label: '日期', prop: 'sex3', width: '180px' },
            { type: 'DateTime', label: '日期时间', prop: 'sex4', width: '180px' },
            { type: 'Switch', label: '开关', prop: 'sex5', width: '180px' },
            { type: 'Button', name: '查询', option: { type: 'primary' }, click: this.click}
          ]
      },
      // table配置
      tableConfig: {
        sortChange: function(row) {console.log(row)},
        tableHeader: [
          {
            label: 'ID',
            prop: 'id',
            showSummary: true,
            tableColumnAttr: { sortable: 'custom', align: 'center', width: '80' }
          },
          {
            label: '姓名',
            prop: 'name',
            tableColumnAttr: { align: 'center' },
            edit: {
                type: 'Input',
                change: (row, index, event) => {
                    console.log('change', row, index, event)
                }
            }
          },
          {
            label: '操作',
            type: 'Button',
            tableColumnAttr: { fixed: 'right', align: 'center', 'width': '250px' },
            buttonGroup: [
                { name: '编辑', size: '', click: this.click, buttonAttr: { type: 'primary' }, hidKey: 'buttonHid' },
                { name: '删除', size: '', click: this.click, buttonAttr: { type: 'danger' }, hidKey: '' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    click(row) {
      console.log(row)
    }
  }
}
</script>
```