import get from 'lodash/get';
import * as httpService from '@/services/HttpService';

export const NAMESPACE = 'LIST_STORE';

export const GETTERS = {
  list: 'GET_LIST',
};

export const MUTATIONS = {
  setList: 'SET_LIST',
};

export const ACTIONS = {
  fetchData: 'FETCH_DATA',
};

const state = {
  list: [],
  selected: null,
};

const getters = {
  [GETTERS.list](state) {
    return state.list;
  },
};

const mutations = {
  [MUTATIONS.setList](state, list) {
    state.list = list;
  },
};

const actions = {
  async [ACTIONS.fetchData]({ commit }) {
    const response = await httpService.get('/data.json');

    const data = get(response, 'data.data', []);

    commit(MUTATIONS.setList, data);
  },
};

export const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
