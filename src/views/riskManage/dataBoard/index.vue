<!-- 风险管理-数据看板 -->
<template>
  <div class="data-board">
    <Statistics></Statistics>
    <div class="board__wrap">
      <Uncontrolled></Uncontrolled>
      <Progress></Progress>
    </div>
    <Year></Year>
  </div>
</template>

<script>
import Statistics from './components/Statistics'
import Uncontrolled from './components/Uncontrolled'
import Progress from './components/Progress'
import Year from './components/Year'
export default {
  name: 'DataBoard',
  mixins: [],
  components: {
    Statistics,
    Uncontrolled,
    Progress,
    Year
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
    margin-bottom: 15px;
  }
}
</style>
