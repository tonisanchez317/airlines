import get from 'lodash/get';
import DATA from '@/../public/data.json';
import * as httpService from '@/services/HttpService';

const endpoint = {
  list: () => '/api/list',
  update: dataId => `/api/list/${dataId}`,
  remove: dataId => `/api/list/${dataId}`,
};

export const STATUS = {
  ready: 'READY',
  loading: 'LOADING',
  loaded: 'LOADED',
  creating: 'CREATING',
  created: 'CREATED',
  updating: 'UPDATING',
  updated: 'UPDATED',
  removing: 'REMOVING',
  removed: 'REMOVED',
  error: 'ERROR',
};

export const NAMESPACE = 'LIST_STORE';

export const GETTERS = {
  list: 'GET_LIST',
  errorMessage: 'GET_ERROR_MESSAGE',
  isStatus: 'IS_STATUS',
};

export const MUTATIONS = {
  setList: 'SET_LIST',
  setStatus: 'SET_STATUS',
  setError: 'SET_ERROR',
};

export const ACTIONS = {
  fetchData: 'FETCH_DATA',
  removeError: 'REMOVE_ERROR',
  createData: 'CREATE_DATA',
  updateData: 'UPDATE_DATA',
  removeData: 'REMOVE_DATA',
};

const state = {
  list: [],
  selected: null,
  status: STATUS.ready,
  error: {},
};

const getters = {
  [GETTERS.list](state) {
    return state.list;
  },
  [GETTERS.isStatus](state) {
    return status => state.status === status;
  },
  [GETTERS.errorMessage](state) {
    return get(state, 'error.message', '');
  },
};

const mutations = {
  [MUTATIONS.setList](state, list) {
    state.list = list;
  },
  [MUTATIONS.setStatus](state, status) {
    state.status = status;
  },
  [MUTATIONS.setError](state, error) {
    state.error = error;
  },
};

const actions = {
  async [ACTIONS.fetchData]({ commit }) {
    try {
      commit(MUTATIONS.setStatus, STATUS.loading);

      const response = await httpService.get(endpoint.list()).catch(() => ({ data: DATA }));

      const data = get(response, 'data.data', []);

      commit(MUTATIONS.setList, data);

      commit(MUTATIONS.setStatus, STATUS.loaded);
    } catch (error) {
      const message = get(error, 'message');

      commit(MUTATIONS.setError, { message });
      commit(MUTATIONS.setStatus, STATUS.error);
    }
  },

  async [ACTIONS.createData]({ commit }, payload = {}) {
    try {
      commit(MUTATIONS.setStatus, STATUS.creati);

      await httpService.put(endpoint.update(payload.id), {
        ...payload,
      });

      commit(MUTATIONS.setStatus, STATUS.updated);
    } catch (error) {
      const message = get(error, 'message');

      commit(MUTATIONS.setError, { message });
      commit(MUTATIONS.setStatus, STATUS.error);
    }
  },

  async [ACTIONS.updateData]({ commit }, payload = {}) {
    try {
      commit(MUTATIONS.setStatus, STATUS.updating);

      await httpService.put(endpoint.update(payload.id), {
        ...payload,
      });

      commit(MUTATIONS.setStatus, STATUS.updated);
    } catch (error) {
      const message = get(error, 'message');

      commit(MUTATIONS.setError, { message });
      commit(MUTATIONS.setStatus, STATUS.error);
    }
  },

  async [ACTIONS.removeData]({ commit }, payload = {}) {
    try {
      commit(MUTATIONS.setStatus, STATUS.removing);

      await httpService.delete(endpoint.remove(payload.id));

      commit(MUTATIONS.setStatus, STATUS.updated);
    } catch (error) {
      const message = get(error, 'message');

      commit(MUTATIONS.setError, { message });
      commit(MUTATIONS.setStatus, STATUS.error);
    }
  },

  [ACTIONS.removeError]({ commit }) {
    commit(MUTATIONS.setError, {});
    commit(MUTATIONS.setStatus, STATUS.ready);
  },
};

export const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
