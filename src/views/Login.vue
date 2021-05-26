<template>
  <div>
    <form
      id="app"
      @submit="checkForm"
      method="post"
    >
     <p v-if="errors.length">
      <b>Du måste fylla i formuläret enligt nedan:</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error.idx">{{ error }}</li>
      </ul>
    </p>
    <p>
        <label for="email">E-post</label><br />
        <input id="email" v-model="email" type="email" name="email">
    </p>
    <p>
        <label for="password">Lösenord</label><br />
        <input id="password" v-model="password" type="password" name="password">
    </p>
      <button  type="submit" value="Submit" class="button">Login</button>
    </form>
    <p>Inget konto?</p>
    <router-link to="register">Registrera här!</router-link>
    <br />
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "LoginBox",
  props: {
    msg: String,
  },
  data() {
    return {
      password: null,
      email: null,
      errors: [],
      info: null,
    };
  },

  methods: {
    checkForm(e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.email) {
        this.errors.push("Fyll i en e-post.");
      }

      if (!this.password) {
        this.errors.push("Ange ditt lösenord.");
      }

      e.preventDefault();

      if (!this.errors.length) {
        this.login();
      }
    },
    login() {
      axios
        .post("https://grenty-api.herokuapp.com/user/login", {
          username: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.token = response.data.token;
          localStorage.longitude = response.data.user.longitude;
          localStorage.latitude = response.data.user.latitude;
 
          if (!response.data.err) {
            this.$router.go('/home');
          } else {
            this.errors.push(response.data.msg);
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
