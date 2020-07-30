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
        v-bind="item.option"
        @click="item.click()"
        :key="key"
      >{{item.label}}</el-button>
    </section>
    <!-- 数据表格 -->
    <section class="cpy-table">
      <el-table
        v-bind="tableAttr"
        :data='tableData'
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
        v-loading='loading'
        ref="cpyTable"
      >
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
        <!-- 数据栏 -->
        <el-table-column
          v-for="(th, key) in tableHeader"
          :key="key+'column'+th.id"
          v-bind="th.option"
          :label="th.label"
          :prop="th.prop"
        >
          <template slot-scope="scope">
            <!-- 普通 -->
            <template v-if="th.type === 'Text' || !th.type">
              <span
                v-if="!th.formatData"
                @click.stop="th.click && th.click(scope.row)"
              >{{ scope.row[th.prop] }}</span>
              <span
                v-else
                @click.stop="th.click && th.click(scope.row)"
              >{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
            </template>
            <!-- html -->
            <template v-else-if="th.type === 'Html'">
              <div v-html="th.html(scope.row[th.prop])"></div>
            </template>
            <!-- 按钮 -->
            <template v-else-if="th.type === 'Button'">
              <el-button
                v-for="(o, k) in th.oper"
                :key="k"
                @click.stop="o.click(scope)"
                v-bind="o.scopeoption"
              >{{scope.row[o.prop] || o.name}}</el-button>
            </template>
            <!-- 输入框 -->
            <template v-else-if="th.type === 'Input'">
              <el-input
                v-model="scope.row[th.prop]"
                v-bind="th.scopeoption"
                @focus="th.focus && th.focus(scope.row)"
                @blur="th.blur && th.blur(scope.row)"
              ></el-input>
            </template>
            <!-- 下拉框 -->
            <template v-else-if="th.type === 'Select'">
              <el-select
                v-model="scope.row[th.prop]"
                v-bind="th.scopeoption"
                @change='th.change && th.change(scope.row)'
              >
                <el-option
                  v-for="op in th.options"
                  :label="op[th.props.label]"
                  :value="op[th.props.value]"
                  :key="op[th.props.value]"
                ></el-option>
              </el-select>
            </template>
            <!-- 单选 -->
            <template v-else-if="th.type === 'Radio'">
              <el-radio-group
                v-model="scope.row[th.prop]"
                v-bind="th.scopeoption"
                @change='th.change && th.change(scope.row)'
              >
                <el-radio
                  v-for="ra in th.radios"
                  :label="ra.value"
                  :key="ra.value"
                >{{ra.label}}</el-radio>
              </el-radio-group>
            </template>
            <!-- 复选框 -->
            <template v-else-if="th.type === 'Checkbox'">
              <el-checkbox-group
                v-model="scope.row[th.prop]"
                v-bind="th.scopeoption"
                @change='th.change && th.change(scope.row)'
              >
                <el-checkbox
                  v-for="ra in th.checkboxs"
                  :label="ra.value"
                  :key="ra.value"
                >{{ra.label}}</el-checkbox>
              </el-checkbox-group>
            </template>
            <!-- 评价 -->
            <template v-else-if="th.type === 'Rate'">
              <el-rate
                v-model="scope.row[th.prop]"
                v-bind="th.scopeoption"
                @change='th.change && th.change(scope.row)'
              ></el-rate>
            </template>
            <!-- 开关 -->
            <template v-else-if="th.type === 'Switch'">
              <el-switch
                v-model="scope.row[th.prop]"
                v-bind="th.scopeoption"
                @change='th.change && th.change(scope.row)'
              ></el-switch>
            </template>
            <!-- 图像 -->
            <template v-else-if="th.type === 'Image'">
              <el-image
                :src="scope.row[th.prop]"
                v-bind="th.scopeoption"
                @click.stop="th.click && th.click(scope.row)"
              >
              </el-image>
            </template>
            <!-- 滑块 -->
            <template v-else-if="th.type === 'Slider'">
              <el-slider
                v-model="scope.row[th.prop]"
                v-bind="th.scopeoption"
                @change='th.change && th.change(scope.row)'
              ></el-slider>
            </template>
            <!-- 链接 -->
            <template v-else-if="th.type === 'Link'">
              <el-link
                :href="scope.row[th.prop]"
                target="_blank"
                v-bind="th.scopeoption"
              >{{ th.scopeoption['name'] || '链接'}}</el-link>
            </template>
            <!-- 长文本 -->
            <template v-else-if="th.type === 'Popover'">
              <el-popover
                v-bind="th.scopeoption"
                :content="scope.row[th.prop]"
              >
                <div
                  class="line-lcump2"
                  slot="reference"
                >{{scope.row[th.prop]}}</div>
              </el-popover>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 分页 -->
    <section
      class="cpy-pagination"
      v-if='isPagination'
    >
      <el-pagination
        style='display: flex;justify-content: center;height: 100%;align-items: center;'
        @current-change="pagination.handleCurrentChange && pagination.handleCurrentChange($event)"
        @size-change="pagination.handleSizeChange && pagination.handleSizeChange($event)"
        layout="total,sizes ,prev, pager, next,jumper"
        :page-size="pagination.pageSize"
        :current-page="pagination.pageNum"
        :total="pagination.total"
      ></el-pagination>
    </section>
  </section>
</template>

<script>
let that = null
export default {
  name: 'DiyTable',
  props: {
    // 表格属性
    tableAttr: [Object],
    // 是否加载
    loading: { type: Boolean, default: false },
    // 表格操作
    isHandle: { type: Boolean, default: false },
    tableHandles: { type: Array, default: () => [] },
    // 表格数据
    tableData: { type: Array, default: () => [] },
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
    // 分页数据
    pagination: { type: Object, default: () => ({ pageSize: 10, pageNum: 1, total: 0 }) },
    // 表单方法
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
  mounted () {
    that = this
  }
}
</script>
<style>
.cpy-table-require::before {
  content: '*';
  color: red;
}
.line-lcump2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>