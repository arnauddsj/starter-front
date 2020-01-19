import Vue from "vue";
import Vuex from "vuex";

// Import modules
import auth from "@/store/modules/auth";
import admin from "@/store/modules/admin";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    admin
  }
});
