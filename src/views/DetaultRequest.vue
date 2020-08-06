<template>
  <div class="cpy-main">
    <el-card>
      <diy-search-form v-bind="formConfig"></diy-search-form>
      <diy-table v-bind="tableConfig" :searchData="formConfig.searchData">
      </diy-table>
    </el-card>
  </div>
</template>

<script>
let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }]
let sexProps = { label: 'label', value: 'value' }
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
          date: null
        },
        // 表单设置
        searchForm: [
          { type: 'Input', label: '', prop: 'name', width: '180px', placeholder: '请输入姓名...', option: {}, formoption: {} },
          { type: 'Input', label: '', prop: 'age', width: '180px', placeholder: '请输入年龄...' },
          { type: 'Select', label: '', prop: 'sex', width: '180px', options: sexs, props: sexProps, change: row => console.log('tag', row), placeholder: '请选择性别...' },
          { type: 'Date', label: '', width: '180px', propcs: 'date', option: { "value-format": "yyyy-MM-dd", placeholder: '请选择时间...' } },
          { type: 'Button', label: '', name: '查询', prop: 'button', option: { type: 'primary', icon: "el-icon-search" }, click: () => this.$refs.diytable.detaultGetList() }
        ],
        // 表单按钮方法设置
        searchHandle: [
          { name: '查询', option: { type: 'primary' }, click: () => this.$refs.diytable.detaultGetList() }
        ],
        // 表单
        formAttr: {
          inline: true,
          size: 'small'
        }
      },
      // table配置
      tableConfig: {
        ref: 'diytable',
        tableHeader: [
          { label: 'ID', prop: 'id'},
          { label: '名称', prop: 'title'},
          { label: '说明', prop: 'materials_desc'}
        ],
        tableAttr: {
          border: true
        },
        requestConfig: {
          apiurl: 'https://admin.shidiaoquan.com/User/Matter/matterList',
          method: 'post',
          data: {},
          headers: {}
        }
      }
    }
  }
}
</script>