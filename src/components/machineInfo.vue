<template>
  <div>
    <div
      v-for="machine in info"
      v-bind:key="machine.idx"
      class="single-machine"
    >
      <h3>{{ machine.machineName }}</h3>
      <p>{{ machine.description }}</p>
      <p>{{ machine.price }}</p>
      <router-link :to="'/machine/edit/' + machine._id"
        ><br />
        <button class="button">Redigera</button></router-link
      >
      <button @click="deleteMachine()" class="button">Ta bort</button>
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
        .get("http://localhost:3000/machine/info/", {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => (this.info = response.data));
    },
    async deleteMachine(){
      axios
      .post("http://localhost:3000/machine/delete", {
                  headers: {
            Authorization: "Bearer " + localStorage.token,
          },
      })
    },
  },
  mounted() {
    this.fetchMyMachines();
  },
};
</script>

<style lang="sass" scoped>
</style>