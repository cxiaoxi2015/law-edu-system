<!-- 布局-侧边菜单 -->
<template>
  <el-menu
    class="side-bar-menu"
    router
    unique-opened
    :default-active="defaultActive"
    :collapse="isCollapse">
    <SubNavbarItem v-for="item in menuList" :key="item.name" :item="item"></SubNavbarItem>
  </el-menu>
</template>

<script>
import SubNavbarItem from './SubNavbarItem';
import { menuList } from '@/mock/menu';
export default {
  name: 'SideBarMenu',
  mixins: [],
  components: {
    SubNavbarItem
  },
  data() {
    return {
      isCollapse: false,
      defaultActive: ''
    }
  },
  methods: {},
  computed: {
    menuList() {
      return menuList
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler (route) {
        this.defaultActive = route.path
      }
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/mixins.scss";
.side-bar-menu {
  width: 230px;
  height: 100%;
  border-right: none;
  border-right: 1px solid $borderColor;
  color: $defaultTextColor;
  @include linear-gradient(#12223B, #071321, 220deg);
  :deep(.el-menu-item),
  :deep(.el-submenu__title) {
    color: $defaultTextColor;
    background-color: transparent;
    i { color: $defaultTextColor; }
    &:hover { background-color: #091525 !important; }
  }
  :deep(.el-submenu__title) {
    &:hover {
      background: transparent;
    }
  }
  :deep(.el-menu-item-group__title) { display: none; }
  :deep(.el-menu-item) {
    outline: none;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    background-color: transparent !important;
    &.is-active {
      background-color: $sbmActiveBgColor !important;
      border-top: 1px solid $sbmActiveBgColor;
      border-bottom: 1px solid $sbmActiveBgColor;
      i,
      span {
        color: $layoutBgColor !important;
      }
    }
  }
  :deep(.el-submenu) {
    .el-menu-item {
      &.is-active {
        position: relative;
        left: 1px;
        padding-left: 39px !important;
        i,
        span {
          color: $layoutBgColor !important;
        }
      }
    }
  }
  :deep(.el-menu) { background-color: transparent; }
}
</style>
