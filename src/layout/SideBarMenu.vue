<!-- 布局-侧边菜单 -->
<template>
  <div class="side-bar-menu__wrap">
    <div class="logo">
      <span class="title" :class="{'is-collapse': isCollapse}">{{ title }}</span>
    </div>
    <el-menu
      class="side-bar-menu"
      router
      unique-opened
      :default-active="defaultActive"
      :collapse="isCollapse">
      <SubNavbarItem
        :collapse="isCollapse"
        v-for="item in menuList"
        :key="item.name"
        :item="item" />
    </el-menu>
  </div>
</template>

<script>
import SubNavbarItem from './SubNavbarItem';
import { menuList } from '@/mock/menu';
import { sysTitle, sysCollapseTitle } from '@/config/sysConfig'
import { mapGetters } from 'vuex'

export default {
  name: 'SideBarMenu',
  mixins: [],
  components: {
    SubNavbarItem
  },
  data() {
    return {
      defaultActive: ''
    }
  },
  methods: {

  },
  computed: {
    menuList() {
      return menuList
    },
    sysTitle() {
      return sysTitle
    },
    sysCollapseTitle() {
      return sysCollapseTitle
    },
    title() {
      return this.isCollapse
          ? sysCollapseTitle
          : sysTitle
    },
    ...mapGetters(['isCollapse'])
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
.side-bar-menu__wrap {
  display: flex;
  flex-direction: column;
}
.logo {
  width: 100%;
  height: 64px;
  background: #002140;
  line-height: 64px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #FFF;
  letter-spacing: 1.5px;
  text-shadow: 0 0 20px #fff;
  -webkit-animation: logoTwinkle 1.5s alternate infinite;
  animation: logoTwinkle 1.5s alternate infinite;
  @keyframes logoTwinkle {
    0%{
      text-shadow: 0 0 10px #FFF;
    }50%{
       text-shadow: 0 0 20px #FFF;
     }100%{
        text-shadow: 0 0 0 #FFF;
      }
  }
  .title {
    font-size: 20px;
    &.is-collapse {
      font-size: 22px;
    }
  }
}
.side-bar-menu:not(.el-menu--collapse) {
  width: 200px;
}
.side-bar-menu {
  flex: 1;
  border-right: none;
  border-right: 1px solid $borderColor;
  color: $sideBarDefaultTextColor;
  background: $sideBarBgColor;
  :deep(.el-menu-item),
  :deep(.el-submenu__title) {
    color: $sideBarDefaultTextColor;
    background-color: transparent;
    i { color: $sideBarDefaultTextColor; }
    &:hover { background-color: #515A6E !important; }
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
        color: #fff !important;
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
