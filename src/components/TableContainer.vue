<!-- 表格容器 -->
<template>
  <div class="table-container">
    <div class="action-header">
      <div class="header__wrap">
        <slot name="headerLeft"></slot>
        <Law-button type="primary" @click="handleSearch">查询</Law-button>
        <Law-button @click="handleReset">重置</Law-button>
      </div>
      <div class="header__wrap">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <el-divider />
    <div class="table-wrap">
      <slot name="table"></slot>
    </div>
    <el-divider />
    <slot name="pagination" />
  </div>
</template>

<script>
export default {
  name: 'TableContainer',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {
    handleSearch() {
      this.$emit('search')
    },

    handleReset() {
      this.$emit('reset')
    }
  },
  computed: {},
  watch: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  padding: 20px 20px 0 20px;
  border-radius: $borderRadius;
  border: 1px solid #eee;
  .action-header {
    display: flex;
    justify-content: space-between;
    .header__wrap {
      display: flex;
      align-items: center;
    }
    :deep(.el-form-item) {
      margin-bottom: 0;
    }
  }
  .table-wrap {
    flex: 1;
    overflow: hidden;
  }
}
</style>
