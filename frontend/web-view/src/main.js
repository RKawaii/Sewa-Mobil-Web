import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// bootstrap 4
import "popper.js";
import "bootstrap";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");