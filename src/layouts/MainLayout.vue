<script>
import NavbarComponent from '@/components/Navbar/NavbarComponent.vue';

export default {
  name: 'MainLayout',

  components: {
    NavbarComponent,
  },
};
</script>
<template>
  <div class="d-flex flex-column min-vh-100">
    <NavbarComponent />
    <main class="flex-grow-1">
      <slot />
    </main>
  </div>
</template>
