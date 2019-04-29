<template>
  <div id="app">
    <img alt="TensorFlow logo" src="./assets/logo.png">
    <Iris msg="TensorFlow in Vue" />
  </div>
</template>

<script>
import Iris from './components/Iris.vue'

export default {
  name: 'app',
  components: {
    Iris
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

