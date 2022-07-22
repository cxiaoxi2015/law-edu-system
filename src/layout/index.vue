<!-- layout -->
<template>
  <div class="layout">
    <XWHeader />
    <div class="layout__wrap">
      <XWSideBarMenu />
      <Container />
    </div>
  </div>
</template>

<script>
import XWHeader from './Header'
import XWSideBarMenu from './SideBarMenu'
import Container from './Container'
export default {
  name: 'Layout',
  mixins: [],
  components: {
    XWHeader,
    XWSideBarMenu,
    Container
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
.layout {
  background: $containerBgColor;
  .layout__wrap {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
}
</style>
