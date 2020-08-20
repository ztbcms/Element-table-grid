<template>
  <div class="gaid-main">
    <el-card>
      <diy-search-form v-bind="formConfig"></diy-search-form>
      <diy-table v-bind="tableConfig">
      </diy-table>
    </el-card>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
let sexProps = { label: 'label', value: 'value' }
export default {
  data () {
    return {
      // 表单配置
      formConfig: {},
      // 表格配置
      tableConfig: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 表单配置
      this.formConfig = {
        // 表单宽
        width: '50%',
        // 表单设置
        searchForm: [
          { type: 'Input', label: '姓名', prop: 'name', placeholder: '请输入姓名...', option: {}, formoption: {} },
          { type: 'Input', label: '年龄', prop: 'age', placeholder: '请输入年龄...' },
          // { type: 'Date', label: '选择时间', prop: 'date', option: { "value-format": "yyyy-MM-dd", placeholder: '请选择时间...' } },
          { type: 'Select', label: '选择性别', prop: 'sex', options: sexs, props: sexProps, change: row => console.log('tag', row), placeholder: '请选择性别...' },
          { type: 'DateRange', label: '选择日期', slot: '', prop: 'daterange', option: { "value-format": "yyyy-MM-dd", 'start-placeholder': '请选择开始时间', 'end-placeholder': '请选择结束时间' } }
        ],
        // 表单按钮方法设置
        searchHandle: [],
        // 行内布局时按钮组是否需要设置一个labelWidth的外边距（自定义）
        inlineStyle: true
      }
      // table配置
      this.tableConfig = {
        ref: 'diytable',
        // 是否开启全选
        // isSelection: true,
        tableHeader: [
          { label: 'ID', prop: 'id'},
          { label: '名称', prop: 'title'},
          { label: '状态', prop: 'display_status_name', tableColumnAttr: { sortable: 'custom' }},
          { label: '类型', prop: 'group_name', type: 'Tag'},
          { type: 'Button', label: '操作', prop: 'materials_desc', buttonGroup: [{name: '查看', click: this.demo}, {name: '删除', click: this.demo}]},
        ],
        tableAttr: {
          size: 'small',
          height: '500px'
        },
        requestConfig: {
          apiurl: 'https://admin.shidiaoquan.com/User/Matter/matterList',
          datakeys: ['data', 'items'],
          totalkeys: ['data', 'total_pages'],
          resCodes: [200, 1]
        }
      }
      // this.$nextTick(() => {
      //   this.$refs.diytable.detaultGetList()
      // })
    },
    demo () {
      console.log('测试')
    }
  }
}
</script>

<style>
  .gaid-main .el-form-item__content .el-input {
    width: 200px;
  }
</style>