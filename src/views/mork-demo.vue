<template>
    <div style="overflow: hidden;">
        <morkList v-bind="tableConfig" ref="diyTable"></morkList>
    </div>
  <!-- <diy-table v-bind="tableConfig" ref="diyTable"></diy-table> -->
</template>

<script>
import morkList from '../../packages/mork-list/mork-list'
export default {
    components: {
        morkList
    },
    data() {
        return{
            tableConfig: {
                ref: 'diytabe',
                isSelection: true,
                isSingle: false,
                isIndex: false,
                isPagination: true,
                isHandle: true,
                tableAttr: {
                    ref: 'cpytable',
                    border: true,
                    'row-key': "id",
                    'tree-props': {children: 'children', hasChildren: 'hasChildren'}
                },
                // 排序事件回调
                sortChange: ({sortData, sort}) => console.log('sortChange', sortData, sort),
                tableHeader: [
                    { label: 'ID', prop: 'id', tableColumnAttr: { sortable: 'custom', align: 'center' } },
                    {
                        label: '姓名',
                        prop: 'name',
                        tableColumnAttr: { align: 'center' },
                        edit: {
                            type: 'Input',
                            change: (row, index, event) => {
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
                                this.$refs.diyTable.fetchList()
                                console.log('change', row, index, event)
                            }
                        }
                    },
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
                    currentPage: 2, // 当前页
                },
                // 左下按钮
                allselect: [
                    { name: '删除', size: '', click: row => console.log('tag', row), buttonAttr: { type: 'danger' }, prop: 'id' }
                ],
                // http://localhost:3003/api/getList?page=2
                requestConfig: {
                    // apiurl: `http://localhost:3003/api/getList?page=2`,
                    apiurl: `${location.origin}/data.json`,
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
