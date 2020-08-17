# 快速上手
> 开始旅程


## 引入 element-ui
正如[前文](/zh-cn/?id=vue-data-tables)中提到的，本库依赖于 [element-ui](http://element.eleme.io/) 的 [el-table](http://element.eleme.io/#/zh-CN/component/table), [el-table-column](http://element.eleme.io/#/zh-CN/component/table#table-column-attributes), [el-button](http://element.eleme.io/#/zh-CN/component/button) 和 [el-pagination](http://element.eleme.io/#/zh-CN/component/pagination) 组件, 以及 [loading](https://element.eleme.io/#/zh-CN/component/loading) 指令，所以在引入 `vue-data-tables` 之前, 我们需要先完整的引入 `element-ui` 或者[按需引入](http://element.eleme.io/#/zh-CN/component/quickstart) 这些组件和指令。

```
// entirely import
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```


# Hello world
* 按这几个按钮试一试
* 试着排序一下列表
* 试着多创建一些数据，然后试试翻页
* 试着通过用在输入框里输入编号来过滤表格

```html
/*vue*/
<template>
  <div class="cpy-main">
    <el-card>
      <diy-search-form v-bind="formConfig"></diy-search-form>
      <diy-table
        :pagination.sync='pagination'
        :allselect="allselect"
        v-bind="tableConfig"
        ref="diyTable"
      >
        <div slot="before">
          <el-table-column type="expand">
            <template slot-scope="props">
              展开行 {{ props.$index }}
            </template>
          </el-table-column>
        </div>

        <template slot="location" slot-scope="scope">
          {{scope.row.id}} / {{scope.row.name}}
        </template>
      </diy-table>
    </el-card>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M', disabled: true }, { label: '女', value: 'F' }]
let sexProps = { label: 'label', value: 'value', disabled: 'disabled' }
// let intersts = [{ label: '羽毛球', value: 'badminton' }, { label: '篮球', value: 'basketball' }]
// let interstProps = { label: 'label', value: 'value' }
// import data from './data'
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        // 是否显示表单按钮
        isHandle: true,
        // 表单数据
        searchData: {
          name: null,
          age: null,
          sex: null,
          interst: null
        },
        // 表单设置
        searchForm: [
          { type: 'Input', label: '', prop: 'name', width: '180px', placeholder: '请输入姓名...', option: {}, formoption: {} },
          { type: 'Input', label: '', prop: 'age', width: '180px', placeholder: '请输入年龄...' },
          { type: 'Select', label: '', prop: 'sex', width: '180px', options: sexs, props: sexProps, change: row => console.log('tag', row), placeholder: '请选择性别...' },
          // { type: 'Checkbox', label: '', width: '180px', prop: 'interst', checkboxs: intersts, props: interstProps }
        ],
        // 表单按钮方法设置
        searchHandle: [
          { name: '查询', option: { type: 'primary' }, click: (searchForm) => console.log('searchForm', searchForm) },
          { name: '重置', option: { type: 'primary' }, click: () => '' }
        ],
        // 表单
        formAttr: {
          size: 'mini',
          labelWidth: '100px',
          inline: true
        }
      },
      // table配置
      tableConfig: {
        // 表格数据
        tableData: [],
        ref: 'diytabe',
        // 是否开启全选
        isSelection: true,
        // 是否开启单选
        isSingle: false,
        isIndex: false,
        isPagination: true,
        isHandle: true,
        indexLabel: '序号',
        tableAttr: {
          ref: 'cpytable',
          border: true,
          'row-key': "id",
          'tree-props': {children: 'children', hasChildren: 'hasChildren'},
          showSummary: true
        },
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
              { name: '编辑', size: '', click: (row, index) => console.log('tag', row, index), buttonAttr: { type: 'primary' }, hidKey: 'buttonHid' },
              { name: '删除', size: '', click: (row, index) => console.log('tag', row, index), buttonAttr: { type: 'danger' }, hidKey: '' }
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
      },
      // 右下功能区
      allselect: [
        { name: '删除', size: '', click: row => console.log('tag', row), buttonAttr: { type: 'danger' }, prop: 'id' }
      ]
    }
  },
  methods: {
    GetList () {
      this.tableConfig.tableData = _data1.slice((this.pagination.pageNum - 1) * this.pagination.pageSize, this.pagination.pageNum * this.pagination.pageSize)
      console.log(this.tableConfig.tableData)
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
    console.log(_data1)
    this.ResetList()
  }
}
</script>
```
