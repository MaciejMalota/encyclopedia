<template>
  <div class="container2">
    <p v-if="user.permission >= 2">
      <router-link to="/addgame">
        <button
          type="button"
          class="btn btn-success"
          id="add_Game"
          style="padding: 5px"
        >
          DODAJ GRE
        </button>
      </router-link>
    </p>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <template v-if="this.selected == ''"> Genre </template>
        <template v-else>{{ this.selected }}</template>
      </button>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li
          @click="selectedGenre(genre)"
          v-for="genre in genres"
          :key="genre._id"
        >
          <a class="dropdown-item" href="#">{{ genre.name }}</a>
        </li>
      </ul>
    </div>

    <div
      class="card text-white bg-dark mb-3"
      v-for="game in games"
      :key="game._id"
    >
      <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img class="card-img-top" :src="game.img" />
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
          :to="{ name: 'game', params: { gameId: game._id } }"
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
      genres: [],
      games: [],
      selected: "",
    };
  },
  async mounted() {
    const response = await axios.get("api/games/");
    this.games = response.data;
    const response2 = await axios.get("api/games/genres");
    this.genres = response2.data;
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
  methods: {
    async selectedGenre(genre) {
      this.selected = genre.name;
      const response = await axios.get("api/games/genres/"+genre._id );
      this.games= response.data
    },
  },
  beforeCreate() {
    // do body background w global.css
    document.body.className = "tournaments";
  },
};
</script>

<style scoped>
.dropdown {
  margin-top: 2em;
}
.card-title {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card {
  margin: auto;
  height: 24rem;
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
  width: 100%;
  height: 100%;
  max-width: 250px;
  max-height: 155px;
  object-fit: cover;
  margin: 15px 15px 0px 15px;
  /* background img - ustawic jako , oraz zcentrowac */
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
