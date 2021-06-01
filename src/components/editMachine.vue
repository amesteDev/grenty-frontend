<template>
  <div>
    <div v-if="msg">
      <h3>{{ msg }}</h3>
    </div>
    <div v-else>
      <h2>Ändra din maskin:</h2>
      <form @submit="checkForm">
        <input
          v-model="name"
          type="text"
          class="form-control"
          required
          autofocus
        />
        <input v-model="price" type="number" required />
        <textarea v-model="description"></textarea>
        <button class="button" type="submit">Spara</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      info: null,
      name: null,
      price: null,
      description: null,
      msg: null,
    };
  },
  methods: {
    async fetchMyMachines() {
      axios
        .get(
          "https://grenty-api.herokuapp.com/machine/info/" +
            this.$route.params.id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.name = response.data.machineName;
          this.price = response.data.price;
          this.description = response.data.description;
          this.info = response.data;
        });
    },
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
        this.updateMachine();
      }
    },
    async updateMachine() {
      axios
        .put(
          "https://grenty-api.herokuapp.com/machine/update",
          {
            machineName: this.name,
            price: this.price,
            description: this.description,
            _id: this.$route.params.id,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          if (!response.data.err) {
            this.msg = "Lagring ok";
          }
        });
    },
  },
  mounted() {
    this.fetchMyMachines();
  },
};
</script>

<style scoped lang="scss">
</style>