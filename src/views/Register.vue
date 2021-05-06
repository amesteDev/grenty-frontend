<template>
  <div>
    <form     id="app"
    @submit="checkForm"
    action="https://vuejs.org/"
    method="post">

  <p v-if="errors.length">
      <b>Du måste fylla i formuläret enligt nedan:</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error.idx">{{ error }}</li>
      </ul>
    </p>
    <p>
        <label for="email">E-post:</label>
        <input id="email" v-model="email" type="email" name="email">
    </p>
    <p>
        <label for="password">Lösenord</label>
        <input id="password" v-model="password" type="password" name="password">
    </p>
    
    <p>
        <label for="name">Namn:</label>
        <input id="name" v-model="name" type="text" name="name">
    </p>
    <p>
        <label for="adress">Adress:</label>
        <input id="adress" v-model="adress" type="text" name="adress">
    </p>

        <p>
        <label for="zip">Postnummer:</label>
        <input id="zip" v-model="zip" type="zip" name="zip">
    </p>
            <p>
        <label for="city">Stad:</label>
        <input id="city" v-model="city" type="text" name="city">
    </p>


      <button type="submit" value="Submit" class="button">Login</button>
    </form>
    <p>Inget konto?</p>
    <router-link to="register">Registrera här!</router-link>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      name: null,
      password: null,
      adress: null,
      zip: null,
      city: null,
      email: null,
      errors: [],
    };
  },

  methods: {
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Fyll i en e-post.");
      }
      /*
      lägg in check för lösenordet här med regex
      if (!this.price) {
        this.errors.push(
          "Ange ett lösenord, det måste innehålla minst en stor bokstav och en siffra."
        );
      }*/

      e.preventDefault();

      if (!this.errors.length) {
        this.registerUser();
      }
    },

    registerUser() {
      axios
        .post(
          "http://localhost:3000/user/reg",
          {
            email: this.email,
            name: this.name,
            password: this.password,
            adress: this.adress,
            zip: this.zip,
            city: this.city,
            username: 'okok'
          }
        )
        .then((response) => (this.info = response.data));
    },
  },
};
</script>

<style scoped lang="scss">
</style>
