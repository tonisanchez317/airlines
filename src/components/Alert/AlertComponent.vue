<script>
export default {
  name: 'AlertComponent',

  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<template>
  <div
    :class="`alert alert-${type} alert-dismissible fade show`"
    role="alert"
  >
    <slot />
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="$emit('on-close')"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
