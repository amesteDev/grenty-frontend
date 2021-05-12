<template>
  <div>
    <h2>SÖk maskin</h2>
    <div v-if="search">
      <h2>Filtrera</h2>
      <h3>Maskintitel</h3>
      <p>Maskinbeskrivnvin</p>
      <p>Pris: 129:-/h</p>
    </div>
    <div v-else>
      <p>
        Välj först vilken län du vill söka i, sedan vilken kommun i det länet
      </p>
      <div v-if="error">
        <p>{{ error }}</p>
      </div>
      <form id="app" @submit="checkForm" method="post">
        <select
          name="county"
          id="county"
          v-model="county"
          @change="selectLan()"
        >
          <option v-for="lans in lan" :key="lans.code" :value="lans.code">
            {{ lans.name }}
          </option>
        </select>
        <div v-if="selectedKommuner.length > 0">
          <select
            name="kommun"
            id="kommun"
            v-model="kommun"
            placeholder="Välj kommun..."
          >
            <option
              v-for="kommunerAttSkriva in selectedKommuner"
              :key="kommunerAttSkriva.code"
              :value="kommunerAttSkriva.name"
            >
              {{ kommunerAttSkriva.name }}
            </option>
          </select>
        </div>
        <button class="button" type="sumbit" value="submit">Sök</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lanJson from "../json/lan.json";
import kommunJson from "../json/kommun.json";

export default {
  data() {
    return {
      search: null,
      kommuner: kommunJson,
      selectedKommuner: {},
      lan: lanJson,
      county: null,
      kommun: null,
      error: null,
    };
  },
  methods: {
    checkForm(e){
      e.preventDefault();
      this.fetchInKommun();
      
    },
    fetchInKommun() {
    
      axios
        .post("http://localhost:3000/search", {
          //om tid finns bygg ut så det går att välja flera kommuner att söka på.
          kommun: this.kommun,
        })
        .then((response) => {
            this.search = response.data;
            console.log(this.search);
        });
    },
    selectLan() {
      this.selectedKommuner = this.kommuner.find(
        (kom) => kom.code == this.county
      ).kommuner;
    },
  },
};
</script>