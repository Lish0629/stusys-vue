import { createStore } from 'vuex'

export default createStore({
  state: {
    mapView:{}
  },
  getters: {
    getMapView:(state)=> state.mapView
  },
  mutations: {
    setMapView(state, val) {

      state.mapView = val;
    }
  },
  actions: {
    setMapView({ commit }, val) {
      commit('setMapView', val);
    }
  },
  modules: {
  }
})


