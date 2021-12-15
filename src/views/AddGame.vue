<template>
  <form @submit="dataCheck">
    <label for="title">Game Title:</label>
    <input
      id="title"
      type="text"
      required
      placeholder="Game Title "
      v-model="title"
    />

    <label for="producer">Producer:</label>
    <input
      id="producer"
      type="text"
      required
      placeholder="Producer "
      v-model="producer"
    />

    <label for="title">Game Release Date:</label>
    <input id="title" type="date" required v-model="release_date" />

    <label for="genres">Genres:</label>

    <div class="panel">
      <div class="col-md-auto" v-for="genre in genres" :key="genre._id">
        <label>
          <input type="checkbox" v-model="Checked_genres" :value="genre._id" />
          {{ genre.name }}
        </label>
      </div>
    </div>

    <label for="platforms">Platforms:</label>

    <div class="panel">
      <div
        class="col-md-auto"
        v-for="platform in platforms"
        :key="platform._id"
      >
        <label>
          <input
            type="checkbox"
            v-model="Checked_platforms"
            :value="platform._id"
          />
          {{ platform.name }}
        </label>
      </div>
    </div>
    <label
      >Age Restriction
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="age_restriction"
      >
        <option value="18">18</option>
        <option value="16">16</option>
        <option value="12">12</option>
        <option value="7">7</option>
        <option value="3">3</option>
      </select>
    </label>

    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Opis</label>
      <textarea
        class="form-control"
        id="textarea"
        rows="10"
        v-model="content"
      ></textarea>
    </div>

    <label for="img">Img path:</label>
    <input
      @error="imageExists"
      id="img"
      type="text"
      required
      placeholder="Set path to ur Img "
      v-model="img"
    />

    <div class="submit">
      <button>Add Game</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      Checked_genres: [],
      Checked_platforms: [],
      genres: [],
      platforms: [],
      content: "",
      age_restriction: "",
      producer: "",
      release_date: "",
      img: "",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
  async mounted() {
    const response = await axios.get("api/games/genres");
    const response2 = await axios.get("api/games/platforms");
    this.genres = response.data;
    this.platforms = response2.data;
  },
  methods: {
    async dataCheck(e) {
      e.preventDefault();
      let good = 1;
      let url = this.img;

      var http = new XMLHttpRequest();
  //  http.open('HEAD', url, false);
  //  http.send();
   if(http.status != 404){
     console.log("Dobre")
   }else{
     good = 0;
   }
if(good == 1) this.addGame();
    },
    async addGame() {
      await axios.post("api/games/", {
        title: this.title,
        genres: this.Checked_genres,
        platforms: this.Checked_platforms,
        content: this.content,
        age_restriction: this.age_restriction,
        producer: this.producer,
        release_date: this.release_date,
        img: this.img,
      });
      this.$router.go();
    },
  },
  beforeCreate() {
    // do body background w global.css
    document.body.className = "home";
  },
};
</script>

<style scoped>
.panel {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
/* .panel>div{
    padding: 0px !important;
    display: inline !important;
    background: #555;
} */
form {
  max-width: 520px;
  margin: 30px auto;
  margin-top: 10px;
  background: white;
  text-align: left;
  padding: 20px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.7em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
button {
  background: crimson;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit {
  text-align: center;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
