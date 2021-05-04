<template>
  <div id="app">
    <header class="head">
      <router-link to="/">
        <img src="./assets/logo.svg" class="logo" />
      </router-link>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link><br />
        <router-link to="/machine">Machine</router-link><br />
      </div>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
.logo {
  width: 100%;
}

.head {
  display: grid;
  grid-template-columns: 40% 60%;
}

#app {
  text-align: center;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
