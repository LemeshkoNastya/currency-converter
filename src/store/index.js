import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    symbols: null,
    loadingSymbols: false,
    errorSymbols: false,
    errorConverter: null,
    amount: null,
    result: null,
    symbolFrom: null,
    symbolTo: null,
  },
  mutations: {
    updateSymbols(state, list) {
      state.symbols = list;
    },
    changeAmount(state, value) {
      state.amount = value;
    },
    changeResult(state, value) {
      state.result = value;
    },
    changeSymbolFrom(state, symbol) {
      state.symbolFrom = symbol;
    },
    changeSymbolTo(state, symbol) {
      state.symbolTo = symbol;
    },
    changeLoadingSymbols(state, value) {
      state.loadingSymbols = value;
    },
    changeErrorSymbols(state, error) {
      state.errorSymbols = error;
    },
    changeErrorConverter(state, error) {
      state.errorConverter = error;
    },
  },
  getters: {
    listSymbols(state) {
      const list = state.symbols ? Object.entries(state.symbols).map(symbol => symbol[1]) : null;
      return list;
    },
    resultConverter(state) {
      return state.result;
    },
    loading(state) {
      return state.loadingSymbols;
    },
    error(state) {
      return state.errorSymbols;
    },
    errorConverter(state) {
      return state.errorConverter;
    },
  },
  actions: {
    checkConverter({
      commit,
      dispatch,
      state
    }) {
      if (state.amount && state.symbolFrom && state.symbolTo) {
        if (/^[\d.,]*$/.test(state.amount)) {
          commit("changeErrorConverter", null);
          dispatch("loadConverter");
        } else {
          commit("changeErrorConverter", 'Data entered incorrectly, currency number must be a number');
        }
      }
    },
    changeSymbol({
      commit,
      state
    }, payload) {
      const currentSymbol = Object.keys(state.symbols).find(key => state.symbols[key] === payload.symbol)
      if (currentSymbol) {
        if (payload.param === 'from') commit("changeSymbolFrom", currentSymbol);
        else commit("changeSymbolTo", currentSymbol);
      }
    },
    async loadSymbols({
      commit
    }) {
      commit("changeLoadingSymbols", true);
      const urlApi = `${process.env.VUE_APP_URL}symbols?apikey=${process.env.VUE_APP_KEY}`;

      await fetch(urlApi)
        .then((response) => {
          if (response.status !== 200) {
            commit("changeErrorSymbols", `Failed to get currency data. Error status: ${response.status}`);
            commit("changeLoadingSymbols", false);
            return Promise.reject();
          }
          return response.json();
        })
        .then((data) => {
          if (data.success)
            commit("updateSymbols", data.symbols);
          else commit("changeErrorSymbols", "An error occurred, unable to get currency data");
          commit("changeLoadingSymbols", false);
        })
        .catch((e) => {
          commit("changeErrorSymbols", `Error: ${e}`);
          commit("changeLoadingSymbols", false);
        });
    },
    async loadConverter({
      commit,
      state
    }) {
      const urlApi = `${process.env.VUE_APP_URL}convert?apikey=${process.env.VUE_APP_KEY}`;
      const params = `&to=${state.symbolTo}&from=${state.symbolFrom}&amount=${state.amount}`;

      await fetch(urlApi + params)
        .then((response) => {
          if (response.status !== 200) {
            commit("changeErrorConverter", `Failed to convert currency. Error status: ${response.status}`);
            return Promise.reject();
          }
          return response.json();
        })
        .then((data) => {
          if (data.success)
            commit("changeResult", data.result.toFixed(2));
          else {
            commit("changeResult", null);
            commit("changeErrorConverter", "An error occurred, unable to convert currency");
          }
        })
        .catch((e) => {
          commit("changeErrorConverter", `Error: ${e}`);
        });
    },
  },
  modules: {}
})