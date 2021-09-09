<template>
  <div>
    <navbar></navbar>
    <div class="container mt-5">
      <div class="d-flex justify-content-center">
        <nuxt-logo></nuxt-logo>
      </div>
    </div>
    <h2 class="text-secondary mt-4 text-center">Kingdom Vision</h2>
  </div>
</template>

<script>
import navbar from '../components/Navbar';
import NuxtLogo from '../components/NuxtLogo.vue';

export default {
  middleware: ['guest'],
  components: {
    navbar
  },
}
</script>
