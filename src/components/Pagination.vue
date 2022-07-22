<!-- 分页 -->
<template>
  <div class="pagination">
    <div class="pagination-slot">
      <slot>
        <el-pagination
          :total="total"
          :current-page="page"
          :page-sizes="[5, 10, 20, 30, 50]"
          :page-size="pageSize"
          @current-change="pageChange"
          @size-change="pageSizeChange"
          layout="total, prev, pager, next, sizes, jumper"
          background
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  mixins: [],
  props: {
    total: {
      type: Number
    },
    page: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    /**
     * 页数change
     * @param pageNum
     */
    pageChange(pageNum) {
      this.$emit('pageChange', pageNum)
    },

    /**
     * 页码change
     * @param pageSize
     */
    pageSizeChange(pageSize) {
      this.$emit('pageSizeChange', pageSize)
    }
  },
  computed: {},
  watch: {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.pagination {
  :deep(.el-pagination) {
    padding: 0 25px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button,
    li {
      border-radius: $borderRadius;
      font-weight: normal;
    }
    .el-input__inner {
      border-radius: $borderRadius;
    }
    .el-pagination__sizes {
      margin: 0;
      .el-input__inner {
        padding: 0;
      }
    }
    .el-pagination__jump {
      margin-left: 10px;
    }
    .el-pager {
      margin: 0;
    }
  }
}
</style>
