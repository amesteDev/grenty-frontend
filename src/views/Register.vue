<template>
  <div>
    <div v-if="!success">

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
        <label for="email">E-post:</label><br />
        <input id="email" v-model="email" type="email" name="email">
    </p>
    <p>
        <label for="password">Lösenord</label><br />
        <input id="password" v-model="password" type="password" name="password"><br/>
        Lösenordet behöver innehålla:<br />
        <span :class="pw_length ? 'required' : '' ">minst åtta tecken</span><br />
        <span :class="pw_uppercase ? 'required' : '' ">minst en stor bokstav</span><br />
        <span :class="pw_lowercase ? 'required' : '' ">minst en liten bosktav</span><br />
        <span :class="pw_number ? 'required' : '' ">minst en siffra</span><br />
    </p>
    
    <p>
        <label for="name">Namn:</label><br />
        <input id="name" v-model="name" type="text" name="name">
    </p>
    <p>
        <label for="adress">Adress:</label><br />
        <input id="adress" v-model="adress" type="text" name="adress">
    </p>

        <p>
        <label for="zip">Postnummer:</label><br />
        <input id="zip" v-model="zip" type="zip" name="zip">
    </p>
    <p>
              <label for="county">Län:</label><br />
        <select
          name="county"
          id="county"
        
          v-model="county"
          @change="selectLan()"
        >
          <option v-for="lans in lanLista" :key="lans.code" :value="lans.code">
            {{ lans.name }}
          </option>
        </select>
    </p>

 <div v-if="selectedKommuner.length > 0">
     <label for="kommun">Kommun:</label><br />
          <select
            name="kommun"
            id="kommun"
          
            v-model="kommun"
            placeholder="Välj kommun..."
          >
            <option
              v-for="kommunerAttSkriva in selectedKommuner"
              :key="kommunerAttSkriva.code"
              :value="kommunerAttSkriva.name"
            >
              {{ kommunerAttSkriva.name }}
            </option>
          </select>
           
 </div>
   

            <p>
        <label for="city">Stad:</label><br />
        <input id="city" v-model="city" type="text" name="city">
    </p><br />
    <label for="agree">  <input type="checkbox" id="agree" name="agree"> Jag godkänner att mina personuppgifter hanteras enligt GDPR och <router-link to="/gdpr">integritetspolicy</router-link>   </label><br />
    



      <button type="submit" value="Submit" class="button">Registrera!</button>
    </form>
    </div>
    <div v-if="success">
      <h2>Registrering lyckad</h2>
      <p>Avvakta några minuter och kontrollera sedan din e-post för att verifiera ditt användarkonto. Kolla även i skräpposten.</p>
      <p>Kommer inget mejl med information om verifiering? Prova att begära en ny länk på den här sidan:<router-link to="/verify">skicka ny länk</router-link> </p>
      </div>
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
      kommuner: kommunJson,
      selectedKommuner: {},
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
      success: false,
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
    checkForm(e) {
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
    selectLan() {
      this.selectedKommuner = this.kommuner.find(
        (kom) => kom.code == this.county
      ).kommuner;
    },
    registerUser() {
      axios
        .post("http://grenty-api.herokuapp.com/user/reg", {
          email: this.email,
          name: this.name,
          password: this.password,
          adress: this.adress,
          zip: this.zip,
          city: this.city,
          username: "okok",
        })
        .then((response) => {
          this.info = response.data;
          if (response.data.err) {
            this.errors.push(response.data.msg);
          } else {
            this.success = true;
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.required {
  text-decoration: line-through;
}
</style>
