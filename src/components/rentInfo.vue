<template>
  <div>
    <div>
      <h2>Skicka förfrågan om att hyra maskin</h2>
    </div>
    <div v-if="msg">
      <p>{{msg}}</p>
    </div>
    <div v-else>
    <div v-if="machine">
      <h3>{{ machine.machineName }}</h3>
      <p>{{ machine.description }}</p>
      <p>{{ machine.price }}/h</p>
<form @submit="sendRequest">
      <p>Välj datum du vill hyra:</p>
      <input type="date" v-model="date" name="date" /><br />
      <button type="submit" value="Submit" class="button">Skicka förfrågan om hyra</button>
      </form>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      owner: null,
      machine: null,
      date: null,
      msg: null
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
          this.machine = response.data.machine;
        });
    },
    async sendRequest(e) {
      e.preventDefault();
      await axios.post(
        "http://localhost:3000/renting/request/send/",
        {
          rentDate: this.date,
          owner: this.owner,
          machine: this.machine._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        }
      )
      .then(response => {
        if(!response.err){
          this.msg = 'Förfrågan skickad, du kan se status på din sida'
        }
      });
    },
  },
  mounted() {
    this.fetchMyMachines();
  },
};
</script>
