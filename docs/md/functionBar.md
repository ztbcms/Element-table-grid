# 功能栏
功能栏是位于表格之上,能够快速创建出一些按钮, `el-checkbox`、`el-search`、`el-input`、`el-button`等几种组件

```html
/*vue*/
<template>
  <div class="cpy-main">
    <el-card>
      <diy-search-form v-bind="formConfig"></diy-search-form>
      <diy-table
        :pagination.sync='pagination'
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
          { type: 'Switch', label: '开关', prop: 'sex5', width: '180px' }
        ],
        // 表单按钮方法设置
        searchHandle: [
          { name: '查询', option: { type: 'primary' }, click: (searchForm) => console.log('searchForm', searchForm) },
          { name: '重置', option: { type: 'primary' }, click: () => '' }
        ],
      },
      // table配置
      tableConfig: {
        tableData: [],
        ref: 'diytabe',
        isSelection: true,
        isHandle: true,
        // 排序事件回调
        sortChange: row => console.log('sortChange', row),
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
                    this.$refs.diyTable.detaultGetList()
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
      },
      // 分页配置
      pagination: {
        pageSize: 5, // 页条数
        currentPage: 1, // 当前页
        total: 17, // 总条数
        sizeChange: (...args) => this.sizeChange.apply(this, args), // 页条数大小改变触发
        currentChange: (...args) => this.currentChange.apply(this, args), // 当前页改变触发
        layout: 'total,sizes ,prev, pager, next,jumper',
        style: 'display: flex;justify-content: flex-end;align-items: center;margin-top: 10px;'
      }
    }
  },
  methods: {
    click(row) {
        console.log(row)
    },
    GetList () {
      this.tableConfig.tableData = _data1.slice((this.pagination.pageNum - 1) * this.pagination.pageSize, this.pagination.pageNum * this.pagination.pageSize)
      // console.log(this.tableData)
    },
    ResetList () {
      this.pagination.pageNum = 1
      this.tableConfig.tableData = []
      this.GetList()
    },
    sizeChange (val) {
      console.log('sizeChange', val)
      this.pagination.pageSize = val
    },
    currentChange (val) {
      console.log('currentChange', val)
      this.pagination.pageNum = val
      this.GetList()
    },
    // 查看选择
    Look () {
      console.log(this.$refs.diytable.$refs.cpytable.selection)
    }
  },
  created () {
    this.ResetList()
  }
}
</script>
```

## 配置项
**属性说明**

| 参数 | 说明 | 类型 | 默认值 | 可选值 | 其他 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| type | 功能类型 | String | - | Input / Select / Radio / Checkbox / Date / DateTime / Switch | 可选值可查看下方的type详细说明 |
| label | 自定义名字 | String | - | - | - |
| prop | 绑定的key值 | String | - | - | - |
| width | 宽度 | String | - | - | - |
| option | 功能配置 | Object | - | - | 这个时element对应功能的配置,详情查看下方的type详细说明 |
| placeholder | 当为空时的提示文字 | String | - | - | **当type:Input / Select / Date / DateTime**可用 |
| options | 选项列表 | Array | - | - | **当type:Select / Radio / Checkbox**可用 |

## type说明
上方配置的type每个值对应的其实`element-ui`的组件,`option`是每个`element-ui`组件的配置,比如`样式` `是否禁用`等`element-ui`自带的功能配置

| type值 | 说明 | 对应element-ui组件 | option配置传送门 | options数据格式 |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| Input | 文本输入框 | [el-Input](https://element.eleme.cn/#/zh-CN/component/input#input-shu-ru-kuang) | [el-Input](https://element.eleme.cn/#/zh-CN/component/input#input-attributes) | - |
| Select | 选择框 | [el-Select](https://element.eleme.cn/#/zh-CN/component/select) | [el-Select](https://element.eleme.cn/#/zh-CN/component/select#select-attributes) | `[{ label: '男', value: 'M' }, { label: '女', value: 'F' }]` |
| Radio | 单选框 | [el-Radio](https://element.eleme.cn/#/zh-CN/component/radio) | [el-Radio](https://element.eleme.cn/#/zh-CN/component/radio#radio-attributes) |`[{ label: '男', value: 'M' }, { label: '女', value: 'F' }]` |
| Checkbox | 复选框 | [el-Checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox) | [el-Checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes) |`[{ label: '男', value: 'M' }, { label: '女', value: 'F' }]` |
| Date | 日期选择器 | [el-DatePicker](https://element.eleme.cn/#/zh-CN/component/date-picker) | [el-DatePicker](https://element.eleme.cn/#/zh-CN/component/date-picker#attributes) | - |
| DateTime | 日期时间选择器 | [el-DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker) | [el-DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker#attributes) | - |
| Switch | 开关 | [el-Switch](https://element.eleme.cn/#/zh-CN/component/switch) | [el-Switch](https://element.eleme.cn/#/zh-CN/component/switch#attributes) | - |