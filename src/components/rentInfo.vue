<template>
<div>
  <div>
    <h2>Skicka förfrågan om att hyra maskin</h2>
  </div>
  <div v-if="machine">
    <h3>{{ machine.machineName }}</h3>
    <p>{{ machine.description }}</p>
    <p>{{ machine.price }}/h</p>
 
    <p>Välj datum du vill hyra:</p>
    <input type="date"><br />
    <button class="button">Skicka förfrågan om hyra</button>
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
