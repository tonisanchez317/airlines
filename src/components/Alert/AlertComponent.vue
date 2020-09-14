<script>
import includes from 'lodash/includes';
import ALERT_TYPES from './types';

const DEFAULT_ALERT_TYPE = ALERT_TYPES.primary;

export default {
  name: 'AlertComponent',

  props: {
    type: {
      type: String,
      default: DEFAULT_ALERT_TYPE,
    },
  },

  computed: {
    validType() {
      return (includes(ALERT_TYPES, this.type) && this.type) || DEFAULT_ALERT_TYPE;
    },
  },
};
</script>

<template>
  <div
    :class="`alert alert-${validType} alert-dismissible fade show`"
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
