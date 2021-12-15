<template>

    <AppHeader />
    
 
   <div class="container">
      <Errors v-if="error" :msg="error"/>
      <router-view/>
    </div>
</template>
<script>
import AppHeader from "./components/AppHeader.vue";
import { mapGetters, mapActions } from "vuex";
import Errors from "@/components/Errors";

export default{
  name: "App",
  components: {
    AppHeader,
    Errors
  },
  beforeCreate: function () {},
  data() {
    return {};
  },
  methods: {...mapActions(["getProfile"])},
  computed: {...mapGetters(["error"])},
    created() {
    this.getProfile();
  }
}

</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 960px;
  margin: 0 auto;
} */

#nav a.router-link-exact-active {
  color: white;
  background: crimson;
}

.container {
  margin: auto;
  margin-top: 90px;
  width: auto;
  max-width: 50%;
  min-width: 24rem;
  min-height: 100vh;
  padding: 10px;
  
  background: #858585b3;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  box-shadow: 30px 30px 29px rgb(0, 0, 0);
  -webkit-box-shadow: 0px 0px 60px rgb(0, 0, 0);
  -moz-box-shadow: 30px 20px 29px rgb(0, 0, 0);
}
</style>
