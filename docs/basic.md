# 基本用法

通过 `tableData` 属性 为表单传入数据，并通过[el-table-column](http://element.eleme.io/#/zh-CN/component/table#table-column-attributes)展示数据。
`diy-table` 的主要功能：
  - 传入不同的列配置展示不同显示组件。
  - 通过传入api自动生成`pagination`,并使之与表格联动。
    - 翻页的时候，展示的元素也会根据 `pageSize`（每页的数量） 和 `pageNum`（当前页的index）自动生成。
  - 根据设置来处理排序。
<br/>

## 渲染表单配置项
**属性说明**

| 参数 | 说明 | 类型 | 默认值 | 可选值 | 其他 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| ref | 设置表单ref | String | - | - | - |
| isSelection | 是否开启多选 | Boolean | false | true / false | - |
| isSingle | 是否开启单选 | Boolean | false | true / false | - |
| isIndex | 是否显示表格索引 | Boolean | false | true / false | - |
| indexLabel | 设置索引列名 | String | 序号 | - | - |
| isPagination | 是否显示分页 | Boolean | true | true / false | - |
| isHandle | 是否显示表单操作按钮 | Boolean | false | true / false | - |
| loading | 是否开启表单loading动画 | Boolean | false | true / false | - |
| tableAttr | 表格属性，与`el-table`属性一致[传送门](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) | Object | - | - | - |
| sortChange | 排序事件回调 | Function | - | - | 回调参数`row`, 参数说明：倒叙或正序或默认 |
| <a href="#basic?id=渲染列与行">tableHeader</a> | 用于渲染行和列的配置 | Array | - | - | - |
| <a href="#basic?id=分页配置">pagination</a> | 分页配置 | Object | - | - | - |
| <a href="#basic?id=表单左下按钮配置">allselect</a> | 左下按钮 | Array | - | - | - |
| <a href="#basic?id=通过配置requestconfig请求表单数据">requestConfig</a> | 配置表单请求数据 | Object | - | - | - |

## 渲染列与行
通过 `tableHeader` 属性 为表单传入列与行的配置数据，并通过[el-table-column](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)来定义表格的列。

`tableHeader`类型为`Array`,以下参数用`{}`将其包裹，最终格式为`tableHeader:[{label:xxx, prop:xxx}]`。
    
**属性说明**

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| label | 列名 | String | <div style="width:50px">-</div> | - |
| type | 列展示类型，如果不填，默认显示文字 | String | - | location / Slider / Image / Input / Select / Radio / Checkbox / Rate / Link / Popover / Button |
| tableColumnAttr | table-column配置项，用于配置列数据居中显示之类的，与element配置一样[传送门](http://element.eleme.io/#/zh-CN/component/table#table-column-attributes) | Object | - | - |
| prop | 需要展示的行数据key值 | String | - | - |
| edit | 编辑配置 | Object | - | - |
| showSummary | 对该列进行合计 **注：如果在`表单配置`项的`tableAttr`同样配置了`showSummary`那么，列的`showSummary`优先级要大于`表单配置`的`showSummary`<br/>例如在表单有3列, 在第一列配置了`showSummary`, 然后表单配置了`showSummary`, 二、三列就不会统计，表单配置的`showSummary`会失效。** | Boolean | false | true / false |
    
**type说明**

| 参数 | 说明 | 额外参数 | 参数类型 | 参数说明 | 回调事件 | 回调参数 | 参数说明 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| location | <div style="width:80px">定位</div> | - | - | <div style="width:150px">-</div>  | - | <div style="width:70px">-</div> | <div style="width:110px">-</div> |
| Slider | 滑块 | disabled | String | 是否禁用（填写说明：行数据key值 | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>当前滑块数值 |
| Image | 图片 | imgPreview | Boolean | - | - | - | - |
| Input | 输入框 | disabled | String | 是否禁用（填写说明：行数据key值 | - | - | - | - |
| Select | 下拉框 | disabled | String | 是否禁用（填写说明：行数据key值 | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>选中的数据 | - |
| Radio | 单选 | 1.disabled<br/>2.async | 1.String<br/>2.Boolean | 1.是否禁用（填写说明：行数据key值<br/>2.是否开启异步执行 | change<br/>**如果开启了异步，不会主动触发视图更新，需要异步执行后手动执行以下代码`this.$set(row, th.prop, txt)`** | row<br/>index<br/>event<br/>th | 行数据<br/>行索引<br/>当前选中的值<br/>列数据 | - |
| Checkbox | 多选 | disabled | - | 是否禁用（填写说明：行数据key值 | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>选中的数据，行数据 |
| Rate | 评价 | disabled | String | 是否禁用（填写说明：行数据key值 | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>本次评价的数据 |
| Switch | 开关 | 1.disabled<br/>2.async | 1.String<br/>2.Boolean | 1.是否禁用（填写说明：行数据key值<br/>2.是否异步执行 | change<br/>**如果开启了异步，不会主动触发视图更新，需要异步执行后手动执行以下代码`this.$set(row, th.prop, !type)`** | row<br/>index<br/>event<br/>th | 行数据<br/>行索引<br/>当前switch状态<br/>列数据 |
| Link | 链接 | - | - | - | - | - | - |
| Popover | 长文本 | - | - | - | - | - | - |
| Button | 按钮 | buttonGroup | Array | 按钮配置 | click | row<br/>index | 行数据<br/>行索引 |

**Button说明**

| 参数 | 说明 | 类型 | 可选参数 | 
| :------------ | :------------ | :------------ | :------------ |
| name | 按钮显示的文字 | String | - |
| size | 按钮大小 | String | medium / small / mini |
| buttonAttr | 按钮类型配置参数，参数与element一样[传送门](https://element.eleme.cn/#/zh-CN/component/button) | Object | size / type / plain / round / circle / loading / disabled / icon / autofocus / native-type |
| click | 按钮被点击之后需要触发的事件 | fuction | - |

**edit说明**

| 参数 | 说明 | 类型 | 可选参数 | 回调事件 | 回调参数 | 参数说明 | 
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| type | 编辑的类型 | String | Input / Select | <div style="width:110px">-</div> | - | - |
| option | **type:Select可用**<br/>选择列表,与element [el-select](https://element.eleme.cn/#/zh-CN/component/select)一样 | Array | - | - | - | - |
| optionLabel | **type:Select可用**<br/>设置选项label与element [el-select的Option](https://element.eleme.cn/#/zh-CN/component/select)一样 | - | - | - | - | - |
| optionValue | **type:Select可用**<br/>设置选项value与element [el-select的Option](https://element.eleme.cn/#/zh-CN/component/select)一样 | - | - | - | - | - |
| change | 确定修改的回调方法 | Function | - | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>编辑之后的数据 |

**注：修改完毕之后，使用this.$refs.xxx.detaultGetList()刷新当前表单，既：**
`change: () => {this.$refs.xxx.detaultGetList()}`

## 分页配置
通过配置 `pagination` 为表单传入`当前页` `总页数` `每页条数`，通过[el-eagination](https://element.eleme.cn/#/zh-CN/component/pagination#pagination-fen-ye)展示数据。
主要功能：
  - 只需要正确配置`requestConfig`的`totalkeys`就可以帮你完成分页功能。
  - 通过传入api自动生成`pagination`,并使之与表格联动。
    - 翻页的时候，展示的元素也会根据 `pageSize`（每页的数量） 和 `pageNum`（当前页的index）与设置的排序自动生成。
<br/>

**pagination说明**

| 参数 | 说明 | 类型 | 默认 | 可选参数 | 
| :------------ | :------------ | :------------ | :------------ | :------------ |
| pageSize | 每页条数 | Number | 1 | - |
| currentPage | 当前页数 | Number | 10 | - |
| total | 总页数 | Number | - | - |

## 表单左下按钮配置
主要功能:
  - 返回已勾选的数据

`allselect`类型为`Array`,以下参数用`{}`将其包裹，最终格式为`tableHeader:[{label:xxx, prop:xxx}]`。

**allselect说明**

| 参数 | 说明 | 类型 | 默认 | 可选参数 | 其他 | 
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| name | 按钮显示的文字 | String | - | - | - |
| size | 按钮大小 | String - | mini | medium / small / mini | - |
| buttonAttr | 按钮类型配置参数，参数与element一样[传送门](https://element.eleme.cn/#/zh-CN/component/button) | Object | - | size / type / plain / round / circle / loading / disabled / icon / autofocus / native-type | - |
| click | 按钮被点击之后需要触发的事件 | fuction | - | - | 回调参数`row`,是勾选行的数据 |

## 通过配置requestConfig请求表单数据

**requestConfig说明**

| 参数 | 说明 | 类型 | 可选参数 | 
| :------------ | :------------ | :------------ | :------------ |
| apiurl | 请求地址 | String | - |
| method | 请求方式 | get | get / post |
| data | 请求参数 | Object |  |
| headers | 请求头 | Object | - |
| datakeys | 解析请求数据, 如果返回的总页数在`{data: {items: [], total: 10, page: 1}}`则填入`['data', 'items']` | Array | - |
| totalkeys | 解析总页数, 如果返回的总页数在`{data: {total: 10, page: 1}}`则填入`['data', 'total']` | Array | - |

## 一个完整的demo

```html
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
```