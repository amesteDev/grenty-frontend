<template>
  <div class="kram">
    <h2>Dina maskiner</h2>

    <div v-for="machine in info" v-bind:key="machine.idx" class="single-machine">
      <h3>{{ machine.machineName }}</h3>
      <p>{{ machine.description }}</p>
      <p>{{ machine.price }}</p>
      <button class="button">Redigera</button>
      <div class="divider"></div>
    </div>
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
    };
  },
  methods: {
    async fetchMyMachines() {
      axios
        .get("http://localhost:3000/machine/info/60812f083aea642b9c7c41a5", {
          email: "info@ameste.se",
          password: "password",
          user: "60812f083aea642b9c7c41a5",
        })
        .then((response) => (this.info = response.data));
    },
  },
  mounted() {
    this.fetchMyMachines();
  },
};
</script>

<style scoped lang="scss">
.single-machine {
    padding: 0.5em;
  display: grid;
  grid-template-columns: 30% 70%;
  p,
  h3,
  button {
    grid-column: 2/3;
  }
  img {
    grid-column: 1/2;
  }
  .divider{
      grid-column: 1/3;
      margin: 1em 0.5em;
  }
}
</style>
