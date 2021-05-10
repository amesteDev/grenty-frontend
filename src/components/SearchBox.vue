<template>
  <div>
    <h2>SÖk maskin</h2>
    <p>Välj först vilken län du vill söka i, sedan vilken kommun i det länet</p>
    <form>
      <select name="county" id="county" v-model="county" @change="selectLan()">
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
            :value="kommunerAttSkriva.code"
          >
            {{ kommunerAttSkriva.name }}
          </option>
        </select>
      </div>
      <button class="button" type="sumbit" value="submit">Sök</button>
    </form>
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
    };
  },
  methods: {
    fetchInKommun() {
      axios
        .post("http://localhost:3000/search", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          (this.info = response.data),
            (localStorage.token = response.data.token);
          if (!response.data.err) {
            this.$router.go(0);
          } else {
            this.errors.push(response.data.msg);
          }
        });
    },
    selectLan() {
      this.selectedKommuner = this.kommuner.find(kom => kom.code == this.county).kommuner;
    },
  },
};
</script>