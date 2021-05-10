<template>
  <div>
    <h2>SÖk maskin</h2>
    <p>Välj först vilken län du vill söka i, sedan vilken kommun i det länet</p>
    <form>
    <select
      name="county"
      id="county"
      v-model="county"
      placeholder="Välj län..."
    >
      <option value="Gävleborg">Gävleborg</option>
      <option value="Dalarna">Dalarna</option>
    </select>
    <select
      name="kommun"
      id="kommun"
      v-model="kommun"
      placeholder="Välj kommun..."
    >
      <option value="Gävle">Gävle</option>
      <option value="Mora">Mora</option>
    </select>
    <button class="button" type="sumbit" value="submit">Sök</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      search: null,
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
    }
  }
};
</script>