<!-- 风险汇总-数据看板-风险统计 -->
<template>
  <div class="statistics">
    <div class="header">
      <span>风险统计</span>
      <div class="header-action">
        <el-form :model="searchBy" inline>
          <el-form-item label="统计范围">
            <el-select v-model="searchBy.range" placeholder="请选择">
              <el-option
                v-for="item in rangeOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="chart__item">
        <div class="chart__item__top">
          <el-form :model="searchBy" inline>
            <el-form-item label="月份统计" style="margin: 0;">
              <el-input v-model="searchBy.month"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="chart__item__bottom" id="statChartLeft"></div>
      </div>
      <div class="chart__item">
        <div class="chart__item__top">
          <el-form :model="searchBy" inline>
            <el-form-item label="年度统计" style="margin: 0;">
              <el-input v-model="searchBy.year"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="chart__item__bottom" id="statChartRight"></div>
      </div>
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
        range: '0',
        month: '',
        year: ''
      },
      rangeOptions: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '沙章图洗煤厂'
        },
        {
          value: '2',
          label: '中心洗煤厂'
        }
      ]
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
  .header {
    align-items: center;
    justify-content: space-between;
    .el-form-item {
      margin: 0;
    }
  }
  .content {
    display: flex;
    .chart__item {
      flex: 1;
      display: flex;
      flex-direction: column;
      &:first-child {
        margin-right: 15px;
      }
      .chart__item__bottom {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
