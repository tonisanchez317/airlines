<script>
import filter from 'lodash/filter';
import FIELDS from '@/constants/fields';
import ModalComponent from '@/components/Modal/ModalComponent.vue';
import FormDataComponent from '@/components/FormData/FormDataComponent.vue';
import ReadDataComponent from '@/components/ReadData/ReadDataComponent.vue';

export default {
  name: 'DataModalComponent',

  components: {
    FormDataComponent,
    ModalComponent,
    ReadDataComponent,
  },

  props: {
    data: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      state: {
        ...(this.data ? this.data : {}),
      },
      buttons: [],
      isConfirming: false,
    };
  },

  computed: {
    fields() {
      return filter(FIELDS, field => this.state[field.key]);
    },

    isEditing() {
      return !!this.data;
    },

    actionButtons() {
      return [
        {
          label: 'Close',
          method: () => this.closeModal(),
        },
        {
          label: this.isEditing ? 'Update' : 'Add',
          type: 'primary',
          method: () => {
            this.isConfirming = true;
          },
        },
      ];
    },

    confirmActionButtons() {
      return [
        {
          label: 'Cancel',
          method: () => {
            this.isConfirming = false;
          },
        },
        {
          label: 'Confirm',
          type: 'primary',
          method: () => this.$emit(this.isEditing ? 'update-row' : 'add-row', this.state),
        },
      ];
    },

    title() {
      if (this.isConfirming && this.isEditing) {
        return 'Do you want to update the item?';
      }

      if (!this.isConfirming && this.isEditing) {
        return 'Update item';
      }

      if (this.isConfirming && !this.isEditing) {
        return 'Do you want to add the item?';
      }

      if (!this.isConfirming && !this.isEditing) {
        return 'Add item';
      }

      return '';
    },
  },

  beforeMount() {
    this.buttons = [
      {
        label: 'Close',
        method: () => this.closeModal(),
      },
      {
        label: this.isEditing ? 'Update' : 'Add',
        type: 'primary',
        method: () => this.$emit(this.isEditing ? 'update-row' : 'add-row', this.state),
      },
    ];
  },

  methods: {
    closeModal() {
      this.$emit('on-click-close');
    },
  },
};
</script>

<template>
  <ModalComponent
    :title="title"
    :buttons="isConfirming ? confirmActionButtons : actionButtons"
    show
    @on-click-close="closeModal"
  >
    <ReadDataComponent
      v-if="isConfirming"
      :fields="fields"
      :data="state"
    />
    <FormDataComponent
      v-else
      v-model="state"
    />
  </ModalComponent>
</template>
