<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style lang="scss">
  body{
    margin: 0px;
    padding: 0px;
    background-color: #f2f5f6;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    width: 100vw;
    height:100vh;

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
