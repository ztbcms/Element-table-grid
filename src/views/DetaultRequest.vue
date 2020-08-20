<template>
  <div class="grid-main">
    <el-card>
      <diy-search-form v-bind="formConfig">
        <template slot="sales" slot-scope="scope">
          <el-input v-model="scope.prop.date1" class="slotinput"></el-input>
          <span class="center" :span="2">-</span>
          <el-input v-model="scope.prop.date2" class="slotinput"></el-input>
        </template>
        <template slot="price" slot-scope="scope">
          <el-input v-model="scope.prop.price1" class="slotinput">
            <template slot="append">元</template>
          </el-input>
          <span class="center" :span="2">-</span>
          <el-input v-model="scope.prop.price2" class="slotinput">
            <template slot="append">元</template>
          </el-input>
        </template>
      </diy-search-form>
      <diy-table v-bind="tableConfig">
      </diy-table>
    </el-card>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
let Props = { label: 'label', value: 'value' }
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
    this.initTwo()
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
          { type: 'Select', label: '选择性别', prop: 'sex', options: sexs, props: Props, change: row => console.log('tag', row), placeholder: '请选择性别...' },
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
    },
    initTwo () {
      let select = [{ label: '选项1', value: '1' }, { label: '选项2', value: '2' }]
      // 表单配置
      this.formConfig = {
        // 表单设置
        searchForm: [
          { type: 'Input', label: '商品名称', prop: 'name', placeholder: '请输入商品名称', option: {}, formoption: {} },
          { type: 'Select', label: '商品分组', prop: 'group', options: select, props: Props, placeholder: '请选择商品分组' },
          { type: 'Select', label: '商品类型', prop: 'type', options: select, props: Props, placeholder: '请选择商品类型' },
          { type: 'Slot', label: '销量', slot: 'sales' },
          { type: 'Slot', label: '价格', slot: 'price' },
          { type: 'Checkbox', label: '多选', prop: 'che', options: select},
          { type: 'Select', label: '库存扣满方式', prop: 'fun', options: select, props: Props, placeholder: '请选择库存扣满方式' }
        ],
        // 表单按钮方法设置
        searchHandle: [
          { name: '导出', click: this.derive },
          { name: '查看导出', option: { type: 'text' }, click: this.deriveLook }
        ],
        // 行内布局时按钮组是否独立一行
        inlineStyle: true,
        formAttr: {
          size: 'mini',
          labelWidth: '110px',
          inline: true
        }
      }
      // table配置
      this.tableConfig = {
        ref: 'diytable',
        // 是否开启全选
        // isSelection: true,
        tableHeader: [
          { label: 'ID', prop: 'id'},
          { label: '名称', prop: 'title'},
          { label: '订单数', prop: 'order_num'},
          { label: '封面', prop: 'thumb', imgPreview: true, type: 'Image'},
          { label: '状态', prop: 'display_status_name', tableColumnAttr: { sortable: 'custom' }},
          { label: '更新时间', prop: 'inputtime_name', width: '150px', tableColumnAttr: { sortable: 'custom' }},
          { label: '类型', prop: 'group_name', type: 'Tag'},
          { type: 'Button', label: '操作', prop: 'materials_desc',tableColumnAttr: { fixed: 'right', align: 'right', width: '100px' }, buttonGroup: [{name: '查看', click: this.demo}, {name: '删除', click: this.demo}]},
        ],
        tableAttr: {
          size: 'small',
          style: "width: 100%"
        },
        requestConfig: {
          apiurl: 'https://admin.shidiaoquan.com/User/Matter/matterList',
          datakeys: ['data', 'items'],
          totalkeys: ['data', 'total_pages'],
          resCodes: [200, 1]
        }
      }
    },
    demo () {
      console.log('测试')
    },
    derive () {
      console.log('导出')
    },
    deriveLook () {
      console.log('查看导出')
    }
  }
}
</script>

<style>
  .grid-main .el-form-item__content .el-input {
    width: 160px;
  }
  .grid-main .center {
    display: inline-block;
    width: 20px;
    text-align: center;
  }
  .grid-main .slotinput {
    width: 70px !important;
    text-align: center;
  }
  .grid-main .slotinput input {
    padding: 0 5px;
  }
  .grid-main .el-input-group__append {
    padding: 0 10px;
  }
</style>