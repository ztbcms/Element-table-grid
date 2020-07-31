# DiyElementuiTable

## Installation
```
npm install cpy-elementui-table --save
```
## 说明

### 使用
```
<div class="cpy-main">
  <diy-search-form
		:isHandle='true'
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
    :pagination='pagination'
    v-bind="tableFuns"
  >
  </diy-table>
</div>
```

## 数据说明
```
// 表单数据
searchData [Object]

// 表单设置
searchForm [Array]

// 表单按钮方法设置
searchHandle [Array]

// 表单属性设置(elementui form组件的Attr)
formAttr [Object]

// 表格数据
tableData [Array]

// 表格属性设置(elementui table组件的Attr)
tableAttr [Object]

// 表格方法设置(elementui table组件的Events)
tableFuns [Object]

// 表格头设置
tableHeader [Array]

// 表格头按钮设置
tableHandles [Array]

// 分页
pagination [Object]

// 是否设置表格，表单按钮
isHandle [Boolean]

// 是否分页
isPagination [Boolean]

// 是否显示表格索引
isIndex [Boolean]

// 表格索引名称
indexLabel [String]

// 是否加载
loading [Boolean]
```

### 表单数据searchData
```
// 需要绑定的属性
searchData: {
	name: null,
	age: null,
	sex: null
}
```

### 表单设置searchForm
```
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

### 表单按钮方法设置
```
searchHandle: [
	{ label: '查询', type: 'primary', handle: (searchForm) => console.log('searchForm', searchForm) },
	{ label: '重置', type: 'primary', handle: () => '' }
]
```

### 表格数据tableData 
```
// tableData为Array类型
tableData: [
	{ name: '张三', age: '12', sex: '男', interst: '女' },
	{ name: '李四', age: '27', sex: '女', interst: '羽毛球' }
]
```

### 表格头设置tableHeader
```
// tableHeader为Array类型
// type：控制其类型（目前支持Text, Html, Button, Select, Radio, Checkbox, Rate, Switch, Image, Slider, Link, Popover）（判断调用element的组件）
// prop：与tableData的key相对应
// scopeoption： 根据type的不同改变，为elementui组件的Attr
// option： elementui el-table-column组件的Attr
// label: 标题名
// formatData方法： type为Text或null时存在formatData方法用于过滤信息
// 组件的Events方法（根据type的不同改变）如下
tableHeader: [
	{ label: '姓名', prop: 'name' },
	{ label: '年龄', prop: 'age', option: { sortable: 'custom' } },
	{ label: '性别', prop: 'sex', option: { sortable: 'custom' }, formatData: (val) => {return val === 1 ? '男' : '女'} },
	{ label: '爱好',type: 'Html', prop: 'interst', scopeoption: {} },
	{
		label: '操作', type: 'Button', oper: [
			{ type: 'primary', name: '编辑', click: row => console.log('tag', row), scopeoption: {type: 'success'} },
			{ type: 'danger', name: '删除', click: row => console.log('tag', row) }
		]
	}
]
```

### 表格头按钮设置tableHandles
```
// option： elementui button组件的Attr
tableHandles: [
	{ label: '新增', type: 'primary', click: () => console.log('tag'), option: { type: 'success' } }
]
```

### 分页pagination
```
pagination: {
	pageSize: 10, // 页条数
	pageNum: 1, // 当前页
	total: 17, // 总条数
	sizeChange: () => {}, // 页条数大小改变触发
	currentChange: () => {} // 当前页改变触发
}
```

### 支持slot自定义
```
<diy-table>
  <div slot="Slot">
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
  </div>
</diy-table>

tableHeader: [
  {
    label: '定位',
    prop: 'location',
    type: 'Slot'
  }
]
```

#### 注意：该组件的方法全部采用驼峰命名 例:sort-change 修改为 sortChange

