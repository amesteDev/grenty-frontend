<template>
  <div class="about">
    <h1>Kontaktformulär:</h1>
    <form>
      <p>
        <label for="name">Namn</label><br />
        <input id="name" v-model="name" type="text" name="name" />
      </p>

      <p>
        <label for="email">E-post:</label><br />
        <input id="email" v-model="email" type="email" name="email" />
      </p>
      <p>
        <label for="msg">Meddelande</label><br />
        <textarea id="msg" v-model="msg" name="msg"></textarea>
      </p><br/>
     <label for="accept"><input type="checkbox" id="accept" name="accept"> Acceptera integritetspolicy</label><br />
      <button class="button" type="submit">Skicka</button>
    </form>

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
      axios.post("https://grenty-api.herokuapp.com/contactmail", {
        name: this.name,
        mail: this.mail,
        msg: this.msg,
      });
    },
  },
};
</script>


<style scoped>
#msg{
  resize: none;
  height: 5em;
  width: 20em;
}
#accept{
  text-align: center;
  margin: auto;
}
</style>