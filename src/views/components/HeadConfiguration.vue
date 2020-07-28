<template>
  <div>
    <div
      v-for="(head, key) in headConfiguration"
      :key="key"
    >
      <div
        class="filter-container"
        v-for="(headitem, k) in head.data"
        :key="k"
      >
        <template v-if="headitem.type === 'input'">
          <el-input
            v-bind="headitem.scopeoption"
            v-model="headitem.model"
          ></el-input>
        </template>
        <template v-if="headitem.type === 'btn'">
          <el-button
            @click.stop="headitem.clickFun()"
            v-bind="headitem.scopeoption"
          >{{headitem.name}}</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headConfiguration: [Array]
  },
  methods: {
    searchList () {
      this.$emit('update')
    }
  },
  data () {
    return {

    }
  },
}
</script>