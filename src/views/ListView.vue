<script>
import { mapActions, mapGetters } from 'vuex';
import * as ListStore from '@/store/ListStore';
import TableComponent from '@/components/Table/TableComponent.vue';
import ModalComponent from '@/components/Modal/ModalComponent.vue';
import AlertComponent from '@/components/Alert/AlertComponent.vue';

export default {
  name: 'ListView',

  components: {
    AlertComponent,
    ModalComponent,
    TableComponent,
  },

  data() {
    return {
      dataModal: {
        show: false,
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

  created() {
    this.STATUS = ListStore.STATUS;
    this.COLUMNS = [
      {
        label: 'ID',
        key: 'id',
      },
      {
        label: 'IATA',
        key: 'iata',
      },
      {
        label: 'ICAO',
        key: 'icao',
      },
      {
        label: 'Airline',
        key: 'airline',
      },
      {
        label: 'Call sign',
        key: 'callsign',
      },
      {
        label: 'Country',
        key: 'country',
      },
    ];
    this.fetchList();
  },

  methods: {
    ...mapActions(ListStore.NAMESPACE, {
      fetchList: ListStore.ACTIONS.fetchData,
      removeError: ListStore.ACTIONS.removeError,
    }),
    editRow({ row }) {
      console.log(row);
    },
    removeRow({ row }) {
      console.log(row);
    },
    addRow() {
      this.dataModal.show = true;
      console.log('add');
    },
    onClickCloseDataModal() {
      this.dataModal.show = false;
    },
  },
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <AlertComponent
      v-if="isStatus(STATUS.error)"
      type="danger"
      class="w-100"
      @on-click-close="removeError"
    >
      {{ errorMessage }}
    </AlertComponent>

    <div class="container my-5">
      <div class="row">
        <TableComponent
          :data="list"
          :columns="COLUMNS"
          add
          edit
          remove
          class="col-12"
          @on-click-add="addRow"
          @on-click-edit="editRow"
          @on-click-remove="removeRow"
        />
      </div>
    </div>
    <ModalComponent
      :show="dataModal.show"
      @on-click-close="onClickCloseDataModal"
    >
      <p>Hello world</p>
    </ModalComponent>
  </div>
</template>
