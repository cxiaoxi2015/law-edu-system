<!-- 布局-内容区域 -->
<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Container',
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
.container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  & > div {
    height: 100%;
  }
}
</style>
