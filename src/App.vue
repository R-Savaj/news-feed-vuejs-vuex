<template>
  <div class="container">
      <div class="row">
        <div class="col">
          <Navbar/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <router-view/>
        </div>
      </div>
    </div>
</template>
<script>
import Navbar from '@/components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
