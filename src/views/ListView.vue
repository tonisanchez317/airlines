<script>
import { mapActions, mapGetters } from 'vuex';
import * as ListStore from '@/store/ListStore';
import TableComponent from '@/components/Table/TableComponent.vue';

export default {
  name: 'ListView',

  components: {
    TableComponent,
  },

  computed: {
    ...mapGetters(ListStore.NAMESPACE, {
      list: ListStore.GETTERS.list,
    }),
  },

  created() {
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
    }),
    editRow({ row }) {
      console.log(row);
    },
    removeRow({ row }) {
      console.log(row);
    },
  },
};
</script>

<template>
  <main class="d-flex justify-content-center align-items-center">
    <div class="container my-5">
      <div class="row">
        <TableComponent
          v-if="list"
          :data="list"
          :columns="COLUMNS"
          edit
          remove
          class="col-12"
          @on-click-edit="editRow"
          @on-click-remove="removeRow"
        />
      </div>
    </div>
  </main>
</template>
