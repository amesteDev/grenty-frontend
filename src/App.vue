<template>
  <div id="app">
    <header class="head">
      <router-link to="/">
        <img src="./assets/logo.svg" class="logo" />
      </router-link>
    </header>
    <div id="nav">
      <NavMenu />
    </div>

    <router-view />
    
    <footer>
      <p>grenty.se - &copy; 2021 - Morgan Andersson</p>
      <router-link to="/about">Om tjänsten</router-link>
      <router-link to="/gdpr">GDPR</router-link>
      <router-link to="/contact">Kontakt</router-link>
    </footer>
  </div>
</template>

<script>
import NavMenu from "@/components/menu.vue";
export default {
  components: {
    NavMenu,
  }
};
</script>

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
  margin-bottom: 100px;
}
</style>
