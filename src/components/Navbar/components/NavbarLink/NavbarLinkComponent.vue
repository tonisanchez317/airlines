<script>
export default {
  name: 'NavbarLinkComponent',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <li class="nav-item active">
    <RouterLink
      :to="{ name }"
      class="nav-link"
    >
      <slot />
    </RouterLink>
  </li>
</template>
