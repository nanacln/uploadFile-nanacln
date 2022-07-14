<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/single">FORM-DATA</router-link> |
    <router-link to="/base64">base64</router-link> |
    <router-link to="/many">多文件上传</router-link> |
    <router-link to="/drag">拖拽上传</router-link> |
    <router-link to="/bigfile">大文件上传</router-link> |
  </div> -->
  <el-menu mode="horizontal" :router="true">
    <el-menu-item index="/">
      <span>Home</span>
    </el-menu-item>
    <el-menu-item index="/single">
      <span>普通上传</span>
    </el-menu-item>
    <el-menu-item index="/form">
      <span>form表单</span>
    </el-menu-item>
    <el-menu-item index="/base64">
      <span>base64</span>
    </el-menu-item>
    <el-menu-item index="/many">
      <span>多文件上传</span>
    </el-menu-item>
    <el-menu-item index="/drag">
      <span>拖拽上传</span>
    </el-menu-item>
    <el-menu-item index="/bigfile">
      <span>大文件上传</span>
    </el-menu-item>
  </el-menu>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
