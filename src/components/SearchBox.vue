<template>
  <div>
    <h2>SÖk maskin</h2>
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
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
      <h3>Sortera din sökning</h3>
      <select name="filtertype" id="filtertype" v-model="filtertype">
        <option value="price">Pris</option>
        <option value="distance">Avstånd</option></select
      ><br />

      <div
        class="search-hit"
        v-for="maskin in filteredList"
        :key="maskin._id"
        :value="maskin._id"
      >
        <router-link :to="'/info/' + maskin._id + '/' + maskin.owner">
          <h3>Titel: {{ maskin.machineName }}</h3>
          <p>Beskrivning: {{ maskin.description }}</p>
          <p>Pris: {{ maskin.price }}</p>
          <p>Finns i: {{ maskin.city }}</p>
        </router-link>
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
      filtertype: "price",
    };
  },
  methods: {
    checkForm(e) {
      e.preventDefault();
      this.fetchInKommun();
    },
    fetchInKommun() {
      axios
        .post(
          "http://localhost:3000/search",
          {
            kommun: "Gävle",
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          if (!response.data.err) {
            this.search = response.data;
            this.calculateDistance(response.data);
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
    calculateDistance(inpList) {
      console.log(inpList);
      for (let i = 0; i < inpList.length; i++) {

        let lat1 = inpList[i].latitude;
        let lat2 = localStorage.latitude;
        let lon1 = inpList[i].longitude;
        let lon2 = localStorage.longitude;
        var R = 6371;
        var dLat = this.deg2rad(lat2 - lat1);
        var dLon = this.deg2rad(lon2 - lon1);
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        inpList[i].distance = d;
      }
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
  },
  computed: {
    filteredList() {
      let rtnList;
      //SKRIV OM DET HÄR OCKSÅ; DET BEHÖVS INTE SÅ MYCKET KONSTIG KOD NU.
      if (!this.checkedMachines.length) {
        rtnList = this.search.filter((element) =>
          this.checkedCitys.includes(element.city)
        );
      } else {
        rtnList = this.search
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
      }
      if (this.filtertype == "price") {
        return rtnList.sort((a, b) => a.price - b.price);
      }
      if (this.filtertype == "distance") {
        return rtnList.sort((a, b) => a.distance - b.distance);
      }
      return rtnList;
    },
  },
};
</script>

<style scoped>
.search-hit {
  width: 20%;
  margin: auto;
}
</style>