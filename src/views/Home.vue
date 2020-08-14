<template>
  <div class="cpy-main">
    <el-card>
      <diy-search-form v-bind="formConfig"></diy-search-form>
      <diy-table
        :tableData='tableData'
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
import data from './data'
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
      // 表格数据
      tableData: [],
      // table配置
      tableConfig: {
        // 
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
            tableColumnAttr: { sortable: 'custom', align: 'center' }
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
            label: '性别',
            prop: 'sex',
            tableColumnAttr: { sortable: 'custom' },
            formatData: (val) => { return val === 1 ? '男' : '女' },
            edit: {
                type: 'Select',
                option: [{id: 1, val: '男'},{id: 2, val: '女'}],
                optionLabel: 'val',
                optionValue: 'id',
                change: (row, index, event) => {
                    this.$refs.diyTable.detaultGetList()
                    console.log('change', row, index, event)
                }
            }
          },
          {
            label: '定位',
            type: 'Slot',
            prop: 'location',
            slot: 'location'
          },
          {
            label: '滑块',
            prop: 'slider',
            type: 'Slider',
            disabled: 'sliderDisabled',
            tableColumnAttr: { align: 'center', 'width': '100px' },
            sliderAttr: {
            },
            change: (row, index, event) => console.log('change', row, index, event)
          },
          {
            label: '图片',
            prop: 'image',
            type: 'Image',
            imgPreview: true,
            tableColumnAttr: { align: 'center', 'width': '50px' }
          },
          {
            label: '输入',
            prop: 'text',
            type: 'Input',
            disabled: 'inputDisabled',
            tableColumnAttr: { align: 'center', 'width': '100px' },
            inputAttr: {}
          },
          {
            label: '下拉框',
            prop: 'select',
            type: 'Select',
            disabled: 'selectDisabled',
            tableColumnAttr: { align: 'center', 'width': '150px' },
            selectAttr: {},
            optionAttr: {
              placeholder: '请选择...'
            },
            options: sexs,
            props: sexProps,
            change: (row, index, event) => console.log('change', row, index, event)
          },
          {
            label: '单选',
            prop: 'radio',
            type: 'Radio',
            disabled: 'radioDisabled',
            async: false,
            tableColumnAttr: { align: 'center', 'width': '150px' },
            radioAttr: {
              disabled: false
            },
            radios: sexs,
            change: (row, index, event, th) => {
              console.log('change', row, index , event, th)
              // this.$set(row, th.prop, event)
            }
          },
          {
            label: '复选框',
            prop: 'checkbox',
            type: 'Checkbox',
            disabled: 'checkboxDisabled',
            tableColumnAttr: { align: 'center', 'width': '150px' },
            checkboxAttr: {},
            checkboxGroupAttr: {},
            checkboxs: sexs,
            change: (row, index, event) => console.log('change', row, index, event)
          },
          {
            label: '评价',
            prop: 'rate',
            type: 'Rate',
            tableColumnAttr: { align: 'center', 'width': '150px' },
            disabled: 'RateDisabled',
            rateAttr: {
              'allow-half': true
            },
            change: (row, index, event) => console.log('change', row, index, event)
          },
          {
            label: '开关',
            prop: 'switch',
            type: 'Switch',
            disabled: 'SwitchDisabled',
            async: false,
            tableColumnAttr: { align: 'center', 'width': '100px' },
            switchAttr: {
            },
            change: (row, index, event, th) => {
              console.log('change', row, index, event, th)
              // this.$set(row, th.prop, event)
            }
          },
          {
            label: '链接',
            prop: 'image',
            type: 'Link',
            tableColumnAttr: { align: 'center', 'width': '100px' },
            linkAttr: {}
          },
          {
            label: '长文本',
            prop: 'image',
            type: 'Popover',
            tableColumnAttr: { align: 'center', 'width': '100px' },
            popoverAttr: {
              trigger: "hover"
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
        ],
        tableHandles: [
          { label: '新增', click: () => console.log('tag'), buttonAttr: { type: 'success' } },
          {
            label: '查看',
            click: () => this.Look(),
            buttonAttr: { type: 'primary' }
          }
        ],
      },
      // 分页配置
      pagination: {
        pageSize: 10, // 页条数
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
      this.tableData = data.slice((this.pagination.pageNum - 1) * this.pagination.pageSize, this.pagination.pageNum * this.pagination.pageSize)
      console.log(this.tableData)
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

<style>
</style>