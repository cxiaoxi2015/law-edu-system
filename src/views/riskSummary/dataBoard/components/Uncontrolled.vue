<!-- 风险汇总-数据看板-风险排查超期预警 -->
<template>
  <div class="un-controlled">
    <div class="header">
      <span>风险排查超期预警</span>
    </div>
    <div class="content" id="unContChart">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Uncontrolled',
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
.un-controlled {
  height: 350px;
  width: 400px;
  margin-right: 15px;
  @include is-card();
}
</style>
