# element-table-grid
> DIY表格

## Installation

``` 
npm install cpy-elementui-table --save
# 文档预览
npm run docs-preview
```

演示请参考 `examples/es5/demo.html`


## 说明

### 使用

``` html
<div class="grid-main">
  <diy-search-form v-bind="formConfig"></diy-search-form>
  <diy-table
    :tableData='tableData'
    :pagination.sync='pagination'
    v-bind="tableConfig"
  >
  </diy-table>
</div>
```

## 数据说明

``` javascript
// 表单配置
formConfig: {
  // 是否显示表单按钮组行
  isHandle [Boolean],

  // 表单数据
  searchData [Object]

  // 表单设置
  searchForm [Array]

  // 表单按钮方法设置
  searchHandle [Array]

  // 表单属性设置(elementui form组件的Attr)
  formAttr [Object]
}

// 表格配置
tableConfig: {
  // 表格属性设置(elementui table组件的Attr)
  tableAttr [Object]

  // 表格方法设置(elementui table组件的Events)
  select: () => {}
  ....

  // 表格头设置
  tableHeader [Array]

  // 表格头按钮设置
  tableHandles [Array]

  // 是否设置表格，表单按钮
  isHandle [Boolean]

  // 是否分页
  isPagination [Boolean]

  // 是否显示表格复选框
  isSelection [Boolean]

  // 是否加载
  loading [Boolean]

  // 默认请求配置
  requestConfig [Object]
}

// 默认请求附加筛选数据(requestConfig筛选失效即有效)
searchData [Object]

// 表格数据
tableData [Array]

// 分页
pagination [Object]
```

### 表单数据searchData

``` javascript
// 需要绑定的属性
searchData: {
	name: null,
	age: null,
	sex: null
}
```

### 表单设置searchForm

``` javascript
// searchForm为Array类型
// type：控制其类型（目前支持Input，Select，Date, Time）（判断调用element的组件）
// prop：与searchData的key相对应
// option： 根据type的不同改变，为elementui组件的Attr
// formoption: 为elementui form-item组件的Attr
// options: (type:Select)特有 例：[{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
// props：(type:Select)特有 例：{ label: 'label', value: 'value' }
// 组件的Events方法（根据type的不同改变）如下
searchForm: [
  { type: 'Input', label: '', prop: 'name', width: '180px', placeholder: '请输入姓名...', option: {}, formoption: {} },
  { type: 'Select', label: '', prop: 'sex', width: '180px', options: sexs, props: sexProps, change: tag => console.log('tag', tag), placeholder: '请选择性别...' },
]
```

### 表单按钮方法设置searchHandle

``` javascript
searchHandle: [
  { name: '查询', option: { type: 'primary' }, click: (searchForm) => console.log('searchForm', searchForm) },
  { name: '重置', option: { type: 'primary' }, click: () => '' }
]
```

### 表格数据tableData 

``` javascript
// tableData为Array类型
tableData: [
  { id: 1, name: '张三', age: '12', text: '', sex: 1, province: '广东', rate: 4.7, checkbox: [], image: 'https://s3.pstatp.com/toutiao/xitu_juejin_web/img/wechat.63e1ce0.svg' },
  { id: 7, name: '李四', age: '27', text: '', sex: 2, province: '广东', rate: 4.7, checkbox: [], image: 'https://s3.pstatp.com/toutiao/xitu_juejin_web/img/wechat.63e1ce0.svg', children: [{ id: 8, name: '李四', age: '27', text: '', sex: 2, province: '广东', rate: 4.7, checkbox: [], image: 'https://s3.pstatp.com/toutiao/xitu_juejin_web/img/wechat.63e1ce0.svg'}] }
],
```

### 表格头设置tableHeader

