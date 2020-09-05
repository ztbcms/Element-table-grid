<!--表格组件 -->
<template>
  <section class="table-grid-page">
    <!-- 数据表格 -->
    <section class="grid-table">
      <el-table
        v-bind="tableAttr"
        :data="defaultData"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @row-click="rowClick"
        @row-contextmenu="rowContextmenu"
        @row-dblclick="rowDblclick"
        @header-click="headerClick"
        @header-contextmenu="headerContextmenu"
        @sort-change="sortChange"
        @filter-change="filterChange"
        @current-change="currentChange"
        @header-dragend="headerDragend"
        @expand-change="expandChange"
        v-loading="loading && defaultLoading"
        :ref="tableConfig.ref"
        :size="tableAttr.size || 'small'"
      >
        <slot name="first"></slot>
        <!--  多选  -->
        <el-table-column
          v-if="isSelection"
          type="selection"
          align="center"
        ></el-table-column>
        <!--  多选END  -->

        <slot name="before"></slot>
        <template
          v-for="(th, key) in tableHeader"
        >
          <el-table-column
            v-if="key == 0 && isSingle"
            v-bind="{ align: 'center' }"
            :key="'checkbox' + key"
            :prop="th.prop"
          >
            <template slot-scope="scope">
              <slot>
                <el-checkbox v-model="scope.row['_checkBox']" @change="singlecheckBox($event, scope.row)"></el-checkbox>
              </slot>
            </template>
          </el-table-column>

          <!-- 数据栏 -->
          <el-table-column
            :key="'column' + key"
            v-bind="th.attr"
            :align="(th.attr && th.attr.align) || 'center'"
            :label="th.label"
            :prop="th.prop"
            :width="(th.attr && th.attr.width) || th.width"
          >
            <template slot-scope="scope">
              <!-- Text -->
              <template v-if="th.type === 'Text' || !th.type">
                <slot name="Text" :prop='scope.row[th.prop]' v-bind="scope">
                  <span
                    v-if="!th.formatData"
                    @click.stop="th.click && th.click(scope.row)"
                  >{{ scope.row[th.prop] }}</span>
                  <span
                    v-else
                    @click.stop="th.click && th.click(scope.row)"
                  >{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
                  <i v-if="th.edit" class="_diyTable el-icon-edit" @click="dialogDataUpdate(scope.row, scope.$index, th)"></i>
                </slot>
              </template>
              <!-- Html -->
              <template v-else-if="th.type === 'Html'">
                <slot name="Html" :prop='scope.row[th.prop]' v-bind="scope">
                  <div v-html="th.html(scope.row[th.prop])"></div>
                </slot>
              </template>
              <!-- 输入框 -->
              <template v-else-if="th.type === 'Input'">
                <slot name="Input" :prop='scope.row[th.prop]' v-bind="scope">
                  <el-input
                    v-model="scope.row[th.prop]"
                    v-bind="th.inputAttr"
                    :disabled="scope.row[th.disabled]"
                    @focus="th.focus && th.focus($event, scope.row)"
                    @blur="th.blur && th.blur($event, scope.row)"
                    @change="th.change && th.change({event: $event, row: scope.row})"
                    @input="th.input && th.input($event, scope.row)"
                    @clear="th.clear && th.clear(scope.row)"
                  ></el-input>
                </slot>
              </template>
              <!-- 下拉框 -->
              <template v-else-if="th.type === 'Select'">
                <slot name="Select" :prop='scope.row[th.prop]' v-bind="scope">
                  <el-select
                    v-model="scope.row[th.prop]"
                    v-bind="th.selectAttr"
                    :disabled="scope.row[th.disabled]"
                    @change='th.change && th.change({row: scope.row, index: scope.$index, event: $event})'
                    @visible-change="th.visibleChange && th.visibleChange($event, scope.row)"
                    @remove-tag="th.removeTag && th.removeTag($event, scope.row)"
                    @clear="th.clear && th.clear($event, scope.row)"
                    @blur="th.blur && th.blur($event, scope.row)"
                    @focus="th.focus && th.focus($event, scope.row)"
                  >
                    <el-option
                      v-for="op in th.options"
                      :label="op[th.props.label]"
                      :value="op[th.props.value]"
                      :key="op[th.props.value]"
                      :disabled="op[th.props.disabled]"
                      v-bind="op.optionAttr || th.optionAttr"
                      @blur="op.blur && op.blur(op)"
                      @focus="op.focus && op.focus(op)"
                    ></el-option>
                  </el-select>
                </slot>
              </template>
              <!-- 单选 -->
              <template v-else-if="th.type === 'Radio'">
                <slot name="Radio" :prop='scope.row[th.prop]' v-bind="scope">
                  <el-radio-group
                    :value="scope.row[th.prop]"
                    v-bind="th.radioGroupAttr"
                    :disabled="scope.row[th.disabled]"
                  >
                    <el-radio
                      @click.native="radiosClick(scope.row, scope.$index, ra.value, th, $event)"
                      v-for="ra in th.radios"
                      v-bind="ra.radioAttr || th.radioAttr"
                      :label="ra.value"
                      :key="ra.value"
                    >{{ra.label}}</el-radio>
                  </el-radio-group>
                </slot>
              </template>
              <!-- 复选框 -->
              <template v-else-if="th.type === 'Checkbox'">
                <slot name="Checkbox" :prop='scope.row[th.prop]' v-bind="scope">
                  <el-checkbox-group
                    v-model="scope.row[th.prop]"
                    v-bind="th.checkboxGroupAttr"
                    :disabled="scope.row[th.disabled]"
                    @change='th.change && th.change({row: scope.row, index: scope.$index, event: $event})'
                  >
                    <el-checkbox
                      v-for="ra in th.checkboxs"
                      :label="ra.value"
                      :key="ra.value"
                      v-bind="ra.checkboxAttr || th.checkboxAttr"
                    >{{ra.label}}</el-checkbox>
                  </el-checkbox-group>
                </slot>
              </template>
              <!-- 评价 -->
              <template v-else-if="th.type === 'Rate'">
                <slot name="Rate" :prop='scope.row[th.prop]' v-bind="scope">
                  <el-rate
                    v-model="scope.row[th.prop]"
                    v-bind="th.rateAttr"
                    :disabled="scope.row[th.disabled]"
                    @change='th.change && th.change({row: scope.row, index: scope.$index, event: $event})'
                  ></el-rate>
                </slot>
              </template>
              <!-- 开关 -->
              <template v-else-if="th.type === 'Switch'">
                <div @click="!scope.row[th.disabled] && th.change && th.change({row: scope.row, index: scope.$index, value: !scope.row[th.prop], th})" v-if="th.async">
                  <el-switch
                    :value="!th.formatData ? scope.row[th.prop] : scope.row[th.prop] | formatters(th.formatData)"
                    v-bind="th.switchAttr"
                    :disabled="scope.row[th.disabled]"
                  ></el-switch>
                </div>
                <el-switch
                  v-else
                  @change='switchdefle(scope.row, scope.$index, $event, th)'
                  :value="!th.formatData ? scope.row[th.prop] : scope.row[th.prop] | formatters(th.formatData)"
                  v-bind="th.switchAttr"
                  :disabled="scope.row[th.disabled]"
                ></el-switch>
              </template>
              <!-- 图像 -->
              <template v-else-if="th.type === 'Image'">
                <slot name="Image" :prop='scope.row[th.prop]' v-bind="scope">
                  <div class="defaultimg">
                    <el-image
                      :src="scope.row[th.prop]"
                      :fit="(th.imageAttr && th.imageAttr.fit) || 'contain'"
                      v-bind="th.imageAttr"
                      @click.stop="th.click && th.click(scope.row)"
                      :preview-src-list="th.imgPreview ? [scope.row[th.prop]] : []"
                    >
                    </el-image>
                  </div>
                </slot>
              </template>
              <!-- 滑块 -->
              <template v-else-if="th.type === 'Slider'">
                <slot name="Slider" :prop='scope.row[th.prop]' v-bind="scope">
                  <el-slider
                    v-model="scope.row[th.prop]"
                    :disabled="scope.row[th.disabled]"
                    v-bind="th.sliderAttr"
                    @change='th.change && th.change({row: scope.row, index: scope.$index, event: $event})'
                  ></el-slider>
                </slot>
              </template>
              <!-- 链接 -->
              <template v-else-if="th.type === 'Link'">
                <slot name="Link" :prop='scope.row[th.prop]' v-bind="scope">
                  <el-link
                    :href="scope.row[th.prop]"
                    target="_blank"
                    v-bind="th.linkAttr || {}"
                  >{{ th.linkAttr['name'] || '链接'}}</el-link>
                </slot>
              </template>
              <!-- 长文本 -->
              <template v-else-if="th.type === 'Popover'">
                <slot name="Popover" :prop='scope.row[th.prop]' v-bind="scope">
                  <el-popover
                    v-bind="th.popoverAttr"
                    :content="scope.row[th.prop]"
                  >
                    <div
                      class="line-lcump2"
                      slot="reference"
                    >{{scope.row[th.prop]}}</div>
                  </el-popover>
                </slot>
              </template>
              <!-- 标签 -->
              <template v-else-if="th.type === 'Tag'">
                <slot name="Tag" :prop='scope.row[th.prop]' v-bind="scope">
                  <el-tag
                    v-if="scope.row[th.prop]"
                    v-bind="th.tagAttr"
                    @click="th.click && th.click({row: scope.row, index: scope.$index, event: $event})"
                    @close="th.close && th.close({row: scope.row, index: scope.$index, event: $event})"
                  >{{scope.row[th.prop]}}</el-tag>
                </slot>
              </template>
              <!-- 按钮 -->
              <template v-else-if="th.type === 'Button' || (isSelection && key === tableHeader.length - 1)">
                <slot name="Button" :prop='scope.row[th.prop]' v-bind="scope">
                  <template
                    v-for="(o, k) in th.buttonGroup"
                  >
                    <el-button
                      :key="k"
                      :type="o.buttonAttr && o.buttonAttr.type ? o.buttonAttr.type : 'text'"
                      :size="o.buttonAttr && o.buttonAttr.size ? o.buttonAttr.size : 'mini'"
                      @click.stop="o.click && o.click(scope.row, scope.$index)"
                      v-bind="o.buttonAttr"
                      v-if="!(o.buttonAttr && o.buttonAttr.hide)"
                    >{{scope.row[o.prop] || o.name}}</el-button>
                  </template>
                </slot>
              </template>
              <!-- 自定义 -->
              <template v-if="th.type === 'Slot'">
                <slot :name="th.slot" v-bind="scope"></slot>
              </template>
            </template>
          </el-table-column>
          <!-- 数据栏END -->
        </template>
        <slot name="later"></slot>
      </el-table>
    </section>
    <div class="functional">
      <!-- 批量操作区域 -->
      <div class="leftFunctional">
        <el-checkbox @click.native="toggleSelection" :value="checkAll" v-if="isSelection" :indeterminate="indeterminate">全选</el-checkbox>
        <div class="functionalBtn">
          <slot name="bulk" :getCurrentSelection="getCurrentSelection"></slot>
        </div>
      </div>
      <!-- 批量操作区域END -->

      <!-- 分页 -->
      <section
        class="grid-pagination"
        v-if="isPagination"
      >
        <slot name="pagination">
          <template v-if="!requestConfig.apiurl">
            <el-pagination
              v-bind="pagination"
              @current-change="pagination.currentChange && pagination.currentChange($event)"
              @size-change="pagination.sizeChange && pagination.sizeChange($event)"
            ></el-pagination>
          </template>
          <template v-else>
            <el-pagination
              v-bind="defaultPagination"
              @current-change="defaultCurrentChange"
              @size-change="defaultSizeChange"
            ></el-pagination>
          </template>
        </slot>
      </section>
      <!-- 分页END -->
    </div>
    <DiyDialog @dialogDataSuccess="dialogDataSuccess" :dialogData.sync="dialogData" />
  </section>
</template>

<script>
let that = null
import Axios from 'axios'
import qs from 'qs'
import Bus from '../bus'
// get请求
const Get = ({ url, data, header }) => {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: data,
      headers: header
    }).then(res => {
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

const Post = ({ url, data, header }) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, qs.stringify(data), {
      headers: header
    }).then(res => {
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}

export default {
  name: 'DiyTable',
  data () {
    return {
      multipleSelection: [],
      defaultPagination: {
        pageSize: 10, // 页条数
        currentPage: 1, // 当前页
        total: 0, // 总条数
        layout: 'total,sizes ,prev, pager, next,jumper',
        style: 'display: flex;justify-content: flex-end;align-items: center;margin-top: 10px;'
      },
      defaultLoading: false,
      defaultData: [],
      selectionList: [],
      sortData: {},
      dialogData: {
        show: false,
        type: 'Input',
        value: '',
        title: ''
      },
      preOperation: {
        hidden: false,
        type: "index",
        label: "操作",
        align: "center",
        width: "200"
      },
      searchData: {}
    }
  },
  props: {
    // 表单配置
    tableConfig: { type: Object, default: () => {
      return{
        ref: 'table'
      }
    } },
    // 表格属性
    tableAttr: {
      type: Object, default: () => {
        return{
          // border: false,
          showSummary: false
        }
      }
    },
    // 是否加载
    loading: { type: Boolean, default: false },
    // 表格数据
    tableData: {type: Array, default: () => []},
    // 表格列配置
    tableHeader: { type: Array, default: () => [] },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    // 是否显示单选框
    isSingle: {
      default: false
    },
    defaultSelections: { type: [Array, Object], default: () => null },
    // 是否显示分页
    isPagination: { type: Boolean, default: true },
    // 默认请求配置
    requestConfig: { type: Object, default: () => ({
      method: 'get'
    }) },
    // 分页数据
    pagination: { type: Object, default: () => ({ pageSize: 10, currentPage: 1, total: 0 }) },
    // 全选相关配置
    allselect: { type: Array, default: () => [] },
    // 表格方法
    select: {
      type: Function,
      default: (selection, row) => { that.$emit('select', selection, row) }
    },
    selectAll: {
      type: Function,
      default: (selection) => { that.$emit('selectAll', selection) }
    },
    selectionChange: {
      type: Function,
      default: (selection) => { that.selectionList = selection,that.$emit('selectionChange', selection) }
    },
    cellMouseEnter: {
      type: Function,
      default: (row, column, cell, event) => { that.$emit('cellMouseEnter', row, column, cell, event) }
    },
    cellMouseLeave: {
      type: Function,
      default: (row, column, cell, event) => { that.$emit('cellMouseLeave', row, column, cell, event) }
    },
    cellClick: {
      type: Function,
      default: (row, column, cell, event) => { that.$emit('cellClick', row, column, cell, event) }
    },
    cellDblclick: {
      type: Function,
      default: (row, column, cell, event) => { that.$emit('cellDblclick', row, column, cell, event) }
    },
    rowClick: {
      type: Function,
      default: (row, column, event) => { that.$emit('rowClick', row, column, event) }
    },
    rowContextmenu: {
      type: Function,
      default: (row, column, event) => { that.$emit('rowContextmenu', row, column, event) }
    },
    rowDblclick: {
      type: Function,
      default: (row, column, event) => { that.$emit('rowDblclick', row, column, event) }
    },
    headerClick: {
      type: Function,
      default: (column, event) => { that.$emit('headerClick', column, event) }
    },
    headerContextmenu: {
      type: Function,
      default: (column, event) => { that.$emit('headerContextmenu', column, event) }
    },
    sortChange: {
      type: Function,
      default: (...arges) => { that.defaultSortChange.apply(that, arges) }
    },
    filterChange: {
      type: Function,
      default: (filters) => { that.$emit('filterChange', filters) }
    },
    currentChange: {
      type: Function,
      default: (currentRow, oldCurrentRow) => { that.$emit('currentChange', currentRow, oldCurrentRow) }
    },
    headerDragend: {
      type: Function,
      default: (newWidth, oldWidth, column, event) => { that.$emit('headerDragend', newWidth, oldWidth, column, event) }
    },
    expandChange: {
      type: Function,
      default: (row, expandedRows) => { that.$emit('expandChange', row, expandedRows) }
    }
  },
  watch: {
    'defaultSelections' (val) {
      this.$nextTick(function () {
        if (Array.isArray(val)) {
          val.forEach(row => {
            this.$refs[this.tableConfig.ref].toggleRowSelection(row)
          })
        } else {
          this.$refs[this.tableConfig.ref].toggleRowSelection(val)
        }
      })
    },
    tableData() {
      this.defaultData = Object.assign([], this.tableData)
    },
    tableHeader () {
      this.init()
    }
  },
  filters: {
    formatters (val, format) {
      if (typeof (format) === 'function') {
        return format(val)
      } else return val
    }
  },
  methods: {
    init () {
      that = this
      if (this.requestConfig.apiurl) {
        this.fetchList()
        Bus.$on('getTableInquire', (data = {}) => {
          this.searchData = data
          this.fetchList(data)
        })
      } else if(this.tableData.length !== 0) {
        this.defaultData = Object.assign([], this.tableData)
      }
    },
    // switch兼容formatData表达式
    switchdefle(row, index, $event, th) {
      var update = row[th.prop]
      var formatDataOff = false
      if(th.formatData) {
        formatDataOff = true
        update = th.formatData(row[th.prop]) ? 0 : 1
      } else {
        update = !update
      }
      this.$set(row, th.prop, update)
      th.change && th.change({row, index, value: formatDataOff ? th.formatData(row[th.prop]) ? 1 : 0 : $event, th})
    },
    toggleSelection(e) {
      if (e.target.tagName === 'INPUT') {
        return false
      }
      var list = this.$refs[this.tableConfig.ref]
      var checkAll = this.checkAll
      list.clearSelection();
      if(!checkAll) {
        this.defaultData.forEach(el => {
          list.toggleRowSelection(el);
        })
      }
    },
    // 获取当前选中项回调
    getCurrentSelection() {
      var check = {}
      if(this.isSelection) {
        check = {
          selectedRows: this.selectionList
        }
      } else if(this.isSingle) {
        const checkData = this.defaultData.find(el => el._checkBox)
        check = {
          selectedRows: checkData
        }
      }
      return check
    },
    // 弹出对话框
    dialogDataUpdate(data, index, th) {
      this.dialogData = {
        title: '修改' + th.label,
        type: th.edit.type,
        value: data[th.prop],
        show: true,
        index,
        th,
        row: data,
        option: th.edit.option,
        optionLabel: th.edit.optionLabel,
        optionValue: th.edit.optionValue
      }
    },
    // 编辑框确认修改
    dialogDataSuccess() {
      this.dialogData.show = false
      const {
        row,
        index,
        value,
        th
      } = this.dialogData
      th.edit.change && th.edit.change({row, index, value})
    },
    singlecheckBox(e, data) {
      if(!e) {
        this.$set(data, '_checkBox', false)
      } else {
        this.defaultData.forEach(el => {
          this.$set(el, '_checkBox', false)
        })
        this.$set(data, '_checkBox', true)
      }
    },
    radiosClick(data, index, value, th, e) {
      // 绑定点击事件，第一次在label会触发，第二次在input标签上也会触发，去除input触发的事件
      // 判断本次点击是否和上次点击的一样
      if (e.target.tagName === 'INPUT' || value === data[th.prop]) {
        return false
      }
      if(!th.async) {
        this.$set(data, th.prop, value)
      }
      th.change && th.change({row: data, index, value, th})
    },
    // 获取列表
    fetchList (addData = {}) {
      this.defaultLoading = true
      let fun = null
      if (this.requestConfig.method && this.requestConfig.method.toLowerCase() === 'post') {
        fun = Post
      } else {
        fun = Get
      }
      fun({
        url: this.requestConfig.apiurl,
        data: {
          page: this.defaultPagination.currentPage,
          limit: this.defaultPagination.pageSize,
          ...(this.requestConfig.data || {}),
          ...(this.searchData || {}),
          ...this.sortData,
          ...addData
        },
        header: this.requestConfig.headers || {}
      }).then((response) => {
        let response_data = response.data
        if(this.requestConfig.processGetListResponse && typeof this.requestConfig.processGetListResponse === 'function') {
          // 自定义过滤函数
          let result = this.requestConfig.processGetListResponse(response_data)
          this.defaultPagination.total = result.total_items || 0
          this.defaultData = result.items || []
        } else {
          this.defaultPagination.total = response_data.data.total_items
          this.defaultData = response_data.data.items
        }

        this.defaultLoading = false
      }).catch(() => {
        this.$message.error('请求失败')
        this.defaultLoading = false
      })
    },
    // 默认页码变化
    defaultCurrentChange (val) {
      this.defaultPagination.currentPage = val
      this.fetchList()
    },
    // 默认单页个数
    defaultSizeChange (val) {
      this.defaultPagination.pageSize = val
      this.fetchList()
    },
    // 默认排序
    defaultSortChange (row) {
      let {order, prop} = row
      this.sortData = {}
      this.sortData['sort_' + prop] = order
      this.defaultPagination.currentPage = 1
      this.fetchList()
    },
    // 获取表格数据
    getTableData (){
      return this.defaultData
    }
  },
  computed: {
    checkAll() {
      var list = this.selectionList
      var tableDataLength = this.defaultData.length
      if(list) {
        var selectionLength = list.length
        if(selectionLength === tableDataLength && tableDataLength !== 0) {
          return true
        }
      }
      return false
    },
    indeterminate() {
      var list = this.selectionList
      var tableDataLength = this.defaultData.length
      var condition = false
      if(list) {
        var selectionLength = list.length
        switch(selectionLength) {
          case tableDataLength:
            condition = false
          break;
          case 0:
            condition = false
          break;
          default:
            condition = true
          break;
        }
      }
      return condition
    }
  },
  // 判断是否有存在只合计某一列
  created() {
    for(var k in this.pagination){
      this.defaultPagination[k] = this.pagination[k]
    }

    this.init()
  },
  beforeDestroy(){
    //取消监听'getTableInquire'事件
    Bus.$off('getTableInquire');
  }
}
</script>
<style>
.defaultimg {
  height: 100%;
  width: 100%;
  display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.defaultimg .el-image__error,
.defaultimg .el-image__inner,
.defaultimg .el-image__placeholder {
  height: auto;
}
.line-lcump2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.functional{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.leftFunctional{
  display: flex;
  align-items: center;
  /* margin-top: 10px; */
}
.functionalBtn{
  margin-left: 10px;
}
._diyTable.el-icon-edit{
  margin-left: 5px;
  cursor: pointer;
}
._dialogcontent{
  margin-bottom: 50px;
}
._dialogBtn{
  display: flex;
  justify-content: flex-end;
}
</style>
