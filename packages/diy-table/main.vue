<!--表格组件 -->
<template>
  <section class="cpy-table-page">
    <!-- 表格操作按钮 -->
    <section
      class="cpy-handle"
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
    <section class="cpy-table">
      <el-table
        v-bind="tableAttr"
        :data="tableData || detaultData"
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
      >
        <slot name="first"></slot>
        <el-table-column
          v-if="isSelection"
          type="selection"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="isIndex"
          type="index"
          :label="indexLabel"
          align="center"
          width="50"
        ></el-table-column>
        <slot name="before"></slot>
        <!-- 数据栏 -->
        <el-table-column
          v-for="(th, key) in tableHeader"
          :key="key+'column'+th.id"
          v-bind="th.tableColumnAttr"
          :label="th.label"
          :prop="th.prop"
        >
          <template slot-scope="scope">
            <!-- 普通 -->
            <template v-if="th.type === 'Text' || !th.type">
              <slot name="Text">
                <span
                  v-if="!th.formatData"
                  @click.stop="th.click && th.click(scope.row)"
                >{{ scope.row[th.prop] }}</span>
                <span
                  v-else
                  @click.stop="th.click && th.click(scope.row)"
                >{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
              </slot>
            </template>
            <!-- html -->
            <template v-else-if="th.type === 'Html'">
              <slot name="Html">
                <div v-html="th.html(scope.row[th.prop])"></div>
              </slot>
            </template>
            <!-- 按钮 -->
            <template v-else-if="th.type === 'Button'">
              <slot name="Button">
                <el-button
                  v-for="(o, k) in th.buttonGroup"
                  :key="k"
                  @click.stop="o.click(scope)"
                  v-bind="o.buttonAttr"
                >{{scope.row[o.prop] || o.name}}</el-button>
              </slot>
            </template>
            <!-- 输入框 -->
            <template v-else-if="th.type === 'Input'">
              <slot name="Input">
                <el-input
                  v-model="scope.row[th.prop]"
                  v-bind="th.inputAttr"
                  :disabled="scope.row[th.disabled]"
                  @focus="th.focus && th.focus($event, scope.row)"
                  @blur="th.blur && th.blur($event, scope.row)"
                  @change="th.change && th.change($event, scope.row)"
                  @input="th.input && th.input($event, scope.row)"
                  @clear="th.clear && th.clear(scope.row)"
                ></el-input>
              </slot>
            </template>
            <!-- 下拉框 -->
            <template v-else-if="th.type === 'Select'">
              <slot name="Select">
                <el-select
                  v-model="scope.row[th.prop]"
                  v-bind="th.selectAttr"
                  :disabled="scope.row[th.disabled]"
                  @change='th.change && th.change($event, scope.row)'
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
                    v-bind="op.optionAttr || th.optionAttr"
                    @blur="op.blur && op.blur(op)"
                    @focus="op.focus && op.focus(op)"
                  ></el-option>
                </el-select>
              </slot>
            </template>
            <!-- 单选 -->
            <template v-else-if="th.type === 'Radio'">
              <slot name="Radio">
                <el-radio-group
                  v-model="scope.row[th.prop]"
                  v-bind="th.radioGroupAttr"
                  :disabled="scope.row[th.disabled]"
                  @change='th.change && th.change($event, scope.row)'
                >
                  <el-radio
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
              <slot name="Checkbox">
                <el-checkbox-group
                  v-model="scope.row[th.prop]"
                  v-bind="th.checkboxGroupAttr"
                  :disabled="scope.row[th.disabled]"
                  @change='th.change && th.change($event, scope.row)'
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
              <slot name="Rate">
                <el-rate
                  v-model="scope.row[th.prop]"
                  v-bind="th.rateAttr"
                  @change='th.change && th.change($event, scope.row)'
                ></el-rate>
              </slot>
            </template>
            <!-- 开关 -->
            <template v-else-if="th.type === 'Switch'">
              <div @click="!scope.row[th.disabled] && th.change && th.change($event, scope.row, th)" v-if="th.async">
                <el-switch
                  :value="scope.row[th.prop]"
                  v-bind="th.switchAttr"
                  :disabled="scope.row[th.disabled]"
                ></el-switch>
              </div>
              <el-switch
                v-else
                @change='th.change && th.change($event, scope.row, th)'
                v-model="scope.row[th.prop]"
                v-bind="th.switchAttr"
                :disabled="scope.row[th.disabled]"
              ></el-switch>
            </template>
            <!-- 图像 -->
            <template v-else-if="th.type === 'Image'">
              <slot name="Image">
                <el-image
                  :src="scope.row[th.prop]"
                  v-bind="th.imageAttr"
                  @click.stop="th.click && th.click(scope.row)"
                  :preview-src-list="th.imgPreview ? [scope.row[th.prop]] : []"
                >
                </el-image>
              </slot>
            </template>
            <!-- 滑块 -->
            <template v-else-if="th.type === 'Slider'">
              <slot name="Slider">
                <el-slider
                  v-model="scope.row[th.prop]"
                  v-bind="th.sliderAttr"
                  @change='th.change && th.change($event, scope.row)'
                ></el-slider>
              </slot>
            </template>
            <!-- 链接 -->
            <template v-else-if="th.type === 'Link'">
              <slot name="Link">
                <el-link
                  :href="scope.row[th.prop]"
                  target="_blank"
                  v-bind="th.linkAttr"
                >{{ th.linkAttr['name'] || '链接'}}</el-link>
              </slot>
            </template>
            <!-- 长文本 -->
            <template v-else-if="th.type === 'Popover'">
              <slot name="Popover">
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
            <!-- 自定义 -->
            <template v-if="th.type === 'Slot'">
              <slot :name="th.slot" v-bind="scope"></slot>
            </template>
          </template>
        </el-table-column>
        <slot name="later"></slot>
      </el-table>
    </section>
    <!-- 分页 -->
    <section
      class="cpy-pagination"
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
  </section>
</template>

<script>
let that = null
import Axios from 'axios'
import qs from 'qs'

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
      detaultPagination: {
        pageSize: 10, // 页条数
        pageNum: 1, // 当前页
        total: 0, // 总条数
        layout: 'total,sizes ,prev, pager, next,jumper',
        style: 'display: flex;justify-content: flex-end;align-items: center;margin-top: 10px;'
      },
      detaultLoading: false,
      detaultData: []
    }
  },
  props: {
    // 表格属性
    tableAttr: [Object],
    // 是否加载
    loading: { type: Boolean, default: false },
    // 表格操作
    isHandle: { type: Boolean, default: false },
    tableHandles: { type: Array, default: () => [] },
    // 表格数据
    tableData: [Array],
    // 表格列配置
    tableHeader: { type: Array, default: () => [] },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    defaultSelections: { type: [Array, Object], default: () => null },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: '序号' },
    // 是否显示分页
    isPagination: { type: Boolean, default: true },
    // 默认请求配置
    requestConfig: { type: Object, default: () => ({}) },
    // 表单数据
    searchData: { type: Object, default: () => ({}) },
    // 分页数据
    pagination: { type: Object, default: () => ({ pageSize: 10, pageNum: 1, total: 0 }) },
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
      default: (selection) => { that.$emit('selectionChange', selection) }
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
      default: ({ column, prop, order }) => { that.$emit('sortChange', { column, prop, order }) }
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
            this.$refs.cpyTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.cpyTable.toggleRowSelection(val)
        }
      })
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
    // 默认获取列表
    detaultGetList () {
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
          page: this.detaultPagination.pageNum,
          limit: this.detaultPagination.pageSize,
          ...(this.requestConfig.data || {}),
          ...(this.searchData || {})
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
        return res
      } else {
        return res.data.total_pages
      }
    },
    // 默认页码变化
    detaultCurrentChange (val) {
      this.detaultPagination.pageNum = val
      this.detaultGetList()
    },
    // 默认单页个数
    detaultSizeChange (val) {
      this.detaultPagination.pageSize = val
    }
  },
  mounted () {
    that = this
    if (this.requestConfig.apiurl) {
      this.detaultGetList()
    }
  }
}
</script>
<style>
.line-lcump2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>