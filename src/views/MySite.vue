<template>
  <div class="about">
    <div class="greeting">
      <h2>Välkommen {{ user.name }}</h2>
      <p>Adress: {{ user.adress }}</p>
      <p>Postort: {{ user.city }}</p>
    </div>

    <div class="divider"></div>
    <button class="button">Redigera profil</button>
    <button class="button">Mina maskiner</button>
    <div class="divider"></div>
    <h4>Hyresförfrågningar:</h4>

    <div v-for="rentR in rentRequests" :key="rentR._id">
      {{ rentR }}
      <h2>MASSA DATA HÄR</h2>
      datum, tid, maskin, status ÖPPNA
      <p>Datum: </p>
    </div>

    <div v-if="!rentRequests">
      <h2>Inga kommande hyror funna</h2>
  </div>

    <div class="divider"></div>
     <h4>Historik:</h4>
    <div v-for="rentH in history" :key="rentH._id">
      <h2>MASSA DATA HÄR</h2>
      {{rentH}}
    </div>
        <div >
      <h2>Ingen historik tillgänglig</h2>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user: null,
      rents: [],
    };
  },
  methods: {
    fetchMyRents() {
      axios.get("http://localhost:3000/renting/myrents").then((response) => {
        console.log(response);
        this.rents = response;
      });
    },
  },
  mounted() {
    this.user = localStorage.user();
    fetchMyrents();
  },
  computed: {
    rentRequests: function () {
      return this.rents.filter(
        (element) => element.acceptanceStatus == "requested"
      );
    },
    history: function () {
      return this.rents.filter(
        (element) => element.acceptanceStatus != "requested"
      );
    },
  },
};
</script>