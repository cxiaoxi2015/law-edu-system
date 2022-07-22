<!-- 风险管理-数据看板-风险统计 -->
<template>
  <div class="statistics">
    <div class="header">
      <span>风险统计</span>
      <div class="header__action">
        <el-date-picker
          v-model="searchBy.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
    <div class="content">
      <div class="chart__item" id="statChartLeft"></div>
      <div class="chart__item" id="statChartRight"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  mixins: [],
  components: {},
  data() {
    return {
      searchBy: {
        dateRange: ''
      }
    }
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/mixins.scss';
.statistics {
  height: 450px;
  margin-bottom: 15px;
  @include is-card();
  .header__action {
    flex: 1;
    margin-left: 10px;
  }
  .content {
    display: flex;
    .chart__item {
      flex: 1;
      &:first-child {
        margin-right: 15px;
      }
    }
  }
}
</style>
