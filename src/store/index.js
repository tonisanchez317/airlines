import Vue from 'vue';
import Vuex from 'vuex';
import * as ListStore from './ListStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    [ListStore.NAMESPACE]: ListStore.store,
  },
});

export default store;
