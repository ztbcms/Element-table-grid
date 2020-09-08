<template>
  <el-dialog :title="dialogData.title" :visible.sync="dialogData.show" width="35%" :append-to-body="true">
    <!-- 输入框-->
    <div class="_dialogcontent" v-if="dialogData.type === 'Input'">
      <el-input autocomplete="off" v-model="dialogData.value"></el-input>
    </div>
    <!-- 选择框  -->
    <div class="_dialogcontent" v-else-if="dialogData.type === 'Select'">
      <el-select v-model="dialogData.value" placeholder="请选择">
        <el-option
          v-for="(item, index) in dialogData.options"
          :key="index"
          :label="item['label']"
          :value="item['value']"
        >
        </el-option>
      </el-select>
    </div>
    <div class="_dialogBtn">
      <el-button type="info" @click="dialogData.show = false" size="mini">取消</el-button>
      <el-button type="primary" @click="$emit('dialogDataSuccess')" size="mini">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DiyDialog',
  props: {
    dialogData: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
._dialogcontent{
  margin-bottom: 50px;
}
._dialogBtn{
  display: flex;
  justify-content: flex-end;
}
</style>
