<template>
  <div id="app">
    <header class="head">
      <router-link to="/">
        <img src="./assets/logo.svg" class="logo" />
      </router-link>
    </header>
    <router-view />
    <footer>
      <p>grenty.se - &copy; 2021 - Morgan Andersson</p>
      <router-link to="/about">Om tjänsten</router-link>
      <router-link to="/gdpr">GDPR</router-link>
      <router-link to="/contact">Kontakt</router-link>
      </footer>
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
