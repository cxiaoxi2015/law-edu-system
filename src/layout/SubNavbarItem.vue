<!-- 菜单条目 -->
<template>
  <div>
    <el-submenu v-if="item.children && item.children.length" :index="item.path">
      <template slot="title">
        <i class="iconfont" v-html="item.icon"></i>
        <span>{{ item.title }}</span>
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .iconfont {
    margin-right: 5px;
    font-size: 16px;
  }
</style>
