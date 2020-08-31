# 全选
开启全选需要到`渲染表单配置项`开启`isSelection:true`之后才可以配置全选。
可配置

主要功能:
+ 返回已勾选的数据

使用`slot`来传递全选方的按钮以及一些其他的组件，`slot`名为：`bulk`,他会`返回一个函数`，该函数会`返回已选中数据`，数据有`1种格式`
- 选中的源数据数组`selectedRows`

尝试打开控制台，查看日志输出吧
```html
/*vue*/
<template>
  <div class="grid-main">
    <el-card>
      <diy-table
        v-bind="tableConfig"
        ref="diyTable"
      >
        <template slot="bulk" scope="fn">
          <el-button @click="checkAllClick(fn)" size="mini" type="danger">删除</el-button>
        </template>
      </diy-table>
    </el-card>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
export default {
  data () {
    return {
      // table配置
      tableConfig: {
        isSelection: true,
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
                { name: '编辑', size: '', click: this.click, buttonAttr: { type: 'primary' }, hidKey: 'buttonHid' },
                { name: '删除', size: '', click: this.click, buttonAttr: { type: 'danger' }, hidKey: '' }
            ]
          }
        ],
        requestConfig: {
            apiurl: '/data/demo1.json',
            method: 'get',
            datakeys: ['data', 'items'],
            totalkeys: ['data', 'total'],
            resCodes: [200, 1]
        }
      }
    }
  },
  methods: {
    click(row, index) {
      console.log(row)
      ELEMENT.Message.success('点击：'+index)
    },
    change(info) {
      console.log(info)
      ELEMENT.Message.success('修改内容为：'+info.value)
    },
    checkAllClick(fn) {
      // 获取当前选中  
      var selectInfo = fn.getCurrentSelection()
      console.log(selectInfo)
      if(selectInfo && selectInfo.selectedRows){
        console.log(selectInfo.selectedRows)
      }
    }
  }
}
</script>
```
