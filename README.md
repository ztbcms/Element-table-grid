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

### 数据说明
```
// 表单数据
searchData [Object]
// 表单设置
searchForm [Object]
// 表单方法设置
searchHandle [Object]
// 表单属性设置
formAttr [Object]
```