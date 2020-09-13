<script>
export default {
  name: 'ReadDataComponent',

  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<template functional>
  <div>
    <div
      v-for="(field, fieldIndex) in props.fields"
      :key="`field-${fieldIndex}`"
      class="form-group d-flex align-items-center"
    >
      <label
        class="col-3 col-form-label font-weight-bold"
      >
        {{ field.label }}
      </label>
      <div class="col">
        {{ props.data[field.key] }}
      </div>
    </div>
  </div>
</template>
