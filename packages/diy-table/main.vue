<!--表格组件 -->
<template>
  <section class="table-grid-page">
    <!-- 表格操作按钮 -->
    <section
      class="grid-handle"
      v-if='isHandle'
    >
      <el-button
        v-for='(item, key) in tableHandles'
        v-bind="item.buttonAttr"
        @click="item.click()"
        :key="key"
      >{{item.label}}</el-button>
    </section>
    <!-- 数据表格 -->
    <section class="grid-table">
      <el-table
        v-bind="tableAttr"
        :data="detaultData"
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
        v-loading="loading || detaultLoading"
        :ref="tableConfig.ref"
        :summary-method="getSummaries"
      >
        <slot name="first"></slot>
        <!--  多选  -->
        <el-table-column
          v-if="isSelection"
          type="selection"
          align="center"
        ></el-table-column>
        <!--  多选END  -->
        <!-- 列序号  -->
        <el-table-column
          v-if="isIndex"
          type="index"
          :label="indexLabel"
          align="center"
          width="50"
        ></el-table-column>
       <!--  列序号END      -->
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
                <el-checkbox v-model="scope.row['_checkBox']" @change="singlecheckBox({event: $event, row: scope.row})"></el-checkbox>
              </slot>
            </template>
          </el-table-column>

          <!-- 数据栏 -->
          <el-table-column
            :key="'column' + key"
            v-bind="th.tableColumnAttr"
            :align="(th.tableColumnAttr && th.tableColumnAttr.align) || 'center'"
            :label="th.label"
            :prop="th.prop"
            :width="(th.tableColumnAttr && th.tableColumnAttr.width) || th.width"
          >
            <template slot-scope="scope">
              <!-- 普通 -->
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
                  <i class="_diyTable el-icon-edit" @click="dialogDataUpdate(scope.row, scope.$index, th)" v-if="th.edit"></i>
                </slot>
              </template>
              <!-- html -->
              <template v-else-if="th.type === 'Html'">
                <slot name="Html" :prop='scope.row[th.prop]' v-bind="scope">
                  <div v-html="th.html(scope.row[th.prop])"></div>
                </slot>
              </template>
              <!-- 输入框 -->
              <template v-else-if="th.type === 'Input'">
                <slot name="Input" :prop='scope.row[th.prop]' v-bind="scope">
                  <!-- <span
                    v-if="!th.formatData"
                    @click.stop="th.click && th.click(scope.row)"
                  >{{ scope.row[th.prop] }}</span> -->
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
                  <!-- <el-button v-if="isSelection" size='mini' @click="multistageFn(scope.row)">查看</el-button> -->
                  <template
                    v-for="(o, k) in th.buttonGroup"
                  >
                    <el-button
                      :key="k"
                      :type="o.type || 'text'"
                      :size="o.size || 'mini'"
                      @click.stop="o.click && o.click(scope.row, scope.$index)"
                      v-bind="o.buttonAttr"
                      v-if="!scope.row[o.hidKey]"
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
          <slot name="bluk" :functionalBtn="functionalBtn"></slot>
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
              v-bind="detaultPagination"
              @current-change="detaultCurrentChange"
              @size-change="detaultSizeChange"
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
      detaultPagination: {
        pageSize: 10, // 页条数
        currentPage: 1, // 当前页
        total: 0, // 总条数
        layout: 'total,sizes ,prev, pager, next,jumper',
        style: 'display: flex;justify-content: flex-end;align-items: center;margin-top: 10px;'
      },
      detaultLoading: false,
      detaultData: [],
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
          // border: true,
          showSummary: false
        }
      }
    },
    // 是否加载
    loading: { type: Boolean, default: false },
    // 表格操作
    isHandle: { type: Boolean, default: false },
    // 表格数据
    tableData: {type: Array, default: () => []},
    tableHandles: { type: Array, default: () => [] },
    // 表格列配置
    tableHeader: { type: Array, default: () => [] },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    // 是否显示单选框
    isSingle: {
      default: false
    },
    defaultSelections: { type: [Array, Object], default: () => null },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: '序号' },
    // 是否显示分页
    isPagination: { type: Boolean, default: true },
    // 默认请求配置
    requestConfig: { type: Object, default: () => ({
      method: 'get'
    }) },
    // 表单数据
    // searchData: { type: Object, default: () => ({}) },
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
      default: (selection) => { that.selectionList = selection, that.$emit('selectionChange', selection) }
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
      default: (...arges) => { that.detaultSortChange.apply(that, arges) }
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
      this.detaultData = Object.assign([], this.tableData)
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
        this.detaultGetList()
        Bus.$on('getTableInquire', (data = {}) => {
          this.searchData = data
          this.detaultGetList(data)
        })
      } else if(this.tableData.length !== 0) {
        this.detaultData = Object.assign([], this.tableData)
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
    // 合计
    getSummaries(param) {
      const tableHeader = this.tableHeader.filter(item => item.showSummary).map(item => item.prop)
      const { columns, data } = param
      const sums = []
      var total = true
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if(tableHeader.length !== 0) {
          total = false
          tableHeader.forEach(el => {
            if (column.property === el) {
              total = true
            }
          })
        }
        if(total) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index]
        }
      })
      return sums
    },
    // 记录排序列
    // integratedSort({ column, prop, order }) {
    //     this.sortData = {}
    //     this.sortData[prop] = order
    //     this.detaultGetList()
    //     this.sortChange(
    //       {
    //         column,
    //         prop,
    //         order
    //       },
    //       this.sortData
    //     )
    // },
    toggleSelection(e) {
      if (e.target.tagName === 'INPUT') {
        return false
      }
      var list = this.$refs[this.tableConfig.ref]
      var checkAll = this.checkAll
      list.clearSelection();
      if(!checkAll) {
        this.detaultData.forEach(el => {
          list.toggleRowSelection(el);
        })
      }
    },
    // 选中项回调
    functionalBtn() {
      var check = {}
      if(this.isSelection) {
        const list = this.$refs[this.tableConfig.ref].selection
        const indexs = []
        const checkData = []
        this.detaultData.map((el, index) => {
          list.forEach(val => {
            if(el.id === val.id) {
              indexs.push(index)
              checkData.push(val)
            }
          })
        })
        check = {
          index: indexs,
          checkData
        }
      } else if(this.isSingle) {
        const checkData = this.detaultData.find(el => el._checkBox)
        check = {
          index: this.detaultData.findIndex(el => el._checkBox),
          checkData
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
      // console.log(this.dialogData)
    },
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
        this.detaultData.forEach(el => {
          this.$set(el, '_checkBox', false)
        })
        this.$set(data, '_checkBox', true)
      }
    },
    radiosClick(data, index, value, th, e) {
      // console.log(data, index, value, th)
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
    tabelSearch(requestData) {
      this.detaultLoading = true
      let fun = null
      if (requestData.method === 'post') {
        fun = Post
      } else {
        fun = Get
      }
      fun({
        url: requestData.apiurl,
        data: {
          page: this.detaultPagination.currentPage,
          limit: this.detaultPagination.pageSize,
          ...(this.requestConfig.data || {}),
          ...(this.searchData || {}),
          ...this.sortData,
          ...(requestData.data || {})
        },
        header: requestData.headers || {}
      }).then(({ data }) => {
        let resCodes = this.requestConfig.resCodes || []
        let codeStatus = resCodes.findIndex(item => item === data.code) != -1
        if (data.status || codeStatus) {
          this.detaultPagination.total = this.setListTotal(data)
          this.detaultData = this.setListData(data)
        } else {
          this.$message.error(data.msg);
        }
        this.detaultLoading = false
      }).catch(() => {
        this.$message.error('请求失败')
        this.detaultLoading = false
      })
    },
    // 默认获取列表
    detaultGetList (addData = {}) {
      this.detaultLoading = true
      let fun = null
      if (this.requestConfig.method === 'post') {
        fun = Post
      } else {
        fun = Get
      }
      fun({
        url: this.requestConfig.apiurl,
        data: {
          page: this.detaultPagination.currentPage,
          limit: this.detaultPagination.pageSize,
          ...(this.requestConfig.data || {}),
          ...(this.searchData || {}),
          ...this.sortData,
          ...addData
        },
        header: this.requestConfig.headers || {}
      }).then(({ data }) => {
        let resCodes = this.requestConfig.resCodes || []
        let codeStatus = resCodes.findIndex(item => item === data.code) != -1
        if (data.status || codeStatus) {
          this.detaultPagination.total = this.setListTotal(data)
          this.detaultData = this.setListData(data)
        } else {
          this.$message.error(data.msg);
        }
        this.detaultLoading = false
      }).catch(() => {
        this.$message.error('请求失败')
        this.detaultLoading = false
      })
    },
    // set列表数据
    setListData (res) {
      if (this.requestConfig.datakeys && this.requestConfig.datakeys.length) {
        this.requestConfig.datakeys.forEach(item => {
          res = res[item]
        })
        return res
      } else {
        return res.data.items
      }
    },
    // set列表total
    setListTotal (res) {
      if (this.requestConfig.totalkeys && this.requestConfig.totalkeys.length) {
        this.requestConfig.totalkeys.forEach(item => {
          res = res[item]
        })
        return res * this.detaultPagination.pageSize
      } else {
        return res.data.total_pages
      }
    },
    // 默认页码变化
    detaultCurrentChange (val) {
      this.detaultPagination.currentPage = val
      this.detaultGetList()
    },
    // 默认单页个数
    detaultSizeChange (val) {
      this.detaultPagination.pageSize = val
      this.detaultGetList()
    },
    // 默认排序
    detaultSortChange ({order, prop}) {
      this.sortData = {}
      this.sortData[prop] = order
      this.detaultPagination.currentPage = 1
      // {'sort': order, 'sortType': prop}
      this.detaultGetList()
    }
  },
  computed: {
    checkAll() {
      var list = this.selectionList
      var tableDataLength = this.detaultData.length
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
      var tableDataLength = this.detaultData.length
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
      this.detaultPagination[k] = this.pagination[k]
    }
    const showSummaryList = this.tableHeader.filter(item => item.showSummary)
    if(showSummaryList.length !== 0) {
      this.$set(this.tableAttr, 'showSummary', true)
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
