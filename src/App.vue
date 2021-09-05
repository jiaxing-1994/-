<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
  /*overflow: hidden;*/
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*font-family: 'pg'!important;*/
  height: 100%;
}
:root{
  --van-nav-bar-icon-color: #333!important;
}
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
