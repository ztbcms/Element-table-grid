<template>
  <div class="grid-main">
    <el-card>
      <diy-search-form v-bind="formConfig" :tableConfig="tableConfig"></diy-search-form>
      <diy-table
        :tableData='tableData'
        :pagination.sync='pagination'
        v-bind="tableConfig"
      >
        <div slot="before">
          <el-table-column type="expand">
            <template slot-scope="props">
              展开行 {{ props.$index }}
            </template>
          </el-table-column>
        </div>

        <template slot="bulk" scope="fn">
          <el-button @click="doBulkDelete(fn)" size="mini" type="danger">删除</el-button>
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
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        width: '50%',
        // 是否显示表单按钮
        isHandle: true,
        // 表单设置
        searchForm: [
          { type: 'Input', label: '姓名', prop: 'name', width: '120px', placeholder: '请输入姓名...', option: {}, formoption: {} },
          { type: 'Input', label: '年龄', prop: 'age', width: '180px', placeholder: '请输入年龄...' },
          { type: 'Select', label: '性别', prop: 'sex', width: '180px', options: sexs, props: sexProps, change: row => console.log('tag', row), placeholder: '请选择性别...' },
          { type: 'Checkbox', label: '选项', prop: 'che', option: {},  options: [{value: 'val1', label:'选项1'}, {value: 'val2', label:'选项2'}]}
        ],
        // 表单按钮方法设置
        searchHandle: [
          { name: '导出', option: { type: 'primary' }, click: (searchForm) => console.log('searchForm', searchForm) },
        ],
        // 表单
        formAttr: {
          size: 'mini',
          labelWidth: '50px',
          class: 'diygaid',
          inline: true
        }
      },
      // 表格数据
      tableData: [],
      // table配置
      tableConfig: {
        loading: true,
        //
        ref: 'diytable',
        // 是否开启全选
        isSelection: true,
        // 是否开启单选
        isSingle: false,
        isPagination: true,
        isHandle: true,
        indexLabel: '序号',
        tableAttr: {
          border: false,
          'tree-props': {children: 'children', hasChildren: 'hasChildren'},
          showSummary: true
        },
        requestConfig: {
          apiurl: '/mock_data/data.json',
          method: 'get',
          processGetListResponse: (res)=>{
            return {
              total_items: res.data.total_items,
              items: res.data.items,
            }
          }
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
                  this.$refs.diytable.detaultGetList()
                }
            }
          },
          {
            type: 'Button',
            label: '操作',
            prop: 'materials_desc',
            tableColumnAttr: {fixed: 'right', align: 'right', width: '120px'},
            buttonGroup: [{name: '查看', click: ()=> {alert('查看')}}, {name: '删除', click: ()=> {alert('删除')}}]
          },
        ]
      },
      // 分页配置
      pagination: {
        pageSize: 5, // 页条数
        currentPage: 1, // 当前页
        total: 17, // 总条数
        sizeChange: (...args) => this.sizeChange.apply(this, args), // 页条数大小改变触发
        currentChange: (...args) => this.currentChange.apply(this, args), // 当前页改变触发
        layout: 'total,sizes ,prev, pager, next,jumper'
      }
    }
  },
  methods: {
    GetList () {
      // this.tableData = data.slice((this.pagination.pageNum - 1) * this.pagination.pageSize, this.pagination.pageNum * this.pagination.pageSize)
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

    doBulkDelete(fn) {
      console.log(fn)
      console.log(fn.getCurrentSelection())
    }
  },
  created () {
    this.ResetList()
  }
}
</script>

<style>
  .diygaid .el-form-item__content .el-input {
    width: 200px;
  }
</style>
