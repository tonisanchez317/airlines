<script>
import MainLayout from '@/layouts/MainLayout.vue';

export default {
  name: 'App',
  components: {
    MainLayout,
  },
};
</script>

<template>
  <MainLayout id="app">
    <router-view />
  </MainLayout>
</template>

<style lang="scss">
@import "@/assets/scss/styles.scss";
</style>
