# 功能栏
功能栏是位于表格之上,能够快速创建出一些按钮, checkbox、search、input、button等几种组件

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
          { type: 'Checkbox', prop: 'checkbox', option: {},checkboxs: [{value: '内容1',label: '内容1', option: {}}, {value: '内容2',label: '内容2', option: {}}]},
          { type: 'Switch', label: '',width: '180px', options: sexs, props: sexProps, change: row => console.log('tag', row), placeholder: '请选择性别...' }
        ],
        // 表单按钮方法设置
        searchHandle: [
          { name: '查询', option: { type: 'primary' }, click: (searchForm) => console.log('searchForm', searchForm) }
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
        // 是否开启索引值显示
        isIndex: true,
        // 是否显示分页
        isPagination: true,
        // 是否显示表单操作按钮
        isHandle: true,
        // 设置索引列名	
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