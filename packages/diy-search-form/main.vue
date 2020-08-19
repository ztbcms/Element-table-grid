<!-- 搜索表单 -->
<template>
  <div class="element-table-grid-search" :style="gridSearchStyle">
    <el-form v-bind="formAttr">
      <slot name="searchBefore" :prop="fromData"></slot>
      <el-form-item
        v-for='item in searchForm'
        v-bind="item.formoption"
        :label="item.label"
        :key='item.prop'
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type==='Input'"
          v-model="fromData[item.prop]"
          v-bind="item.option"
          :placeholder="item.placeholder"
          @blur="item.blur && item.blur($event, fromData[item.prop])"
          @focus="item.focus && item.focus($event, fromData[item.prop])"
          @input="item.input && item.input($event, fromData[item.prop])"
          @change="item.change && item.change($event, fromData[item.prop])"
          @clear="item.clear && item.clear($event, fromData[item.prop])"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-if="item.type==='Select'"
          v-model="fromData[item.prop]"
          v-bind="item.option"
          :placeholder="item.placeholder"
          @change="item.change && item.change($event, fromData[item.prop])"
          @visible-change="item.visibleChange && item.visibleChange($event, fromData[item.prop])"
          @remove-tag="item.removeTag && item.removeTag($event, fromData[item.prop])"
          @clear="item.clear && item.clear($event, fromData[item.prop])"
          @blur="item.blur && item.blur($event, fromData[item.prop])"
          @focus="item.focus && item.focus($event, fromData[item.prop])"
        >
          <el-option
            v-for="op in item.options"
            v-bind="op.option"
            :label="op.label"
            :value="op.value"
            :key="op.value"
          ></el-option>
        </el-select>
        <!-- 单选 -->
        <el-radio-group
          v-if="item.type==='Radio'"
          v-model="fromData[item.prop]"
          v-bind="item.option"
        >
          <el-radio
            v-for="ra in item.options"
            v-bind="ra.option"
            :label="ra.value"
            :key="ra.value"
          >{{ra.label}}</el-radio>
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group
          v-if="item.type==='RadioButton'"
          v-bind="item.option"
          v-model="fromData[item.prop]"
          @change="item.change && item.change($event, fromData[item.prop])"
        >
          <el-radio-button
            v-for="ra in item.options"
            v-bind="ra.option"
            :label="ra.value"
            :key="ra.value"
          >{{ra.label}}</el-radio-button>
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type==='Checkbox'"
          v-bind="item.option"
          v-model="fromData[item.prop]"
        >
          <el-checkbox
            v-for="ch in item.options"
            v-bind="ch.option"
            :label="ch.value"
            :key="ch.value"
          >{{ch.label}}</el-checkbox>
        </el-checkbox-group>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type==='Date'"
          v-bind="item.option"
          v-model="fromData[item.prop]"
          @change="item.change && item.change($event, fromData[item.prop])"
          @blur="item.blur && item.blur($event, fromData[item.prop])"
          @focus="item.focus && item.focus($event, fromData[item.prop])"
        ></el-date-picker>
        <!-- 时间 -->
        <el-time-select
          v-if="item.type==='Time'"
          v-bind="item.option"
          v-model="fromData[item.prop]"
          @change="item.change && item.change($event, fromData[item.prop])"
          @blur="item.blur && item.blur($event, fromData[item.prop])"
          @focus="item.focus && item.focus($event, fromData[item.prop])"
        ></el-time-select>
        <!-- 日期范围 -->
        <el-date-picker
          v-if="item.type==='DateRange'"
          v-bind="item.option"
          type='daterange'
          v-model="fromData[item.prop]"
          @change="item.change && item.change($event, fromData[item.prop])"
          @blur="item.blur && item.blur($event, fromData[item.prop])"
          @focus="item.focus && item.focus($event, fromData[item.prop])"
        ></el-date-picker>
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type==='DateTime'"
          v-bind="item.option"
          type='datetime'
          v-model="fromData[item.prop]"
          @change="item.change && item.change($event, fromData[item.prop])"
          @blur="item.blur && item.blur($event, fromData[item.prop])"
          @focus="item.focus && item.focus($event, fromData[item.prop])"
        ></el-date-picker>
        <!-- 开关 -->
        <el-switch
          v-if="item.type==='Switch'"
          v-bind="item.option"
          v-model="fromData[item.prop]"
        ></el-switch>
        <el-button
          v-if="item.type==='Button'"
          v-bind="item.option"
          @click="item.click && item.click(fromData)"
        >{{item.name}}{{fromData[item.prop] || ''}}</el-button>
        <template v-if="item.type === 'Slot'">
          <slot :name="item.slot"></slot>
        </template>
      </el-form-item>
      <el-form-item>
        <div :style="gridSearchButtonStyle">
          <template v-for='item in formHandle'>
            <el-button
              :key="item.name"
              v-bind="item.option"
              v-if="(isInquire || item.key != 'inquire') && (isReset || item.key != 'reset')"
              @click='item.click && item.click(fromData)'
            >{{item.name}}{{fromData[item.prop] || ''}}</el-button>
          </template>
          <slot name="searchHandle" :prop="fromData"></slot>
        </div>
      </el-form-item>
      <slot name="searchAfter" :prop="fromData"></slot>
    </el-form>
  </div>
</template>

<script>
import Bus from '../bus'
export default {
  name: 'DiySearchForm',
  props: {
    formAttr: {
      type: Object,
      default: () => {
        return {
          size: 'mini',
          labelWidth: '80px',
          inline: true
        }
      }
    },
    searchForm: {
      type: Array,
      default: () => []
    },
    searchHandle: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '100%'
    },
    tableConfig: [Object],
    isInquire: { type: Boolean, default: true },
    isReset: { type: Boolean, default: true },
    // 行内布局时按钮组是否需要设置一个labelWidth的外边距（自定义）
    inlineStyle: [Boolean]
  },
  data () {
    return {
      fromData: {
      },
      formHandle: [
        { name: '查询', key: 'inquire', option: { type: 'primary' }, click: () => this.inquire.apply(this, arguments) },
        { name: '重置', key: 'reset', option: { type: 'primary' }, click: () => this.reset.apply(this, arguments) }
      ]
    };
  },
  created() {
    this.formDataInit()
    this.formHandle = this.RemoveRepeat(this.formHandle.concat(this.searchHandle), 'name')
  },
  methods: {
    inquire () {
      Bus.$emit('getTableInquire', this.fromData)
    },
    reset () {
      this.formDataInit()
      this.inquire()
    },
    formDataInit () {
      this.searchForm.forEach(el => {
        if(el.prop) {
          if(el.type === 'Checkbox') {
            this.$set(this.fromData, el.prop, [])
          } else {
            this.$set(this.fromData, el.prop, '')
          }
        }
      })
    },
    RemoveRepeat (arr = [], key = 'id') {
      let hash = {}
      return arr.reduce((item, next) => {
        hash[next[key]] ? '' : hash[next[key]] = true && item.push(next)
        return item
      }, [])
    }
  },
  computed: {
    // 表单盒子的样式
    gridSearchStyle () {
      return `width: ${this.width};`
    },
    // 表单按钮组的样式
    gridSearchButtonStyle () {
      if (this.formAttr.inline && (this.formAttr.labelWidth || this.formAttr['label-width']) && this.inlineStyle) {
        return `margin-left: ${this.formAttr.labelWidth || this.formAttr['label-width']};`
      }
      return ''
    }
  }
}

</script>

<style>
</style>