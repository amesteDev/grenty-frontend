<template>
  <div>
    <h2>EDIT MACHINE</h2>
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
      info: null,
      name: null,
      price: null,
      description: null,
    };
  },
  methods: {
    async fetchMyMachines() {
      axios
        .get("http://localhost:3000/machine/info/" + this.$route.params.id, {
          headers: {
            Authorization:
              "Bearer " + localStorage.token,
          },
          email: "info@ameste.se",
          password: "password",
          user: "60812f083aea642b9c7c41a5",
        })
        .then((response) => {
          this.name = response.data.machineName;
          this.price = response.data.price;
          this.description = response.data.description;
          this.info = response.data;
          if(response.status == 200){
            console.log("Lagring ok");
          }
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
      axios.put(
        "https://grenty-api.herokuapp.com/machine/update",
        {
          machineName: this.name,
          price: this.price,
          description: this.description,
          _id: this.$route.params.id
        },
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.token,
          },
        }
      );
    },
  },
  mounted() {
    this.fetchMyMachines();
  },
};
</script>

<style scoped lang="scss">
</style>
