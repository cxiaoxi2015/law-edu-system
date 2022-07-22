<!-- 菜单条目 -->
<template>
  <div :class="{'is-collapse': collapse}">
    <el-submenu v-if="item.children && item.children.length" :index="item.path">
      <template slot="title">
        <i class="iconfont" v-html="item.icon"></i>
        <span v-show="!collapse">{{ item.title }}</span>
      </template>
      <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path">
        <i class="iconfont" v-html="subItem.icon"></i>
        <span>{{ subItem.title }}</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item v-else :index="item.path">
      <i class="iconfont" v-html="item.icon"></i>
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'SubNavbarItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    collapse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .iconfont {
    margin-right: 5px;
    font-size: 16px;
  }
  .is-collapse {
    .iconfont {
      margin-right: 0;
      font-size: 20px;
    }
    :deep(.el-submenu__icon-arrow) {
      display: none;
    }
  }
</style>
