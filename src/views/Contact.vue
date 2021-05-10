<template>
  <div class="about">
    <form>
      <label for="name">Namn</label>
      <input id="name" v-model="name" type="text" name="name" />
      <label for="email">E-post:</label>
      <input id="email" v-model="email" type="email" name="email" />
      <label for="msg">Meddelande</label>
      <textarea id="msg" v-model="msg" name="msg"></textarea>
      <button class="button" type="submit"></button>
    </form>
    <h1>KOntakformulär och grejjer.</h1>
    <h2>KOM IHÅG GDPR_RUTA HÄR OCKSÅ</h2>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      info: null,
      errors: [],
      msg: null,
      name: null,
      mail: null,
    };
  },
  methods: {
    sendContactMail() {
      axios.post(
        "http://localhost:3000/contactmail",
        {
          name: this.name,
          mail: this.mail,
          msg: this.msg
        },
      );
    },
  },
};
</script>