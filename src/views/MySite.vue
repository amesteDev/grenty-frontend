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

    <div v-if="rentRequests">
      <h2>MASSA DATA HÄR</h2>
      datum, tid, maskin, status
    </div>

    <div v-else>
      <h2>Inga kommande hyror funna</h2>
  </div>
    <div class="divider"></div>
     <h4>Historik:</h4>
    <div v-if="history">
      <h2>MASSA DATA HÄR</h2>
    </div>
        <div v-else>
      <h2>Ingen historik tillgänglig</h2>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user: null,
      rentRequests: [],
      history: [],
    };
  },
  methods: {
    fetchMyRents() {
      axios.get("http://localhost:3000/renting/myrents").then((response) => {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
          if (response[i].acceptanceStatus == "requested") {
            rentRequests.push(response[i]);
          }
          else{
            history.push(reponse[i]);
          }
        }
      });
    },
  },
  mounted() {
    this.user = localStorage.user();
    fetchMyrents();
  },
};
</script>