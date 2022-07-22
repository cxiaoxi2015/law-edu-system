<!-- 风险汇总-数据看板 -->
<template>
  <div class="data-board">
    <Statistics></Statistics>
    <div class="board__wrap">
      <Uncontrolled></Uncontrolled>
      <Progress></Progress>
    </div>
  </div>
</template>

<script>
import Statistics from './components/Statistics'
import Uncontrolled from './components/Uncontrolled'
import Progress from './components/Progress'
export default {
  name: 'DataBoard',
  mixins: [],
  components: {
    Statistics,
    Uncontrolled,
    Progress
  },
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
.data-board {
  height: auto !important;
  min-height: 100%;
  .board__wrap {
    display: flex;
  }
}
</style>
