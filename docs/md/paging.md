## 分页配置
的分页栏实际上就是一个内置的 `el-pagination`. 我们可以通过 `pageSize`, `currentPage` 和 `total` 来对其进行定制。

```html
/*vue*/
<template>
  <div class="cpy-main">
    <el-card>
      <diy-table
        :pagination.sync='tableConfig.pagination'
        v-bind="tableConfig"
        ref="diyTable"
      >
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
      tableConfig: {
        // 排序事件回调
        sortChange: row => console.log('sortChange', row),
        tableHeader: [
          {
            label: 'ID',
            prop: 'id',
            showSummary: true,
            tableColumnAttr: { sortable: 'custom', align: 'center', width: '80' }
          },
          {
            label: '姓名',
            prop: 'name',
            tableColumnAttr: { align: 'center' },
            edit: {
                type: 'Input',
                change: (row, index, event) => {
                    // console.log('change', row, index, event)
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
        pagination: {
            pageSize: 5, // 页条数
            currentPage: 2, // 当前页
            total: 17, // 总条数
            sizeChange: (...args) => this.sizeChange.apply(this, args), // 页条数大小改变触发
            currentChange: (...args) => this.currentChange.apply(this, args), // 当前页改变触发
            layout: 'total,sizes ,prev, pager, next,jumper'
        },
        requestConfig: {
            apiurl: 'http://localhost:3003/api/getList',
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
    }
  }
}
</script>
```

## 配置项
**属性说明**

| 参数 | 说明 | 类型 | 默认值 | 可选值 | 其他 |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ |
| pageSize | 页条数 | Number | 10 | - | - |
| currentPage | 当前页 | Number | 1 | - | - |
| total | 总条数 | Number | 0 | - | - |
| sizeChange | 页条数大小改变触发 | Function | - | - | 会返回一个参数，该参数是修改页条数之后的参数 |
| currentChange | 当前页改变触发 | Function | - | - | 会返回一个参数，该参数是修改当前页之后的参数 |