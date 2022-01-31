<template>
  <div class="container2">
 

    <div
      class="card text-white bg-dark mb-3"
      v-for="game in games"
      :key="game._id"
    >
      <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img
          class="card-img-top"
          :src="game.img"
        />
        <a href="#!">
          <div
            class="mask"
            style="background-color: rgba(251, 251, 251, 0.15)"
          ></div>
        </a>
      </div>

      <div class="card-body">
        <div
          class="pill"
          v-for="genre in game.genres.slice(0, 3)"
          :key="genre._id"
        >
          <span> {{ genre.name }}</span>
        </div>
        <h3 class="card-title">{{ game.title }}</h3>

        <router-link
          :to="{ name: 'game' , params: { gameId: game._id } }"
          type="button"
          class="btn btn-primary"
          id="btn2"
          >Czytaj</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // genres: [],
      games: [],
    };
  },
  async mounted() {
  
   const response = await axios.post("api/games/result/"+this.getParam('search'));
    this.games = response.data;


  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
  methods: {
    getParam(param){
  return new URLSearchParams(window.location.search).get(param);
}
  },
  beforeCreate() {
    // do body background w global.css
    document.body.className = "tournaments";
  },
};
</script>

<style scoped>
.card {
  margin: auto;
  height: 31rem;
  text-align: center;
  width: 18rem;
  background: #858585b3;
  display: inline-block !important;
  margin: 20;
  margin-left: 25px;
  margin-top: 20px;
}
/* .card-body{
  margin-bottom: 20px;
} */

.card img {
  width: 250px;
  height: 300px;

  margin: 15px 15px 0px 15px;
}
/* .card-img-top {
  width: 100%;
    height: 15vw;
     object-fit: cover;
    
 
    
 }   */
#btn2 {
  color: white;
  background: crimson;
}
#add_Game {
  position: fixed;
  padding: 10px;
}
.pill {
  display: inline-block;
  vertical-align: middle;

  margin: 10px 4px;
  padding: 6px 12px;
  background: black;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.container2 {
  margin: auto;
  width: auto;
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
