import { createStore } from 'vuex'

export default createStore({
  state: {
    mapView:{},
    cityPanelStore:{
      province:{},
      city:{name:'杭州市'},
      isVisible:false
    }
  },
  getters: {
    getMapView:(state)=> state.mapView,
    getCityPanel:(state)=> state.cityPanelStore
  },
  mutations: {
    setMapView(state, val) {

      state.mapView = val;
    },
    setCity(state, val) {

      state.cityPanelStore.city = val;
    }
  },
  actions: {
    setMapView({ commit }, val) {
      commit('setMapView', val);
    },
    setCity({ commit }, val) {
      commit('setCity', val);
    }
  },
  modules: {
  }
})


