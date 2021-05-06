<template>
  <div>
    <form>
      <label for="email">E-post:</label><br />
      <input type="email" name="email" id="email" /><br />
      <label for="password">Lösenord:</label><br />
      <input type="password" name="password" id="password" /><br />
      <button type="submit" class="button">Login</button>
    </form>
    <p>Inget konto?</p><router-link to="register">Registrera här!</router-link>
  </div>
</template>


<script>
export default {
  name: "LoginBox",
  props: {
    msg: String,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>
