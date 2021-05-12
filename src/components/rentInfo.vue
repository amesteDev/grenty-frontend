<template>
<div>
  <div>
    <h2>Kram</h2>
  </div>
  <div>
    <h3>{{ machine.machineName }}</h3>
    <p>{{ machine.description }}</p>
    <p>{{ machine.price }}</p>
    <p>{{ owner }} </p>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      owner: null,
      machine: null
    };
  },
  methods: {
    async fetchMyMachines() {
      await axios
        .get(
          "http://localhost:3000/machine/checkMachine/" +
            this.$route.params.user +
            "/" +
            this.$route.params.machine,
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          this.owner = response.data.owner;
          this.machine = response.data.machine
        });
    },
  },
  mounted() {
    this.fetchMyMachines();
  },
};
</script>
