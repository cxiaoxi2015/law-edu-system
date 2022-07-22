<!-- 风险管理-数据看板-风险管控年度数据 -->
<template>
  <div class="year">
    <div class="header">
      <span>风险管控年度数据</span>
      <div class="header__action">
        <el-date-picker
          v-model="year"
          type="year"
          placeholder="根据年度筛选">
        </el-date-picker>
      </div>
    </div>
    <div class="content" id="yearChart"></div>
  </div>
</template>

<script>
export default {
  name: 'Year',
  mixins: [],
  components: {},
  data() {
    return {
      year: ''
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
.year {
  height: 350px;
  @include is-card();
  .header__action {
    flex: 1;
    margin-left: 10px;
  }
}
</style>
