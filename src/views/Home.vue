<template>
  <div class="home">
    <LoginBox msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginBox from '@/components/LoginBox.vue';

export default {
  name: 'Home',
  components: {
    LoginBox
  }
}
</script>
