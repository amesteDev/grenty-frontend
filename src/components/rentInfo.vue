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
      <p>Välj datum du vill hyra: (Vill du hyra bara en dag så välj samma start och slutdatum</p>
      <input type="date" v-model="startdate" name="startdate" /><br />
      <input type="date" v-model="enddate" name="enddate" /><br />
      <p>Välj starttid:</p><input type="time" v-model="starttime" name="starttime" />
      <p>Välj sluttid:</p><input type="time" v-model="endtime" name="endtime" />
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
      startdate: null,
      enddate: null,
      msg: null,
      starttime: null,
      endtime: null
    };
  },
  methods: {
    async fetchMyMachines() {
      await axios
        .get(
          "https://grenty-api.herokuapp.com/machine/check/" +
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
        "https://grenty-api.herokuapp.com/renting/request/send/",
        {
          startDate: this.startdate,
          endDate: this.enddate,
          startTime: this.starttime,
          endTime: this.endTime,
          owner: this.owner,
          machine: this.machine._id
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
