<template>
  <div class="grid-main">
    <el-card>
      <diy-search-form v-bind="formConfig" :tableConfig="tableConfig"></diy-search-form>
      <diy-table
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

export default {
  data () {
    return {
      // 表单配置
      formConfig: {},
      // table配置
      tableConfig: {},
    }
  },
  methods: {
    // 初始化
    init(){
      this.formConfig = {
        width: '70%',
        // 是否显示表单按钮
        isHandle: true,
        // 表单设置
        searchForm: [
          { type: 'Input', label: '姓名', prop: 'name', placeholder: '请输入姓名...', option: {}, formoption: {} },
          { type: 'Input', label: '年龄', prop: 'age', placeholder: '请输入年龄...' },
          { type: 'Select', label: '性别', prop: 'sex', options: sexs, props: sexProps, change: row => console.log('tag', row), placeholder: '请选择性别...' },
          { type: 'Checkbox', label: '选项', prop: 'che', option: {},  options: [{value: 'val1', label:'选项1'}, {value: 'val2', label:'选项2'}]},
          { type: 'Date', label: '注册日期', prop: 'register_date', option: {valueFormat: "yyyy-MM-dd", type: 'daterange'}},
        ],
        // 表单按钮方法设置
        searchHandle: [
          { name: '导出', option: { type: 'primary',hide: false }, click: this.doExport },
          { name: '获取本页数据', option: { type: 'primary'}, click: this.readThisPage },
        ],
      }

      // table配置
      this.tableConfig = {
        loading: true,
        ref: 'diytable',
        // 是否开启全选
        isSelection: true,
        // 是否开启单选
        isSingle: false,
        isPagination: true,
        tableAttr: {
          border: false,
          showSummary: true
        },
        requestConfig: {
          apiurl: '/mock_data/data.json',
          method: 'get',
          processGetListResponse: (res) => {
            return {
              total_items: res.data.total_items,
              items: res.data.items,
            }
          }
        },
        tableHeader: [
          {
            label: 'ID',
            prop: 'id',
            attr: {sortable: 'custom', align: 'center', width: '80'}
          },
          {
            label: '姓名',
            prop: 'name',
            attr: {align: 'center'},
            edit: {
              type: 'Input',
              change: (row, index, event) => {
                console.log(row)
                console.log('change', row, index, event)
                this.$refs[this.tableConfig['ref']].fetchList()
              }
            }
          },
          {
            type: 'Button',
            label: '操作',
            attr: {fixed: 'right', align: 'right', width: '120px'},
            buttonGroup: [
              {
                name: '查看', buttonAttr: {hide: false}, click: () => {
                  alert('查看')
                }
              },
              {
                name: '删除', click: () => {
                  alert('删除')
                }
              }
            ]
          },
        ]
      }
    },
    doBulkDelete(fn) {
      console.log(fn)
      console.log(fn.getCurrentSelection())
    },
    readThisPage(){
      var table_data = this.$refs[this.tableConfig.ref].getTableData()
      this.$message.success('列表数据：'+JSON.stringify(table_data))
    },
    doExport(searchForm) {
      console.log('searchForm', searchForm)
      this.$message.success('列表数据：'+JSON.stringify(searchForm))
    }
  },
  created () {
    this.init()
  }
}
</script>

