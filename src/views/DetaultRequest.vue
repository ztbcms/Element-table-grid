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
        },
        // 表单设置
        searchForm: [
          { type: 'Input', label: '', prop: 'name', width: '180px', placeholder: '请输入姓名...', option: {}, formoption: {} },
          { type: 'Input', label: '', prop: 'age', width: '180px', placeholder: '请输入年龄...' }
        ],
        // 表单按钮方法设置
        searchHandle: [
          { label: '查询', type: 'primary', handle: () => this.$refs.diytable.detaultGetList() }
        ],
        // 表单
        formAttr: {
          labelWidth: '100px',
          inline: true
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