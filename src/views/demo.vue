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
        ref="diyTable"
      >
        <template slot="bluk" scope="fn">
          <p @click="demoClick(fn)">22</p>
        </template>
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
          { name: '查询', option:{  type: 'primary' }, click: this.click },
          { name: '重置', option: { type: 'primary' }, click: this.click }
        ],
      },
      // table配置
      tableConfig: {
        isSelection: true,
        isHandle: true,
        // 排序事件回调
        sortChange: function(row) {console.log(row)},
        tableHeader: [
          {
            label: 'ID',
            prop: 'id',
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
        ],
        requestConfig: {
            apiurl: 'http://localhost:3003/api/getList',
            method: 'get',
            data: {
                'name': ''
            },
            headers: {
                'content-type': 'text/json; charset=utf-8'
            },
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
    demoClick(fn) {
      console.log(fn.functionalBtn())
    }
  }
}
</script>
