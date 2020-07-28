<template>
  <el-card>
    <HeadConfiguration
      :headConfiguration="headConfiguration"
      @update="RefreshList"
    />
    <!-- 自定义表格 -->
    <DiyTable
      v-bind="tableEvents"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :loading="loading"
      :tableOption="tableOption"
    >
      <span slot="number"></span>
    </DiyTable>
    <!-- 分页 -->
    <template>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        v-bind="pagination"
        :current-page="page"
        :total="total_pages"
      >
      </el-pagination>
    </template>
  </el-card>
</template>

<script>
// components
import DiyTable from './components/DiyTable.vue'
import HeadConfiguration from './components/HeadConfiguration.vue'
// data
import tableData from './data/tableData'
export default {
  name: 'Home',
  data () {
    return {
      // el-table的全部属性
      tableOption: {
        'element-loading-text': "拼命加载中",
        'element-loading-spinner': "el-icon-loading",
        'element-loading-background': "rgba(0, 0, 0, 0.3)",
        'border': true,
        'size': "mini",
        'fit': true,
        'highlight-current-row': true
      },
      // el-table的Events方法
      tableEvents: {
        rowDblclick: (row, column, event) => {
          this.rowDblclick(row, column, event)
        }
      },
      // 表头数据
      tableHeader: [
        { prop: 'dhm', label: '时间', minWidth: '140px' },
        { prop: 'plazano', label: '编码', minWidth: '100px' },
        { prop: 'name', label: '名称' },
        { prop: 'car_plate', label: '号码', minWidth: '100px' },
        {
          prop: 'card_no', label: '卡号', minWidth: "120px",
          scopeoption: { // el-link的全部属性

          }
        },
        { prop: 'card_img', label: '卡样', minWidth: "120px", type: 'img' },
        {
          prop: 'card_href', label: '卡样链接', type: 'href',
          scopeoption: { // el-link的全部属性
            type: 'danger',
            underline: '',
            disabled: true,
            icon: '',
            name: '卡样链接'
          }
        },
        {
          prop: 'longtext', label: '长文本', minWidth: "90px", type: 'longtext',
          scopeoption: { // el-popover的全部属性
            placement: 'top-start',
            title: '长文本',
            trigger: "hover"
          }
        },
        { prop: 'laneno', label: '数据类型', formatData: function (val) { return val.substr(2, 1) == '1' ? 'String' : 'Number' } },
        { prop: 'staffname', label: '姓名' },
        { prop: 'mediatype', label: '付款方式' },
        { prop: 'comp_cash', label: '计算费额', sortable: true },
        {
          prop: 'fact_cash',
          label: '实收费额',
          children: [
            { prop: 'fact_cash1', label: '实收费额1' },
            { prop: 'fact_cash2', label: '实收费额2' }
          ]
        },
        {
          prop: 'oper', label: '操作', fixed: 'right', minWidth: '140px', type: 'oper', align: '',
          // el-table-column的全部属性
          option: {},
          oper: [
            {
              name: '查看',
              clickFun: (scope) => {
                this.handleClick(scope)
              },
              scopeoption: { // el-button的全部属性
                type: "text",
                size: "small"
              },
              prop: 'operbtn'
            },
            {
              name: '编辑',
              clickFun: (scope) => {
                this.editClick(scope)
              },
              scopeoption: { // el-button的全部属性
                type: "text",
                size: "small"
              }
            },
            {
              name: '删除',
              clickFun: (scope) => {
                this.delClick(scope)
              },
              scopeoption: { // el-button的全部属性
                type: "text",
                size: "small"
              }
            }
          ]
        }
      ],
      // 表格数据
      tableData: [],
      // 是否加载中
      loading: false,
      // 页数
      page: 1,
      // 总页数
      total_pages: 0,
      // 分页设置
      pagination: {
        'page-sizes': [10, 100, 200, 300, 400],
        'page-size': 10,
        'layout': "total, sizes, prev, pager, next, jumper",
        'style': 'color: red;margin-top: 20px'
      },
      // 头部筛选与按钮配置
      headConfiguration: [
        {
          align: 'right',
          data: [{
            scopeoption: { // el-input的全部属性
              type: "text",
              placeholder: "设备编号",
              style: "width: 200px;"
            },
            model: '',
            type: 'input'
          }, {
            name: '新增',
            clickFun: (scope) => {
              this.handleClick(scope)
            },
            scopeoption: { // el-button的全部属性
              type: "success"
            },
            prop: 'oper',
            type: 'btn'
          }]
        }
      ]
    }
  },
  methods: {
    editClick (scope) {
      console.log('default: ', scope)
    },
    handleClick (scope) {
      console.log('handleClick', scope)
    },
    delClick (scope) {
      console.log('default: ', scope)
    },
    rowDblclick (row, column, event) {
      console.log('default: ', row, '---', column, '---', event)
    },
    currentChange (e) {
      this.page = e
      this.GetList()
    },
    sizeChange (e) {
      this.pagination['page-size'] = e
      // this.GetList()
    },
    RefreshList () {
      this.page = 1
      this.GetList()
    },
    GetList () {
      console.log('Getlist');
      this.total_pages = tableData.length
      this.tableData = tableData.slice((this.page - 1) * this.pagination['page-size'], (this.page) * this.pagination['page-size'])
    }
  },
  components: {
    DiyTable,
    HeadConfiguration
  },
  activated () {
    // this.tableData = tableData
    this.GetList()
  },
  mounted () {
    this.$Bus.$on('uptabledata', ({ data, index }) => {
      this.$set(this.tableData, index, data)
    })
  }
}
</script>

<style>
.filter-container {
  padding-bottom: 10px;
}
.pagination-container {
  padding: 32px 16px;
}
</style>
