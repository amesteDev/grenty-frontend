<template>
  <div class="about">
    <h1>Det här är sidan där det ska verifieras</h1>
    <div v-if="err != null">
      <p>{{ msg }}</p>
      <p>Prova skicka en ny aktiveringslänk:</p>
      <form
        id="app"
        @submit="checkForm"
        action="https://vuejs.org/"
        method="post"
      >
        <label for="email">E-post:</label>
        <input id="email" v-model="email" type="email" name="email" />
        <button type="submit" value="Submit" class="button">Skicka</button>
      </form>
    </div>
    <p v-if="msg != null">{{msg}}</p>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      info: null,
      msg: null,
      email: null,
      err: null
    };
  },
  methods: {
    checkForm(e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];
      this.msg = null;
      this.err = null;

      if (!this.email) {
        this.errors.push("Fyll i en e-post.");
      }

      e.preventDefault();

      if (!this.errors.length) {
        axios
          .post("http://localhost:3000/user/resend", {
            email: this.email,
          })
          .then((response) => {
            (this.info = response.data), this.controlResponse();
          });
      }
    },
    controlResponse() {
      if (this.info.err != null) {
        this.err = this.info.msg;
      } else {
        this.msg = this.info.msg;
      }
    },
  },
  mounted() {
    axios
      .post("http://localhost:3000/user/activate/" + this.$route.params.id)
      .then((response) => {
        (this.info = response.data), this.controlResponse();
      });
  },
};
</script>