<template>
  <div class="kram">
    <h2>Dina maskiner</h2>
    <router-link to="/machine/add">Add</router-link><br />
    <router-link to="/machine/edit">Edit</router-link><br />
    <router-view />
  </div>
</template>


<script>
export default {
  name: "LoginBox",
  props: {
    msg: String,
  },
  data() {
    return {
      info: null,
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.single-machine {
  padding: 0.5em;
  display: grid;
  grid-template-columns: 30% 70%;
  p,
  h3,
  button {
    grid-column: 2/3;
  }
  img {
    grid-column: 1/2;
  }
  .divider {
    grid-column: 1/3;
    margin: 1em 0.5em;
  }
}
</style>
