import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedId: "" //默认未选择 选择之后更新对应景区id到这里
  },
  mutations: {
    updateSelectId(state, id) {
      state.selectedId = id;
    }
  },
  actions: {}
});
