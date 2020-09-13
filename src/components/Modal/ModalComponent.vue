<script>
import { overflowView } from './ModalComponent';

export default {
  name: 'ModalComponent',

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default: () => [
        {
          label: 'OK',
          type: 'primary',
        },
      ],
    },
  },

  watch: {
    show(value) {
      overflowView(!value);
    },
  },

  methods: {
    close() {
      this.$emit('on-close');
    },
    onClickButton(button = {}) {
      if (button.method) {
        button.method();
        return;
      }

      this.close();
    },
  },
};
</script>
<template>
  <aside
    v-if="show"
  >
    <div class="modal-backdrop fade show" />
    <div
      class="modal d-block"
      tabindex="-1"
      role="dialog"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ title }}
            </h5>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <div class="d-flex justify-content-center w-75">
              <div
                v-for="(button, buttonIndex) in buttons"
                :key="`button-${buttonIndex}`"
                class="col text-center"
              >
                <button
                  :class="button.type ? `btn-${button.type} w-100` : ''"
                  type="button"
                  class="btn"
                  @click="onClickButton(button)"
                >
                  {{ button.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
