<template>
  <div class="about">
    <h1>Det här är sidan där det ska verifieras</h1>
    <p>{{ info }}</p>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      info: null,
    };
  },
  mounted() {
    axios
      .post("http://localhost:3000/user/activate/" + this.$route.params.id)
      .then((response) => (this.info = response.data));
  },
};
</script>