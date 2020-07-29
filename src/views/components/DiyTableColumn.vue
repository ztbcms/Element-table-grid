<template>
  <div class="table-column">
    <!-- prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper: 是否有操作列
           oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 -->
    <el-table-column
      v-for="(th, key) in tableHeader"
      :key="key+'column'+th.id"
      v-bind="th.option"
      :prop="th.prop"
      :label="th.label"
      :fixed="th.fixed"
      :min-width="th.minWidth"
      align="center"
    >
      <!-- 加入template主要是有操作一栏， 操作一栏的内容是相同的， 数据不是动态获取的，不过我这里操作一栏的名字定死了（oper表示是操作这一列，否则就不是） -->
      <template slot-scope="scope">
        <!-- 普通 -->
        <template v-if="th.type === 'text' || !th.type">
          <span v-if="!th.formatData">{{ scope.row[th.prop] }}</span>
          <span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
        </template>
        <!-- 按钮组 -->
        <template v-else-if="th.type === 'oper'">
          <div
            v-for="(o, k) in th.oper"
            :key="k"
          >
            <el-button
              @click.stop="o.clickFun(scope)"
              v-bind="o.scopeoption"
              v-if="scope.row['hidebtns'][o.name]"
            >{{scope.row[o.prop] || o.name}}</el-button>
          </div>
        </template>
        <!-- 图片 -->
        <template v-else-if="th.type === 'img'">
          <el-image
            :src="scope.row[th.prop]"
            v-bind="th.scopeoption"
          >
          </el-image>
        </template>
        <!-- 链接 -->
        <template v-else-if="th.type === 'href'">
          <el-link
            :href="scope.row[th.prop]"
            v-bind="th.scopeoption"
            target="_blank"
          >{{ th.scopeoption['name'] || '链接'}}</el-link>
        </template>
        <!-- 长文本 -->
        <template v-else-if="th.type === 'longtext'">
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
      <template v-if="th.children && th.children.length">
        <diy-table-column :tableHeader="th.children" />
      </template>
    </el-table-column>
  </div>
</template>
<script>
import DiyTableColumn from './DiyTableColumn.vue'
export default {
  name: 'diy-table-column',
  props: {
    tableHeader: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    'diy-table-column': DiyTableColumn
  },
  filters: {
    formatters (val, format) {
      if (typeof (format) === 'function') {
        return format(val)
      } else return val
    }
  },
  methods: {
    EditShow (scope) {
      this.$Bus.$emit('uptabledata', {
        data: Object.assign(scope.row, { editshow: !scope.row.editshow }),
        index: scope.$index
      })
    }
  }
}
</script>

<style>
.defaultimg {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  vertical-align: middle;
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