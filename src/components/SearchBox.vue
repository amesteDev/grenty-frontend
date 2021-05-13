<template>
  <div>
    <h2>SÖk maskin</h2>
    <div v-if="error">
      <p>{{ error }}</p></div>
    <div v-if="search">
      <div class="filterbox">
        <h2>Filtrera sökresultat:</h2>
      </div>
      <h3>Filtrera på ort:</h3>
      <div v-for="stad in citys" :key="stad">
        {{ stad }}
        <input type="checkbox" v-model="checkedCitys" v-bind:value="stad" />
      </div>

      <h3>Filtrera på maskintyp:</h3>

      <div v-for="maskinTyp in machineTypes" :key="maskinTyp">
        <input
          type="checkbox"
          v-model="checkedMachines"
          v-bind:value="maskinTyp"
        />{{ maskinTyp }}
      </div>

      <div class="search-hit" v-for="maskin in filteredList" :key="maskin._id" :value="maskin._id">
        <div v-for="msk in maskin.machines" :key="msk._id" :value="msk._id">
          <router-link :to="'/info/' + maskin._id + '/' + msk._id">
            <h3>Titel: {{ msk.machineName }}</h3>
            <p>Beskrivning: {{ msk.description }}</p>
            <p>Pris: {{ msk.price }}</p>
            <p>Finns i: {{ maskin.city }}</p>
          </router-link>
        </div>
      </div>
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
      citys: [],
      machineTypes: [],
      checkedMachines: [],
      checkedCitys: [],
  
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      this.fetchInKommun();
    },
    fetchInKommun() {
      axios
        .post("http://localhost:3000/search", 
          {
            kommun: this.kommun,
          },
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.token,
            },
          })
        .then((response) => {
          console.log(response.data)
          if(!response.data.err){
          this.search = response.data;
          this.filterGeneration();
          } else {
            this.error = response.data.msg;
          }
        });
    },
    filterGeneration() {
      for (const item of Object.entries(this.search)) {
        if (!this.citys.includes(item[1].city)) {
          this.citys.push(item[1].city);
          this.checkedCitys.push(item[1].city);
        }
        for (const machine in item[1].machines) {
          if (
            !this.machineTypes.includes(item[1].machines[machine].machineName)
          ) {
            this.machineTypes.push(item[1].machines[machine].machineName);
          }
        }
      }
      this.filteredSearch = this.search;
    },
    selectLan() {
      this.selectedKommuner = this.kommuner.find(
        (kom) => kom.code == this.county
      ).kommuner;
    },
  },
  computed: {
    filteredList() {
      if (!this.checkedMachines.length) {
        return this.search.filter((element) =>
          this.checkedCitys.includes(element.city)
        );
      }

      return this.search
        .filter((element) =>
          element.machines.some(
            (maskin) =>
              this.checkedMachines.includes(maskin.machineName) &&
              this.checkedCitys.includes(element.city)
          )
        )
        .map((element) => {
          let newElt = Object.assign({}, element); // copies element
          newElt.machines = newElt.machines.filter((maskin) =>
            this.checkedMachines.includes(maskin.machineName)
          );
          return newElt;
        });
    },
  },
};
</script>

<style scoped>
.search-hit{
  width: 20%;
  margin: auto;
}
</style>