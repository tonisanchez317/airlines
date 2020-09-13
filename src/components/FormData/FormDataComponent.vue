<script>
import COUNTRIES from './data/countries.json';

export default {
  name: 'FormData',

  props: {
    value: {
      type: Object,
      default: null,
    },
  },

  computed: {
    state() {
      return this.value ? this.value : {};
    },
  },

  created() {
    this.countries = COUNTRIES.data;
  },
};
</script>
<template>
  <form>
    <div
      v-if="state.id"
      class="form-group"
    >
      <label>
        ID
      </label>
      <div>
        {{ state.id }}
      </div>
    </div>

    <div class="form-group">
      <label for="iata">
        IATA
      </label>
      <input
        id="iata"
        type="text"
        class="form-control"
        placeholder="IATA"
        v-model="state.iata"
      >
    </div>

    <div class="form-group">
      <label for="icao">
        ICAO
      </label>
      <input
        id="icao"
        type="text"
        class="form-control"
        placeholder="ICAO"
        v-model="state.icao"
      >
    </div>

    <div class="form-group">
      <label for="airline">
        Airline
      </label>
      <input
        id="airline"
        type="text"
        class="form-control"
        placeholder="Airline"
        v-model="state.airline"
      >
    </div>

    <div class="form-group">
      <label for="callsign">
        Call sign
      </label>
      <input
        id="callsign"
        type="text"
        class="form-control"
        placeholder="Call sign"
        v-model="state.callsign"
      >
    </div>

    <div class="form-group">
      <label for="country">
        Country
      </label>
      <select
        id="country"
        class="form-control"
        v-model="state.country"
      >
        <option
          :value="undefined"
        >
          Choose a country
        </option>
        <option
          v-for="(country, countryIndex) in countries"
          :key="`country-${countryIndex}`"
          :value="country"
        >
          {{ country }}
        </option>
      </select>
    </div>
  </form>
</template>
