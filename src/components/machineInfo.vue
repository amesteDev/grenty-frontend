<template><div>
    <div v-for="machine in info" v-bind:key="machine.idx" class="single-machine">
      <h3>{{ machine.machineName }}</h3>
      <p>{{ machine.description }}</p>
      <p>{{ machine.price }}</p>
          <router-link :to="'/machine/edit/' + machine._id"  ><br /> <button class="button">Redigera</button></router-link>
      <div class="divider"></div>
    </div></div>
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
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxMmYwODNhZWE2NDJiOWM3YzQxYTUiLCJuYW1lIjoicsO2diIsImV4cCI6MTYyNDkwMTY0Ny44NTUsImlhdCI6MTYxOTcxNzY0N30.msQa3ktAw7vZ7cIi-W0_4_gKMIJuSXVtcT6tjvTQ6X8'
          },
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
