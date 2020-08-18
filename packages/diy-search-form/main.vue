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
      </el-form-item>
      <el-form-item
        v-for='item in searchHandle'
        :key="item.name"
      >
        <el-button
          v-bind="item.option"
          @click='item.click && item.click(fromData)'
        >{{item.name}}{{fromData[item.prop] || ''}}</el-button>
      </el-form-item>
      <slot :prop="fromData"></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DiySearchForm',
  props: {
    formAttr: {
      type: Object,
      default: () => {
        return{
          size: 'mini',
          labelWidth: '100px',
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
    }
  },
  data () {
    return {
      fromData: {
      }
    };
  },
  created() {
    this.searchForm.forEach((el, index) => {
      if(el.prop) {
        this.$set(this.fromData, el.prop, '')
      } else if(el.type !== 'Button') {
        console.warn(`功能区第${index}个,type:${el.type},没有填prop,可能会导致Bug`)
      }
    })
  }
}

</script>

<style>
</style>