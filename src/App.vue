<template>
  <div class="container p-5 bg-white mx-auto">

    <h1 class="text-xl font-bold mx-auto block text-center">Sourdough Hydration Calculator</h1>
    <Sourdough msg="Welcome to Your Vue.js App"/>

  </div>
</template>

<script>
import Sourdough from './components/Sourdough'
export default {

  name: 'App',
  data() {
    return {
    }
  },
  components: {
    Sourdough,
  }
}
</script>

<style>
#app {

}
</style>
