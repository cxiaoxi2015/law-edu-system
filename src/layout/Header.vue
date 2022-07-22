<!-- 布局-公告头 -->
<template>
  <div class="header">
    <span class="title">{{ sysTitle }}</span>
    <span class="sub-title">{{ sysSubTitle }}</span>
  </div>
</template>

<script>
import { sysTitle, sysSubTitle } from '@/config/sysConfig'
export default {
  name: 'Header',
  mixins: [],
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    sysTitle() {
      return sysTitle
    },
    sysSubTitle() {
      return sysSubTitle
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/mixins.scss";
.header {
  display: flex;
  align-items: center;
  height: 60px;
  background: $layoutBgColor;
  color: $headerTextColor;
  padding: 0 20px;
  span {
    &.title {
      font-size: 20px;
      margin-right: 10px;
    }
    &.sub-title {
      font-size: 12px;
      position: relative;
      top: 3px;
    }
  }
}
</style>