``` javascript
// tableHeader为Array类型
// type：控制其类型（目前支持Text, Html, Button, Select, Radio, Checkbox, Rate, Switch, Image, Slider, Link, Popover）（判断调用element的组件）
// prop：与tableData的key相对应
// {...}Attr： 根据type的不同改变，为elementui组件的Attr  例：tableColumnAttr，selectAttr
// label: 标题名
// formatData方法： type为Text或null时存在formatData方法用于过滤信息
// 组件的Events方法（根据type的不同改变）如下
tableHeader: [
	{ label: '姓名', prop: 'name', tableColumnAttr: { align: 'center', class: 'stylestyle' } },
  { label: '年龄', prop: 'age', tableColumnAttr: { sortable: 'custom' } },
  { label: '性别', prop: 'sex', tableColumnAttr: { sortable: 'custom' }, formatData: (val) => { return val === 1 ? '男' : '女' } },
  {
    label: '定位',
    prop: 'location',
    type: 'Slot'
  },
  {
    label: '滑块',
    prop: 'slider',
    type: 'Slider',
    tableColumnAttr: { align: 'center', 'width': '100px' },
    sliderAttr: {
    },
    change: (txt, row) => console.log('change', txt, row)
  },
  {
    label: '图片',
    prop: 'image',
    type: 'Image',
    tableColumnAttr: { align: 'center', 'width': '50px' }
  },
  {
    label: '输入',
    prop: 'text',
    type: 'Input',
    tableColumnAttr: { align: 'center', 'width': '100px' },
    inputAttr: {}
  },
  {
    label: '下拉框',
    prop: 'select',
    type: 'Select',
    tableColumnAttr: { align: 'center', 'width': '150px' },
    selectAttr: {},
    optionAttr: {
      placeholder: '请选择...'
    },
    options: sexs,
    props: sexProps,
    change: (txt, row) => console.log('change', txt, row)
  },
  {
    label: '单选',
    prop: 'radio',
    type: 'Radio',
    tableColumnAttr: { align: 'center', 'width': '150px' },
    radioAttr: {
      disabled: false
    },
    radios: sexs,
    change: (txt, row) => console.log('change', txt, row)
  },
  {
    label: '复选框',
    prop: 'checkbox',
    type: 'Checkbox',
    tableColumnAttr: { align: 'center', 'width': '150px' },
    checkboxAttr: {},
    checkboxGroupAttr: {},
    checkboxs: sexs,
    change: (txt, row) => console.log('change', txt, row)
  },
  {
    label: '评价',
    prop: 'rate',
    type: 'Rate',
    tableColumnAttr: { align: 'center', 'width': '150px' },
    rateAttr: {
      disabled: true
    },
    change: (txt, row) => console.log('change', txt, row)
  },
  {
    label: '开关',
    prop: 'switch',
    type: 'Switch',
    tableColumnAttr: { align: 'center', 'width': '100px' },
    switchAttr: {
    },
    change: (txt, row) => console.log('change', txt, row)
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
    label: '操作', type: 'Button',
    tableColumnAttr: { fixed: 'right', align: 'center', 'width': '200px', 'z-index': '' },
    buttonGroup: [
      { name: '编辑', click: row => console.log('tag', row), buttonAttr: { type: 'primary' } },
      { name: '删除', click: row => console.log('tag', row), buttonAttr: { type: 'danger' } }
    ]
  }
]
```

### 表格头按钮设置tableHandles

``` javascript
// buttonAttr elementui button组件的Attr
tableHandles: [
  { label: '新增', click: () => console.log('tag'), buttonAttr: { type: 'success' } },
  {
    label: '查看',
    click: () => this.Look(),
    buttonAttr: { type: 'primary' }
  }
]
```

### 分页pagination

``` javascript
pagination: {
	pageSize: 10, // 页条数
  pageNum: 1, // 当前页
  total: 17, // 总条数
  sizeChange: () => console.log('handleSizeChange'), // 页条数大小改变触发
  currentChange: () => console.log('handleCurrentChange'), // 当前页改变触发
  layout: 'total,sizes ,prev, pager, next,jumper',
  style: 'display: flex;justify-content: center;align-items: center;'
}
```

### 支持slot自定义

``` html
<diy-table>
  <div slot="location">
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
  </div>
</diy-table>
```
```javascript
// 预设置slot
// name: ['first', 'before', 'Text', 'Html', 'Button', 'Input', 'Select', 'Radio', 'Checkbox', 'Rate', 'Switch', 'Image', 'Slider', 'Link', 'Popover', 'later']
// 自定义插槽name(以tableHeader子项的slot字段设置为名)
tableHeader: [
  {
    label: '定位',
    prop: 'location',
    type: 'Slot',
    slot: 'location'
  }
]
```

### requestConfig 默认请求配置
``` javascript
// 若存在apiurl便开启默认请求
requestConfig: {
  apiurl: 'https://xxxx.com/GetList', // 请求api
  method: 'post', // 请求方式
  data: { // 请求data数据
    'name': ''
  },
  headers: { // 请求头配置
    'content-type': 'text/json; charset=utf-8'
  },
  datakeys: ['data', 'items'], // 追踪列表数据字段
  totalkeys: ['data', 'total_pages'], // 追踪列表条数字段
  resCodes: [200, 1] // 成功码
}
```

#### 注意：该组件的方法全部采用驼峰命名 例:sort-change 修改为 sortChange, 但是属性名与elementui相同
