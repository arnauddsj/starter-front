import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";

// Dates and validations
import Vue2Filters from "vue2-filters";
import moment from "moment";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

Vue.use(Vue2Filters);
Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY hh:mm");
  }
});

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  // Axios interceptor to check if there is User data in local storage
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  render: h => h(App)
}).$mount("#app");