# 基本用法

通过配置`requestConfig` 为表单传入数据，并通过[el-table-column](http://element.eleme.io/#/zh-CN/component/table#table-column-attributes)展示数据。
`diy-table` 的主要功能：
  - 传入不同的列配置展示不同显示组件。
  - 通过传入api自动生成`pagination`,并使之与表格联动。
    - 翻页的时候，展示的元素也会根据 `pageSize`（每页的数量） 和 `pageNum`（当前页的index）自动生成。
  - 根据设置来处理排序。
<br/>

```html 
/*vue*/
<template>
  <div class="grid-main">
    <el-card>
      <diy-table
        v-bind="tableConfig"
        ref="diyTable"
      >
      </diy-table>
    </el-card>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
export default {
  data () {
    return {
      // table配置
      tableConfig: {
  
        tableHeader: [
          {
            label: 'ID',
            prop: 'id',
            tableColumnAttr: { sortable: 'custom', align: 'center', width: '80', prop: 'input' }
          },
          {
            label: '姓名',
            prop: 'name',
            tableColumnAttr: { align: 'center' },
            edit: {
                type: 'Input',
                change: this.change
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
            apiurl: '/data/demo1.json',
            method: 'get',
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
    change(row) {
      console.log(row)
    }
  }
}
</script>
```

## 渲染表单配置项
**属性说明**

| 参数 | 说明 | 类型 | 默认值 | 可选值 | 其他 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| ref | 设置表单ref | String | - | - | - |
| isSelection | 是否开启多选 | Boolean | false | true / false | - |
| isSingle | 是否开启单选 | Boolean | false | true / false | - |
| isPagination | 是否显示分页 | Boolean | true | true / false | - |
| isHandle | 是否显示表单操作按钮 | Boolean | false | true / false | - |
| **loading** | 是否开启表单loading动画 | Boolean | false | true / false | - |
| tableAttr | 表格属性，与`el-table`属性一致[传送门](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) | Object | - | - | - |
| <a href="#md/basic?id=渲染列与行">tableHeader</a> | 用于渲染行和列的配置 | Array | - | - | - |
| <a href="#md/basic?id=分页配置">pagination</a> | 分页配置 | Object | - | - | - |
| <a href="#md/basic?id=通过配置requestconfig请求表单数据">requestConfig</a> | 配置表单请求数据 | Object | - | - | - |

**函数说明**

| 函数 | 说明 | 
| :------------ | :------------ | 
| getTableData | 获取当前表格数据 | 
| fetchList | 远程获取当前配置下的表格数据 | 

## 渲染列与行
通过 `tableHeader` 属性 为表单传入列与行的配置数据，并通过[el-table-column](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)来定义表格的列。

`tableHeader`类型为`Array`,以下参数用`{}`将其包裹，最终格式为`tableHeader:[{label:xxx, prop:xxx}]`。
    
**属性说明**

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| :------------ | :------------ | :------------ | :------------ | :------------ |
| label | 列名 | String | <div style="width:50px">-</div> | - |
| type | 列展示类型，如果不填，默认显示文字 | String | - | location / Slider / Image / Input / Select / Radio / Checkbox / Rate / Link / Popover / Button / Slot |
| tableColumnAttr | table-column配置项，用于配置列数据居中显示之类的，与element配置一样[传送门](http://element.eleme.io/#/zh-CN/component/table#table-column-attributes) | Object | - | - |
| prop | 需要展示的行数据key值 | String | - | - |
| edit | 编辑配置 | Object | - | - |
    
## type说明

| 参数 | 说明 | 额外参数 | 参数类型 | 参数说明 | 回调事件 | 回调参数 | 参数说明 |
| :---- | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| Text | <div style="width:80px">文本</div> | - | - | <div style="width:150px">-</div>  | - | <div style="width:70px">-</div> | <div style="width:110px">-</div> |
| Html | Html内容 | - | - | -  | - | - | - |
| Input | 输入框 | disabled | String | 是否禁用（填写说明：行数据key值 | - | - | - | - |
| Slider | 滑块 | disabled | String | 是否禁用（填写说明：行数据key值 | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>当前滑块数值 |
| Image | 图片 | imgPreview | Boolean | - | - | - | - |
| Select | 下拉框 | disabled | String | 是否禁用（填写说明：行数据key值 | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>选中的数据 | - |
| Radio | 单选 | 1.disabled<br/>2.async | 1.String<br/>2.Boolean | 1.是否禁用（填写说明：行数据key值<br/>2.是否开启异步执行 | change<br/>**如果开启了异步，不会主动触发视图更新，需要异步执行后手动执行以下代码`this.$set(row, th.prop, txt)`** | row<br/>index<br/>event<br/>th | 行数据<br/>行索引<br/>当前选中的值<br/>列数据 | - |
| Checkbox | 多选 | disabled | - | 是否禁用（填写说明：行数据key值 | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>选中的数据，行数据 |
| Rate | 评价 | disabled | String | 是否禁用（填写说明：行数据key值 | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>本次评价的数据 |
| Switch | 开关 | 1.disabled<br/>2.async | 1.String<br/>2.Boolean | 1.是否禁用（填写说明：行数据key值<br/>2.是否异步执行 | change<br/>**如果开启了异步，不会主动触发视图更新，需要异步执行后手动执行以下代码`this.$set(row, th.prop, !type)`** | row<br/>index<br/>event<br/>th | 行数据<br/>行索引<br/>当前switch状态<br/>列数据 |
| Link | 链接 | - | - | - | - | - | - |
| Popover | 长文本 | - | - | - | - | - | - |
| Button | 按钮 | buttonGroup | Array | 按钮配置 | click | row<br/>index | 行数据<br/>行索引 |
| Slot | 自定义 | - | - | - | - | - | - |

除了type表的`额外参数`，还有一个`formatData`上述type表都可用`formatData`用于转换简单的表达式来达到绑定的效果，例如：表单需要一个`Switch`，但是后台给你传递的却是`0和1`，但是`element-ui`的`Switch`绑定的值却是`true`与`false`, 这个时候就可以用`formatData`来转换绑定。
用法:

**Button说明**

| 参数 | 说明 | 类型 | 可选参数 | 
| :------------ | :------------ | :------------ | :------------ |
| name | 按钮显示的文字 | String | - |
| size | 按钮大小 | String | medium / small / mini |
| buttonAttr | 按钮类型配置参数，参数与element一样[传送门](https://element.eleme.cn/#/zh-CN/component/button) | Object | size / type / plain / round / circle / loading / disabled / icon / autofocus / native-type |
| click | 按钮被点击之后需要触发的事件 | fuction | function(row, index) |

**edit说明**

| 参数 | 说明 | 类型 | 可选参数 | 回调事件 | 回调参数 | 参数说明 | 
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| type | 编辑的类型 | String | Input / Select | <div style="width:110px">-</div> | - | - |
| option | **type:Select可用**<br/>选择列表,与element [el-select](https://element.eleme.cn/#/zh-CN/component/select)一样 | Array | - | - | - | - |
| props | **type:Select可用**<br/>配置选项的value和label [el-select的Option](https://element.eleme.cn/#/zh-CN/component/select)一样,格式为：`props: {value: 'value', label: 'label'}` | Object | - | - | - | - |
| change | 确定修改的回调方法 | Function | - | change | row<br/>index<br/>event | 行数据<br/>行索引<br/>编辑之后的数据 |

**注：修改完毕之后，使用this.$refs.xxx.fetchList()刷新当前表单，既：**
`change: () => {this.$refs.xxx.fetchList()}`

```html
/*vue*/
<template>
  <div class="grid-main3">
    <el-card>
      <diy-table
        v-bind="tableConfig"
        ref="diyTable"
      >
      </diy-table>
    </el-card>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
export default {
  data () {
    return {
      tableConfig: {
        // 是否全选
        isSelection: true,
        tableHeader: [
          {
            label: 'ID',
            prop: 'id',
            tableColumnAttr: { sortable: 'custom', align: 'center' }
          },
          {
            label: '姓名',
            prop: 'name',
            tableColumnAttr: { align: 'center' },
            edit: {
                type: 'Input',
                change: this.change
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
                change: this.change
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
            change: this.change
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
            tableColumnAttr: { align: 'center', 'width': '100px' }
          },
          {
            label: '下拉框',
            prop: 'select',
            type: 'Select',
            disabled: 'selectDisabled',
            tableColumnAttr: { align: 'center', 'width': '150px' },
            optionAttr: {
              placeholder: '请选择...'
            },
            options: sexs,
            props: {
              value: 'value',
              label: 'label'
            },
            change: this.change
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
            change: this.change
          },
          {
            label: '复选框',
            prop: 'checkbox',
            type: 'Checkbox',
            disabled: 'checkboxDisabled',
            tableColumnAttr: { align: 'center', 'width': '150px' },
            checkboxs: sexs,
            change: this.change
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
            change: this.change
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
            change: this.change
          },
          {
            label: '链接',
            prop: 'link',
            type: 'Link',
            linkAttr: { align: 'center', 'width': '100px', name: '链接' }
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
              { name: '编辑', size: '', click: this.click, buttonAttr: { type: 'primary' }, hidKey: 'buttonHid' },
              { name: '删除', size: '', click: this.click, buttonAttr: { type: 'danger' }, hidKey: '' }
            ]
          }
        ],
        requestConfig: {
            apiurl: '/data/demo1.json',
            method: 'get',
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
    change(row) {
      console.log(row)
    }
  }
}
</script>
```

## 插槽说明
在内置功能不能满足单元格需求的时候，可以使用`slot`, 例如单元格图片只能传递一张图片，但是项目需求需要显示多张，可以这样子实现
```
<template slot="Image" slot-scope='prop'>
    <el-image
        style="width: 100px; height: 100px;margin-left: 4px"
        v-for="(item, index) in prop.img"
        :key="index"
        :src="item"
    >
    </el-image>
</template>
```
在使用插槽的时候，需要注明`插槽名字`, 插槽名字列表参考<a href="#/md/basic?id=type说明">type表</a>插槽会返回`prop`既绑定的数据。这样子就能接收`slot-scope='prop'`
### 自定义插槽
```
<template slot="operation" slot-scope="scope">
  <el-button @click="ClickItem(scope)">按钮</el-button>
</template>
```
``` html
/*vue*/
<template>
  <div class="grid-main">
    <el-card>
      <diy-table
        v-bind="tableConfig"
        ref="diyTable"
      >
        <template slot="operation" slot-scope="scope">
          <el-button @click="ClickItem(scope)">按钮</el-button>
        </template>
      </diy-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表格配置
      tableConfig: {},
      data: [
        {id: 1, title: '测试数据'}
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 表单配置
      this.tableConfig = {
        tableData: this.data,
        tableHeader: [
          { label: 'ID', prop: 'id'},
          { label: '名称', prop: 'title'},
          {
            label: '自定义',
            prop: 'custom',
            type: 'Slot',
            slot: 'operation'
          }
        ],
        tableAttr: {
          size: 'small',
          style: "width: 100%"
        }
      }
    }
  }
}
</script>
```

## 通过配置`requestConfig`请求表单数据

**requestConfig说明**

| 参数 | 说明 | 类型 | 可选参数 | 
| :------------ | :------------ | :------------ | :------------ |
| apiurl | 请求地址 | String | - |
| method | 请求方式 | get | get / post |
| headers | 请求头 | Object | - |
| data | 请求参数 | Object |  |
| processGetListResponse | 自定义解析请求数据 | Function | - |

默认情况下,组件会按照以下格式来解析
```json
{
  "data": {
    "items": [ // [必须]列表数据
      {
        "id": 11,
        "name": "张三",
      }
    ],
    "total_pages": 1, //总页数
    "total_items": 200,//[必须]列表项总数
    "limit": 10,// 每页数量
    "page": 1 //当前页
  },
  "status": true,
  "code": 200,
  "msg": ""
}
```

若数据格式不符合上面的，也可以自定义数据解析`processGetListResponse`,示例如下
```javascript
var requestConfig = {
      processGetListResponse: (res)=>{
        return {
          total_items: res.data.total_items,
          items: res.data.items,
        }
      }
}
```

## 列表排序

只需要设置表格列字段`{ sortable: 'custom'}`,示例：
```javascript
var tableHeader = [
  {
    label: 'ID',
    prop: 'id',
    tableColumnAttr: { sortable: 'custom'}
  }
]
```

发生列排序改变时，组件会自动向apiurl请求带上对应列字段的情况参数。
排序字段格式:`sort_`+该列的`prop`

请求示例：
- 升序：`http://a.com?sort_id=ascending`
- 降序：`http://a.com?sort_id=descending`

### Q:我想排序字段格式和升降序的值怎么操作？

- 排序字段格式，无法修改，我们约定俗成这样格式
- 升降序的值修改，参考下`ElmentUI-table`中的`Table-column Attributes`参数`sort-orders`，同样地不建议修改，特殊需求除外. [点击查看sort-orders字段](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)












