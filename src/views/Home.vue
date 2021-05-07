<template>
  <div class="home">
    <div v-if="loggedin">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link><br />
        <router-link to="/machine">Machine</router-link><br />
      </div>
      <SearchBox />
    </div>
    <div v-else>
      <LoginBox />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginBox from "@/components/LoginBox.vue";
import SearchBox from "@/components/SearchBox.vue";

export default {
  name: "Home",
  data() {
    return {
      loggedin: false,
    };
  },
  components: {
    LoginBox,
    SearchBox,
  },
  methods: {
    checkLogin() {
      this.logeding = false;
      if (localStorage.token == "undefined" || !localStorage.token) {
        this.loggedin = false;
      } else {
        this.loggedin = true;
      }
    },
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
