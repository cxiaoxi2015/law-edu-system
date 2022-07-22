<!-- 布局-公告头 -->
<template>
  <div class="header">
    <div
      class="sidebar__toggle__button iconfont"
      :class="{'is-collapse': isCollapse}"
      @click="handleToggleCollapse">
      &#xe600;
    </div>
    <div class="header__right">
      <el-dropdown>
        <div class="user-avatar">
          <div class="img-wrap">
            <img src="https://i.loli.net/2017/08/21/599a521472424.jpg">
          </div>
          <span>{{ username }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
          <el-dropdown-item>切换账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'Header',
  mixins: [],
  components: {},
  data() {
    return {
      username: '超级管理员'
    }
  },
  methods: {
    handleToggleCollapse() {
      this.TOGGLE_COLLAPSE(!this.isCollapse)
    },
    ...mapMutations(['TOGGLE_COLLAPSE'])
  },
  computed: {
    ...mapGetters(['isCollapse'])
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/mixins.scss";
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background: #fff;
  color: $headerTextColor;
  padding: 0 20px;
  box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
  .sidebar__toggle__button {
    cursor: pointer;
    font-size: 20px;
    transition: transform .2s linear;
    user-select: none;
    color: $primaryButtonColor;
    &:hover {
      color: $primaryButtonHoverColor;
    }
    &.is-collapse {
      transform: rotate(-90deg);
    }
  }
  &__right {
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 20px;
    .user-avatar {
      height: 100%;
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        .img-wrap {
          img {
            transform: scale(1);
          }
        }
      }
      .img-wrap {
        width: 32px;
        height: 32px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transform: scale(.9);
          transition: transform .2s linear;
        }
      }
      span {
        color: #515a6e;
      }
    }
  }
}
</style>
