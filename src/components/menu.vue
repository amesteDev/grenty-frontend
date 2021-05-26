<template>
  <nav>
    <button class="menu-btn" @click="menuOpen = !menuOpen">
      <MenuIcon v-if="!menuOpen" :size="48" />
      <XIcon v-if="menuOpen" :size="48" />
    </button>
    <ul class="menu" :class="{ showNav: menuOpen }">
      <li class="nav-item">
        <router-link class="menu-link" to="/">Hem</router-link>
      </li>
      <li class="nav-item">
        <router-link class="menu-link" to="/about">Om grenty</router-link>
      </li>
      <li class="nav-item">
        <router-link class="menu-link" to="/search">Sök maskin</router-link>
      </li>
      <li class="nav-item">
        <router-link class="menu-link" to="/machine">Mina maskiner</router-link>
      </li>
      <li class="nav-item">
        <a class="menu-link" @click="logout()">Logga ut</a>
      </li>
    </ul>
  </nav>
</template>
 

<script>
import MenuIcon from "vue-material-design-icons/Menu.vue";
import XIcon from "vue-material-design-icons/Close.vue";

export default {
  components: {
    MenuIcon,
    XIcon,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go('/');
    },
  },
  watch: {
    $route() {
      this.menuOpen = false;
    },
  },
};
</script>