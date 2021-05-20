<template>
  <nav>
    <button class="menu-btn" @click="menuOpen = !menuOpen">
      <MenuIcon v-if="!menuOpen" :size="48" />
      <XIcon v-if="menuOpen" :size="48" />
    </button>
    <ul class="menu" :class="{ showNav: menuOpen }">
      <li class="nav-item">
        <router-link class="menu-link" to="/" @click="menuOpen = false"
          >Home</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="menu-link" to="/about" @click="menuOpen = false"
          >About</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="menu-link" to="/machine" @click="menuOpen = false"
          >Machine</router-link
        >
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
  watch: {
    $route() {
      this.menuOpen = false;
    },
  },
};
</script>