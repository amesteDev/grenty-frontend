<template>
<div>
  <h3>kram</h3>
      <div v-if="msg">
      <p>{{msg}}</p>
    </div>
    <div v-else>
  <form
    id="app"
    @submit="checkForm"
    action="https://vuejs.org/"
    method="post"
  >

    <p v-if="errors.length">
      <b>Du måste fylla i formuläret enligt nedan:</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error.idx">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Namn</label>
      <input
        id="name"
        v-model="name"
        type="text"
        name="name"
      >
    </p>

    <p>
      <label for="price">Pris</label>
      <input
        id="price"
        v-model="price"
        type="number"
        name="price"
        min="0"
      >
    </p>

    <p>
      <label for="description">Beskrivning:</label>
      <textarea
        id="description"
        v-model="description"
        name="description"
      ></textarea>
    </p>

    <p>
      <button
        type="submit"
        value="Submit"
        class="button"
      >Lägg till</button>
    </p>

  </form>
</div>

</div>
</template>


<script>
import axios from "axios";

export default {
  name: "AddMachine",
  data() {
    return {
      errors: [],
      description: null,
      name: null,
      price: null,
      msg: null,
    };
  },
  methods: {
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Fyll i ett namn.");
      }
      if (!this.price) {
        this.errors.push("Ange ett pris på maskinen.");
      }

      e.preventDefault();

      if (!this.errors.length) {
        this.addMachine();
      }
    },
    async addMachine() {
      axios
        .post(
          "https://grenty-api.herokuapp.com/machine/add",
          {
            machineName: this.name,
            price: this.price,
            description: this.description,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.info = response.data;
          if (!response.data.err) {
            this.msg = response.msg;
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
