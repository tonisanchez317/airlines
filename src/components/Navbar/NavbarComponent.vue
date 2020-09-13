<script>
import ROUTES from '@/router/routes';
import NavbarLinkComponent from './components/NavbarLink/NavbarLinkComponent.vue';
import LogoComponent from './components/Logo/LogoComponent.vue';

export default {
  name: 'NavbarComponent',

  components: {
    NavbarLinkComponent,
    LogoComponent,
  },

  created() {
    this.ROUTES = ROUTES;
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light w-100 bg-light">
    <NavbarLinkComponent
      :name="ROUTES.list"
      class="navbar-brand"
    >
      <LogoComponent />
    </NavbarLinkComponent>
    <ul class="navbar-nav mr-auto">
      <NavbarLinkComponent
        :name="ROUTES.list"
      >
        List
      </NavbarLinkComponent>
    </ul>
  </nav>
</template>
