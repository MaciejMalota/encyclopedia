import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
 import store from './store/index'
 import axios from './axios'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'mdb-vue-ui-kit/css/mdb.min.css'



// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from './plugins/font-awesome'

// createApp(App)
//   .use(router)
//   .use(store)
//   .component("font-awesome-icon", FontAwesomeIcon)
//   .mount("#app");

// import { VueReCaptcha } from "vue-recaptcha-v3";

// const myV3App = createApp(App);
// myV3App.use(VueReCaptcha, { siteKey: '' })
// myV3App.use(router);
// myV3App.use(Vuex);
// myV3App.mount("#app");



// createApp(App).use(store).use(router).mount('#app')

const myV3App = createApp(App).use(store).use(router).use(Vuex)
// myV3App.use(VueReCaptcha, { siteKey: '' })
// myV3App.use(router);
// myV3App.use(Vuex);
// myV3App.use(store);
myV3App.config.globalProperties.$http=axios;
myV3App.config.productionTip = false;
// Load the token from the localStorage
const token = localStorage.getItem("token");
// Is there is any token then we will simply append default axios authorization headers
if (token) {
 myV3App.config.globalProperties.$http.defaults.headers.common['Authorization'] = token;
}
myV3App.config.devtools= true;
myV3App.mount("#app");


