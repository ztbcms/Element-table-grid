# Hello world

```html
<template>
  <diy-table v-bind="tableConfig"></diy-table>
</template>

<script>
export default {
    data() {
        return{
            tableConfig: {
                ref: 'diytabe',
                isSelection: false,
                isSingle: false,
                isIndex: false,
                isPagination: true,
                isHandle: true,
                indexLabel: '序号',
                tableAttr: {
                    ref: 'cpytable',
                    border: true,
                    'row-key': "id",
                    'tree-props': {children: 'children', hasChildren: 'hasChildren'}
                },
                // 排序事件回调
                sortChange: row => console.log('sortChange', row),
                tableHeader: [
                { label: 'ID', prop: 'id', tableColumnAttr: { sortable: 'custom', align: 'center' } },
                { label: '姓名', prop: 'name', tableColumnAttr: { align: 'center' } },
                { label: '性别', prop: 'sex', tableColumnAttr: { sortable: 'custom' }, formatData: (val) => { return val === 1 ? '男' : '女' } },
                {
                    label: '图片',
                    prop: 'image',
                    type: 'Image',
                    imgPreview: true,
                    tableColumnAttr: { align: 'center', 'width': '50px' }
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
                    change: (txt, row, th) => {
                        console.log('change', txt, row, th)
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
                        { name: '编辑', size: '', click: row => console.log('tag', row), buttonAttr: { type: 'primary' }, hidKey: 'buttonHid' },
                        { name: '删除', size: '', click: row => console.log('tag', row), buttonAttr: { type: 'danger' }, hidKey: '' }
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
                // 分页配置
                pagination: {
                    pageSize: 10, // 页条数
                    pageNum: 1, // 当前页
                    total: 17, // 总条数
                    sizeChange: (...args) => this.sizeChange.apply(this, args), // 页条数大小改变触发
                    currentChange: (...args) => this.currentChange.apply(this, args), // 当前页改变触发
                    layout: 'total,sizes ,prev, pager, next,jumper',
                    style: 'display: flex;justify-content: flex-end;align-items: center;margin-top: 10px;'
                },
                requestConfig: {
                    apiurl: 'http://localhost:3003/api/getList',
                    method: 'get',
                    data: {
                        'name': ''
                    },
                    headers: {
                        'content-type': 'text/json; charset=utf-8'
                    },
                    datakeys: ['data', 'items'],
                    totalkeys: ['data', 'total'],
                    resCodes: [200, 1]
                }
            }
        }
    }
}
</script>
```
