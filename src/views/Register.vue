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
        <input id="password" v-model="password" type="password" name="password"><br/>
        Lösenordet behöver innehålla:<br />
        <span :class="pw_length ? 'required' : '' ">minst åtta tecken</span><br />
        <span :class="pw_uppercase ? 'required' : '' ">minst en stor bokstav</span><br />
        <span :class="pw_lowercase ? 'required' : '' ">minst en liten bosktav</span><br />
        <span :class="pw_number ? 'required' : '' ">minst en siffra</span><br />
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
        <label for="lan">Stad:</label>
        <input id="lan" v-model="lan" type="text" name="lan">
    </p>
                <p>
        <label for="kommun">Stad:</label>
        <input id="kommun" v-model="kommun" type="text" name="kommun">
    </p>

            <p>
        <label for="city">Stad:</label>
        <input id="city" v-model="city" type="text" name="city">
    </p>
    <label for="agree">Jag godkänner att mina personuppgifter hanteras enligt GDPR och <router-link to="/gdpr">integritetspolicy</router-link> </label>
    
    <input type="checkbox" id="agree" name="agree">


      <button type="submit" value="Submit" class="button">Registrera!</button>
    </form>

  </div>
</template>


<script>
import axios from "axios";
import lanJson from "../json/lan.json";
import kommunJson from "../json/kommun.json";

export default {
  data() {
    return {
      lanLista: lanJson,
      kommunLista: kommunJson,
      name: null,
      password: null,
      adress: null,
      zip: null,
      city: null,
      username: null,
      lan: null,
      kommun: null,
      errors: [],
      pw_number: false,
      pw_length: false,
      pw_lowercase: false,
      pw_uppercase: false,
    };
  },
  watch: {
    password() {
      this.pw_length = this.password.length > 8;
      this.pw_number = /\d/.test(this.password);
      this.pw_lowercase = /[a-z]/.test(this.password);
      this.pw_uppercase = /[A-Z]/.test(this.password);
    },
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
      if (!this.password) {
        this.errors.push("Fyll i ett lösenord.");
      }
      if (!this.name) {
        this.errors.push("Fyll i ditt namn");
      }
      if (!this.adress) {
        this.errors.push("Fyll i din adress.");
      }
      if (!this.zip) {
        this.errors.push("Fyll i ditt postnummer.");
      }
      if (!this.city) {
        this.errors.push("Fyll i din ort.");
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
        .post("http://localhost:3000/user/reg", {
          email: this.email,
          name: this.name,
          password: this.password,
          adress: this.adress,
          zip: this.zip,
          city: this.city,
          username: "okok",
        })
        .then((response) => (this.info = response.data));
    },
  },
};
</script>

<style scoped lang="scss">
.required {
  text-decoration: line-through;
}
</style>
