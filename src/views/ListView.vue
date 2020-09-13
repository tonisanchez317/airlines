<script>
import { mapActions, mapGetters } from 'vuex';
import FIELDS from '@/constants/fields';
import * as ListStore from '@/store/ListStore';
import TableComponent from '@/components/Table/TableComponent.vue';
import DataModalComponent from '@/components/Modal/DataModalComponent.vue';
import AlertComponent from '@/components/Alert/AlertComponent.vue';

export default {
  name: 'ListView',

  components: {
    AlertComponent,
    DataModalComponent,
    TableComponent,
  },

  data() {
    return {
      isDataModalShown: false,
      isRemoving: false,
      selectedItem: null,
      alert: {
        type: null,
        message: '',
      },
    };
  },

  computed: {
    ...mapGetters(ListStore.NAMESPACE, {
      list: ListStore.GETTERS.list,
      isStatus: ListStore.GETTERS.isStatus,
      errorMessage: ListStore.GETTERS.errorMessage,
    }),
  },

  watch: {
    errorMessage(message) {
      this.setAlert(message, 'danger');
    },
  },

  created() {
    this.STATUS = ListStore.STATUS;
    this.fields = FIELDS;
    this.fetchData();
  },

  methods: {
    ...mapActions(ListStore.NAMESPACE, {
      fetchData: ListStore.ACTIONS.fetchData,
      removeError: ListStore.ACTIONS.removeError,
      createData: ListStore.ACTIONS.createData,
      updateData: ListStore.ACTIONS.updateData,
      removeData: ListStore.ACTIONS.removeData,
    }),
    setAlert(message = '', type = 'primary') {
      this.alert.type = type;
      this.alert.message = message;
    },
    removeAlert() {
      this.alert.message = '';
    },
    onClickAdd() {
      this.selectedItem = null;
      this.isRemoving = false;
      this.isDataModalShown = true;
    },
    onClickUpdate({ row }) {
      this.selectedItem = row;
      this.isRemoving = false;
      this.isDataModalShown = true;
    },
    onClickRemove({ row }) {
      this.selectedItem = row;
      this.isRemoving = true;
      this.isDataModalShown = true;
    },
    closeDataModal() {
      this.isDataModalShown = false;
    },
    async addRow(payload) {
      await this.createData(payload);
      this.closeDataModal();
      if (this.isStatus(ListStore.STATUS.created)) {
        this.setAlert('Data created', 'success');
      }
      this.fetchData();
    },
    async updateRow(payload) {
      await this.updateData(payload);
      this.closeDataModal();
      if (this.isStatus(ListStore.STATUS.updated)) {
        this.setAlert('Data updated', 'success');
      }
      this.fetchData();
    },
    async removeRow(payload) {
      await this.removeData(payload);
      this.closeDataModal();
      if (this.isStatus(ListStore.STATUS.removed)) {
        this.setAlert('Data removed', 'success');
      }
      this.fetchData();
    },
  },
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <AlertComponent
      v-if="alert.message"
      :type="alert.type"
      class="w-100"
      @on-close="removeAlert"
    >
      {{ alert.message }}
    </AlertComponent>

    <div class="container my-5">
      <div class="row">
        <TableComponent
          :data="list"
          :columns="fields"
          add
          remove
          update
          class="col-12"
          @on-click-add="onClickAdd"
          @on-click-update="onClickUpdate"
          @on-click-remove="onClickRemove"
        />
      </div>
    </div>

    <DataModalComponent
      v-if="isDataModalShown"
      :data="selectedItem"
      :is-removing="isRemoving"
      @add-row="addRow"
      @update-row="updateRow"
      @remove-row="removeRow"
      @on-close="closeDataModal"
    />
  </div>
</template>
