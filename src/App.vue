<template>
  <div id="app">
    <router-view class="app-content" />
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100%;
  .app-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>
