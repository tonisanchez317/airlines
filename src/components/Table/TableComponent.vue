<script>
import values from 'lodash/values';

export default {
  name: 'TableComponent',

  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    edit: {
      type: Boolean,
      default: false,
    },
    remove: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    values,
    onClickEdit(row) {
      this.$emit('on-click-edit', { row });
    },
    onClickRemove(row) {
      this.$emit('on-click-remove', { row });
    },
  },
};
</script>

<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th
          v-for="(column, columnIndex) in columns"
          :key="`header-${columnIndex}`"
        >
          {{ column.label }}
        </th>
        <th v-if="edit || remove" />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in data"
        :key="`row-${rowIndex}`"
      >
        <td
          v-for="(column, columnIndex) in columns"
          :key="`header-${rowIndex}-${columnIndex}`"
          class="align-middle"
        >
          {{ row[column.key] }}
        </td>
        <td
          v-if="edit || remove"
          class="d-flex align-middle"
        >
          <button
            v-if="edit"
            :class="{
              'mr-3': remove,
            }"
            class="btn btn-outline-dark"
            type="button"
            @click="onClickEdit(row)"
          >
            <i class="icon-pencil2" />
          </button>

          <button
            v-if="remove"
            class="btn btn-outline-dark"
            type="button"
            @click="onClickRemove(row)"
          >
            <i class="icon-bin2" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
