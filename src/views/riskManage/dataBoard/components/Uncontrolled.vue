<!-- 风险管理-数据看板-未管控风险隐患 -->
<template>
  <div class="un-controlled">
    <div class="header">
      <span>未管控风险隐患</span>
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
  flex: 1;
  margin-right: 15px;
  @include is-card();
}
</style>
