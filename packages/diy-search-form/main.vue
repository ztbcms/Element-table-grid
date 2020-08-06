<!-- 搜索表单 -->
<template>
  <div class="cpy-search">
    <el-form v-bind="formAttr">
      <el-form-item
        v-for='item in searchForm'
        v-bind="item.formoption"
        :label="item.label"
        :key='item.prop'
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type==='Input'"
          v-model="searchData[item.prop]"
          v-bind="item.option"
          :placeholder="item.placeholder"
          @blur="item.blur && item.blur($event, searchData[item.prop])"
          @focus="item.focus && item.focus($event, searchData[item.prop])"
          @input="item.input && item.input($event, searchData[item.prop])"
          @change="item.change && item.change($event, searchData[item.prop])"
          @clear="item.clear && item.clear($event, searchData[item.prop])"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-if="item.type==='Select'"
          v-model="searchData[item.prop]"
          v-bind="item.option"
          :placeholder="item.placeholder"
          @change="item.change && item.change($event, searchData[item.prop])"
          @visible-change="item.visibleChange && item.visibleChange($event, searchData[item.prop])"
          @remove-tag="item.removeTag && item.removeTag($event, searchData[item.prop])"
          @clear="item.clear && item.clear($event, searchData[item.prop])"
          @blur="item.blur && item.blur($event, searchData[item.prop])"
          @focus="item.focus && item.focus($event, searchData[item.prop])"
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
          v-model="searchData[item.prop]"
          v-bind="item.option"
        >
          <el-radio
            v-for="ra in item.radios"
            v-bind="ra.option"
            :label="ra.value"
            :key="ra.value"
          >{{ra.label}}</el-radio>
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group
          v-if="item.type==='RadioButton'"
          v-bind="item.option"
          v-model="searchData[item.prop]"
          @change="item.change && item.change($event, searchData[item.prop])"
        >
          <el-radio-button
            v-for="ra in item.radios"
            v-bind="ra.option"
            :label="ra.value"
            :key="ra.value"
          >{{ra.label}}</el-radio-button>
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type==='Checkbox'"
          v-bind="item.option"
          v-model="searchData[item.prop]"
        >
          <el-checkbox
            v-for="ch in item.checkboxs"
            v-bind="ch.option"
            :label="ch.value"
            :key="ch.value"
          >{{ch.label}}</el-checkbox>
        </el-checkbox-group>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type==='Date'"
          v-bind="item.option"
          v-model="searchData[item.prop]"
          @change="item.change && item.change($event, searchData[item.prop])"
          @blur="item.blur && item.blur($event, searchData[item.prop])"
          @focus="item.focus && item.focus($event, searchData[item.prop])"
        ></el-date-picker>
        <!-- 时间 -->
        <el-time-select
          v-if="item.type==='Time'"
          v-bind="item.option"
          v-model="searchData[item.prop]"
          @change="item.change && item.change($event, searchData[item.prop])"
          @blur="item.blur && item.blur($event, searchData[item.prop])"
          @focus="item.focus && item.focus($event, searchData[item.prop])"
        ></el-time-select>
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type==='DateTime'"
          v-bind="item.option"
          type='datetime'
          v-model="searchData[item.prop]"
          @change="item.change && item.change($event, searchData[item.prop])"
          @blur="item.blur && item.blur($event, searchData[item.prop])"
          @focus="item.focus && item.focus($event, searchData[item.prop])"
        ></el-date-picker>
        <!-- 开关 -->
        <el-switch
          v-if="item.type==='Switch'"
          v-bind="item.option"
          v-model="searchData[item.prop]"
        ></el-switch>
        <el-button
          v-if="item.type==='Button'"
          v-bind="item.option"
          @click="item.click && item.click(searchData[item.prop])"
        >{{item.name}}{{searchData[item.prop] || ''}}</el-button>
      </el-form-item>
    </el-form>
    <el-form
      v-bind="formAttr"
      v-if='isHandle'
    >
      <el-form-item
        v-for='item in searchHandle'
        :key="item.name"
      >
        <el-button
          v-bind="item.option"
          @click='item.click && item.click(searchData[item.prop])'
        >{{item.name}}{{searchData[item.prop] || ''}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DiySearchForm',
  props: {
    isHandle: {
      type: Boolean,
      default: false
    },
    formAttr: [Object],
    searchForm: {
      type: Array,
      default: () => []
    },
    searchHandle: {
      type: Array,
      default: () => []
    },
    searchData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
    };
  },

}

</script>

<style>
</style>