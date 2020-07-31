<template>
  <div class="cpy-main">
    <diy-search-form
      :searchData="searchData"
      :searchForm="searchForm"
      :searchHandle="searchHandle"
      :formAttr="formAttr"
    ></diy-search-form>
    <diy-table
      :isSelection='true'
      :isIndex='true'
      :isPagination='true'
      :isHandle='true'
      :tableData='tableData'
      :tableHeader='tableHeader'
      :tableAttr="tableAttr"
      :tableHandles='tableHandles'
      :pagination.sync='pagination'
      v-bind="tableFuns"
    >
      <div slot="Slot">
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
      </div>
    </diy-table>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
let sexProps = { label: 'label', value: 'value' }
// let intersts = [{ label: '羽毛球', value: 'badminton' }, { label: '篮球', value: 'basketball' }]
// let interstProps = { label: 'label', value: 'value' }
export default {
  data () {
    return {
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
        { label: '查询', type: 'primary', handle: (searchForm) => console.log('searchForm', searchForm) },
        { label: '重置', type: 'primary', handle: () => '' }
      ],
      // 表单
      formAttr: {
        size: 'mini',
        labelWidth: '100px',
        inline: true
      },
      // 表格
      tableData: [
        { name: '张三', age: '12', sex: 1, province: '广东' },
        { name: '李四', age: '27', sex: 2, province: '广东' },
        { name: '张三', age: '12', sex: 1, province: '广东' },
        { name: '筱华', age: '27', sex: 2, province: '广东' },
        { name: '筱华', age: '27', sex: 2, province: '广东' },
        { name: '筱华', age: '27', sex: 2, province: '广东' },
        { name: '筱华', age: '27', sex: 2, province: '广东' }
      ],
      tableAttr: {
        border: true,
        align: 'center'
      },
      tableFuns: {
        sortChange: row => console.log('sortChange', row)
      },
      tableHeader: [
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age', option: { sortable: 'custom' } },
        { label: '性别', prop: 'sex', option: { sortable: 'custom' }, formatData: (val) => {return val === 1 ? '男' : '女' } },
        {
          label: '定位',
          prop: 'location',
          type: 'Slot'
        },
        {
          label: '操作', type: 'Button', oper: [
            { type: 'primary', name: '编辑', click: row => console.log('tag', row), scopeoption: {type: 'success'} },
            { type: 'danger', name: '删除', click: row => console.log('tag', row) }
          ]
        }
      ],
      tableHandles: [
        { label: '新增', type: 'primary', click: () => console.log('tag'), option: { type: 'success' } }
      ],
      pagination: {
        pageSize: 10, // 页条数
        pageNum: 1, // 当前页
        total: 17, // 总条数
        sizeChange: () => console.log('handleSizeChange'), // 页条数大小改变触发
        currentChange: () => console.log('handleCurrentChange'), // 当前页改变触发
        layout: 'total,sizes ,prev, pager, next,jumper',
        style: 'display: flex;justify-content: center;height: 100%;align-items: center;'
      }
    }
  },
  methods: {
    GetList () {

    }
  }
}
</script>

<style>
</style>