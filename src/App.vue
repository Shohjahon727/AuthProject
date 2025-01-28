<template>
  <div class="container">
    <Navbar />
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import { Navbar } from '@/components';
export default{
  components: {
    Navbar
  },
  watch: {
    $route(to) {
      
      document.title = to.meta.title || 'Default Title';
    }
  }
}
</script>