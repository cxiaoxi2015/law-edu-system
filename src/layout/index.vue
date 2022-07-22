<!-- layout -->
<template>
  <div class="layout">
    <LawSideBarMenu />
    <div class="layout__wrap">
      <LawHeader />
      <Container />
    </div>
  </div>
</template>

<script>
import LawHeader from './Header'
import LawSideBarMenu from './SideBarMenu'
import Container from './Container'
export default {
  name: 'Layout',
  mixins: [],
  components: {
    LawHeader,
    LawSideBarMenu,
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
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
}
</style>
