<template>
  <div class="cpy-main">
    <el-card>
      <diy-search-form v-bind="formConfig"></diy-search-form>
      <diy-table
        :tableData='tableData'
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
import data from './data'
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
      this.tableData = data.slice((this.pagination.pageNum - 1) * this.pagination.pageSize, this.pagination.pageNum * this.pagination.pageSize)
      // console.log(this.tableData)
    },
    ResetList () {
      this.pagination.pageNum = 1
      this.tableData = []
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
