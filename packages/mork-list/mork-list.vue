<!--表格组件 -->
<template>
  <section class="cpy-table-page" ref="container">
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
    <section class="cpy-table" :style="style">
        <!-- :row-key="getRowKey" -->
      <el-table
        v-bind="tableAttr"
        :data="scrollList"
        :row-key="getRowKey"
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
        @sort-change="integratedSort"
        @filter-change="filterChange"
        @current-change="currentChange"
        @header-dragend="headerDragend"
        @expand-change="expandChange"
        v-loading="loading || detaultLoading"
        :ref="tableConfig.ref"
        :summary-method="getSummaries"
      >
        <slot name="first"></slot>
        <el-table-column
          v-if="isSelection"
          align="center"
          prop="_check"
          :reserve-selection="true"
          :value="true"
          :render-header="renderHeader"
        >
           <template slot-scope="scope">
              <slot>
                <el-checkbox v-model="scope.row['_check']"></el-checkbox>
              </slot>
            </template>
        </el-table-column>
        <el-table-column
          v-if="isIndex"
          type="index"
          :label="indexLabel"
          align="center"
          width="50"
        ></el-table-column>
        <slot name="before"></slot>
        <template
          v-for="(th, key) in tableHeader"
        >
          <el-table-column
            v-if="key == 0 && isSingle"
            v-bind="{ align: 'center' }"
            :key="'column' + key"
            :prop="th.prop"
          >
            <template slot-scope="scope">
              <slot>
                  {{scope.row}}
                <!-- <el-checkbox v-model="scope.row['_checkBox']"></el-checkbox> -->
              </slot>
            </template>
          </el-table-column>
          <!-- 数据栏 -->
          <el-table-column
            :key="key+'column'+th.id"
            v-bind="th.tableColumnAttr || { align: 'center' }"
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
                  <i class="_diyTable el-icon-edit" @click="dialogDataUpdate(scope.row, scope.$index, th)" v-if="th.edit"></i>
                </slot>
              </template>
              <!-- html -->
              <template v-else-if="th.type === 'Html'">
                <slot name="Html">
                  <div v-html="th.html(scope.row[th.prop])"></div>
                </slot>
              </template>
              <!-- 输入框 -->
              <template v-else-if="th.type === 'Input'">
                <slot name="Input">
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
                    @change='th.change && th.change(scope.row, scope.$index, $event)'
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
                <slot name="Radio">
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
                <slot name="Checkbox">
                  <el-checkbox-group
                    v-model="scope.row[th.prop]"
                    v-bind="th.checkboxGroupAttr"
                    :disabled="scope.row[th.disabled]"
                    @change='th.change && th.change(scope.row, scope.$index, $event)'
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
                    :disabled="scope.row[th.disabled]"
                    @change='th.change && th.change(scope.row, scope.$index, $event)'
                  ></el-rate>
                </slot>
              </template>
              <!-- 开关 -->
              <template v-else-if="th.type === 'Switch'">
                <div @click="!scope.row[th.disabled] && th.change && th.change(scope.row, scope.$index, !scope.row[th.prop], th)" v-if="th.async">
                  <el-switch
                    :value="scope.row[th.prop]"
                    v-bind="th.switchAttr"
                    :disabled="scope.row[th.disabled]"
                  ></el-switch>
                </div>
                <el-switch
                  v-else
                  @change='th.change && th.change(scope.row, scope.$index, $event, th)'
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
                    :disabled="scope.row[th.disabled]"
                    v-bind="th.sliderAttr"
                    @change='th.change && th.change(scope.row, scope.$index, $event)'
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
              <!-- 按钮 -->
              <template v-else-if="th.type === 'Button' || (isSelection && key === tableHeader.length - 1)">
                <slot name="Button">
                  <!-- <el-button v-if="isSelection" size='mini' @click="multistageFn(scope.row)">查看</el-button> -->
                  <template
                    v-for="(o, k) in th.buttonGroup"
                  >
                    <el-button
                      :key="k"
                      :size="o.size || 'mini'"
                      @click.stop="o.click(scope.row, scope.$index)"
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
        </template>
        <slot name="later"></slot>
      </el-table>
    </section>
    <div class="functional">
      <!-- <div class="leftFunctional">
        <el-checkbox @click.native="toggleSelection" :value="checkAll" v-if="isSelection" :indeterminate="indeterminate">全选</el-checkbox>
        <div class="functionalBtn">
          <template
            v-for="(item, index) in allselect"
          >
            <el-button
              :key="index"
              v-bind="item.buttonAttr"
              :size="item.size || 'mini'"
              @click="functionalBtn(item)"
            >{{item.name}}</el-button>
          </template>
        </div>
      </div> -->
      <!-- 分页 -->
      <!-- <section
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
      </section> -->
    </div>
    <el-dialog :title="dialogData.title" :visible.sync="dialogData.show" width="35%">
      <div class="_dialogcontent" v-if="dialogData.type === 'Input'">
        <el-input autocomplete="off" v-model="dialogData.value"></el-input>
      </div>
      <div class="_dialogcontent" v-else-if="dialogData.type === 'Select'">
        <el-select v-model="dialogData.value" placeholder="请选择">
          <el-option
            v-for="(item) in dialogData.option"
            :key="item[dialogData.optionValue]"
            :label="item[dialogData.optionLabel]"
            :value="item[dialogData.optionValue]"
          >
          </el-option>
        </el-select>
        <!-- <el-input autocomplete="off" v-model="dialogData.value"></el-input> -->
      </div>
      <div class="_dialogBtn">
        <el-button type="info" @click="dialogData.show = false">取消</el-button>
        <el-button type="primary" @click="dialogDataSuccess">确定</el-button>
      </div>
    </el-dialog>
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
      multipleSelection: [],
      detaultPagination: {
        pageSize: 10, // 页条数
        currentPage: 2, // 当前页
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


      startIndex: 0,
      endIndex: 60,
      paddingTop: 0,
      paddingBottom: 0,
      allHeight: 0
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
    tableAttr: [Object],
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
    searchData: { type: Object, default: () => ({}) },
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
      default: (selection) => {
          that.toggleSelection()
          that.$emit('selectAll', selection)
        }
    },
    selectionChange: {
      type: Function,
      default: (selection, e) => {
          console.log(selection)
          console.log(e)
        //  that.selectionList = selection,
         that.$emit('selectionChange', selection)
      }
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
    },
    tableData() {
      this.detaultData = Object.assign([], this.tableData)
    },
    detaultData(val) {
        this.endIndex = this.startIndex + 12
        const valLen = val.length
        this.allHeight = valLen * 71
        this.paddingBottom = this.allHeight - this.scrollList.length * 71
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
    renderHeader(){
        return (
            <div onClick={this.toggleSelection}>
                <el-checkbox
                  indeterminate={this.indeterminate}
                  value={this.checkAll}
                ></el-checkbox>
            </div>
        )
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
    integratedSort({ column, prop, order }) {
        this.sortData = {}
        this.sortData[prop] = order
        this.detaultGetList()
        this.sortChange({
          sortData: this.sortData,
          sort: {
            column,
            prop,
            order
          }
        })
    },
    toggleSelection(e) {
      if (e.target.tagName === 'INPUT') {
        return false
      }
      var condition = true
      var checkAll = this.checkAll
      if(checkAll) {
        condition = false
      }
      this.detaultData.forEach(el => {
        this.$set(el, '_check', condition)
      })
    },
    functionalBtn(data) {
      var check = {}
      if(this.isSelection) {
        const list = this.$refs[this.tableConfig.ref].selection
        const indexs = []
        const ids = []
        const checkData = []
        this.detaultData.map((el, index) => {
          list.forEach(val => {
            if(el.id === val.id) {
              indexs.push(index)
              ids.push(val.id)
              checkData.push(val)
            }
          })
        })
        check = {
          index: indexs,
          checkData,
          ids
        }
      } else if(this.isSingle) {
        const checkData = this.detaultData.find(el => el._checkBox)
        check = {
          index: this.detaultData.findIndex(el => el._checkBox),
          checkData,
          ids: checkData ? checkData.id : ''
        }
      }
      if((this.isSingle && check.index >= 0) || (this.isSelection && check.index.length >= 1)) {
        const stringData = JSON.stringify(check.checkData)
        this.$alert(`<p>index: ${check.index}</p><p>ids: ${check.ids}</p><p>数据: ${stringData}</p>`, 'HTML 片段', {
          dangerouslyUseHTMLString: true
        }).then(() => {
          if(data.click) {
            data.click(check)
          }
        })
      }
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
    dialogDataSuccess() {
      this.dialogData.show = false
      const {
        row,
        index,
        value,
        th
      } = this.dialogData
      th.edit.change && th.edit.change(row, index, value)
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
      th.change && th.change(data, index, value, th)
    },
    // 默认获取列表
    detaultGetList () {
      // this.detaultLoading = true
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
          ...this.sortData
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
    getRowKey () {
      return null
    }
  },
  computed: {
    checkAll() {
        var condition = false
        const list = this.detaultData
        const checkList = list.filter(item => item._check).length
        if(list.length === checkList) {
          condition = true
        }
        return condition
    },
    indeterminate() {
        var condition = false
        const list = this.detaultData
        const index = list.findIndex(item => item._check)
        if(index != -1) {
          condition = true
        }
        if(this.checkAll) {
          condition = false
        }
        console.log(index)
        return condition
    },
    scrollList() {
        return this.detaultData.slice(this.startIndex, this.endIndex)
    },
    style() {
        return {
            paddingTop: this.paddingTop + 'px',
            paddingBottom: this.paddingBottom + 'px'
        }
    }
  },
  mounted () {
    that = this
    if (this.requestConfig.apiurl) {
      this.detaultGetList()
    } else if(this.tableData.length !== 0) {
      this.detaultData = Object.assign([], this.tableData)
    }

    const container = this.$refs.container
    container.addEventListener('scroll', () => {
        const top = container.scrollTop
        let lineHeight = ~~(this.allHeight / this.detaultData.length)
        let clientNum = ~~(900 / lineHeight)
        this.startIndex = ~~(top / lineHeight) >= this.detaultData.length - clientNum ? this.detaultData.length - clientNum : ~~(top / lineHeight)
        this.endIndex = this.startIndex + 12
        this.paddingTop = Math.min(this.allHeight, top)
        this.paddingBottom = Math.max((this.allHeight - top), 0)

        // this.paddingTop = top
        // if (this.endIndex >= this.detaultData.length - 1) {
        //     this.paddingBottom = 0
        //     return false
        // }
        // this.paddingBottom = this.allHeight - 900 - top
    })
  },
  // 判断是否有存在只合计某一列
  created() {
    const showSummaryList = this.tableHeader.filter(item => item.showSummary)
    if(showSummaryList.length !== 0) {
      this.$set(this.tableAttr, 'showSummary', true)
    }
  }
}
</script>
<style>
.cpy-table-page{
  height: 900px;
  overflow-y: auto;
}
.cpy-handle {
  position: sticky;
  top: 0;
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
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.leftFunctional{
  display: flex;
  align-items: center;
  margin-top: 10px;
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