<!-- 风险管理-数据看板-风险管控进度情况 -->
<template>
  <div class="progress">
    <div class="header">
      <span>风险管控进度情况</span>
    </div>
    <div class="content" id="proChart"></div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  mixins: [],
  components: {},
  data() {
    return {}
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
.progress {
  height: 350px;
  flex: 1;
  @include is-card();
}
</style>
