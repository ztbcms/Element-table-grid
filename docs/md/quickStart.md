# 快速上手
> 开始旅程


## 引入 element-ui
正如[前文](/zh-cn/?id=vue-data-tables)中提到的，本库依赖于 [element-ui](http://element.eleme.io/) 的 [el-table](http://element.eleme.io/#/zh-CN/component/table), [el-table-column](http://element.eleme.io/#/zh-CN/component/table#table-column-attributes), [el-button](http://element.eleme.io/#/zh-CN/component/button) 和 [el-pagination](http://element.eleme.io/#/zh-CN/component/pagination) 组件, 以及 [loading](https://element.eleme.io/#/zh-CN/component/loading) 指令，所以在引入 `vue-data-tables` 之前, 我们需要先完整的引入 `element-ui` 或者[按需引入](http://element.eleme.io/#/zh-CN/component/quickstart) 这些组件和指令。

```javascript
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

# Hello world
* 以下操作请打开操作台,查看日志
* 按这几个按钮试一试
* 试着排序一下列表
* 试着全选操作
* 试着翻页
* 试着修改以下名字

```html
/*vue*/
<template>
  <div class="cpy-main">
    <el-card>
      <diy-search-form v-bind="formConfig">
      </diy-search-form>
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
        // 表单设置
        searchForm: [
          { type: 'Input', prop: 'name', width: '180px', placeholder: '请输入姓名...' },
          { type: 'Button', name: '查询', click: this.click }
        ],
      },
      // table配置
      tableConfig: {
        // 是否全选
        isSelection: true,
        // 排序事件回调
        sortChange: this.change,
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
                change: this.change
            }
          },
          {
            label: '操作',
            type: 'Button',
            tableColumnAttr: { fixed: 'right', align: 'center', 'width': '250px' },
            buttonGroup: [
                { name: '编辑', click: this.click, buttonAttr: { type: 'primary' }, hidKey: 'buttonHid' },
                { name: '删除', click: this.click, buttonAttr: { type: 'danger' } }
            ]
          }
        ],
        requestConfig: {
            apiurl: 'http://localhost:3003/api/getList',
            method: 'get',
            datakeys: ['data', 'items'],
            totalkeys: ['data', 'total'],
            resCodes: [200, 1]
        }
      }
    }
  },
  methods: {
    click(row) {
      console.log(row)
    },
    change(row) {
      console.log(row)
    }
  }
}
</script>

```
