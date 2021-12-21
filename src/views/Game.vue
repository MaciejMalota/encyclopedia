<template>
  <div class="container2">
    <div class = "platformy">
      <div class="img_rate">
    <img
      :src="game.img"
      @error="imageUrlAlt"
      alt="./assets/noimage.png"
    />
  <star-rating  v-if="isLoggedIn && x==1  "  @update:rating ="setRating" increment="0.5"></star-rating>
  <star-rating   v-else  v-model:rating="this.overallrating"   increment="0.1" read-only="true"></star-rating>


    </div>
    <h1 id="platforms">
      <span class="plat" v-for="platform in game.platforms" :key="platform._id">
      <span class="badge bg-success"  v-if="platform.name==='ONE'  " >
        <i class="fab fa-xbox"   > ONE </i>
      </span>

      <span class="badge bg-dark"  v-if="platform.name==='PS5' ">
        <i class="fab fa-playstation"> PS5</i>
      </span>

      <span class="badge bg-secondary"  v-if="platform.name==='PS4' ">
        <i class="fab fa-playstation"> PS4</i>
      </span>

      <span class="badge bg-primary"  v-if="platform.name==='PC' ">
        <i class="fab fa-windows"> PC</i>
      </span>
      </span>
    </h1>
</div>
    <h4 id="genre">
      Genre:
      <div class="pill" v-for="genre in game.genres" :key="genre._id">
        <span> {{ genre.name }}</span>
      </div>

      <!-- v-for="genre in genres" :key="genre"  -->
    </h4>

    <h4 id="release_date">
      Release date:
      <div class="multi-p">
        <p class="p2">
          <span class="s1">{{ day }}</span>
          <span class="s2">{{ month }}</span>
          <span class="s3">{{ year }}</span>
        </p>
      </div>
    </h4>

    <h5 id="producer">
      Producer:

      <span class="producer_name"> {{ game.producer }}</span>
    </h5>

    <h1 id="title">{{ game.title }}</h1>
    <p id="text-content">
      {{ game.content }}
    </p>

    
  </div>

  <div class="commentSection" v-if="isLoggedIn">
    <div class="boxsizingBorder">
 <textarea name="comment" id="comment" style="width:100%" rows="6" ></textarea>

    </div>
     

   <button >Dodaj komentarz</button>
  </div>

  <!-- <div  class="commentsSection"> -->
    <div class="comment">
      <b style="font-size: large;">Maciek</b>: 2021/11/28 <br>
    Uważam ze gra jest świetna  
    </div>

    <div class="comment">
      Maciek: 2021/11/28 <br>
    Uważam ze gra jest świetna  
    </div>
    

  <!-- </div> -->
  
</template>
<script>
import axios from "axios";
import StarRating from 'vue-star-rating';
import { mapGetters} from "vuex";
export default {
  components: {StarRating},
  beforeCreate() {
    // do body background w global.css
    document.body.className = "home";
  },
    computed: {
    ...mapGetters(["isLoggedIn", "user"])
  },
  data() {
    return {
      game: "",
      day: "",
      month: "",
      year: "",
      rating: 0,
      comment_content:"",
      overallrating:0
    };
  },
  props: ["gameId"],
  mounted() {
    // let data = {
    //     toLoad: 15

    // }
    const response = axios
      .post("api/games/" + this.gameId)
      .then((res) => {
        this.game = res.data;
        this.day = this.game.release_date.slice(8, 10);
        this.month = this.game.release_date.slice(5, 7);
        this.year = this.game.release_date.slice(0, 4);
        
          let x=0; //do poprawy
       this.game.users.forEach(item=>
      { 
         if(item==this.user._id)x=1;
         
      })
      let y = this.game.users.length;
       this.overallrating = this.game.rating/y;
       console.log( this.overallrating)
      })
      .catch((error) => {
        this.$router.push({ name: "Home" }); // zmienić na strony nie znaleziono
      });
  },
  methods: {      
    imageUrlAlt(event) {
    event.target.src = "https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg"
                    },

 async setRating(rating){
      this.rating= rating;
      console.log(this.game.rating);
      
 await axios.post("api/games/rate", {
        rating: this.rating,
        gameId:this.gameId,
        users:this.user._id
      });
      this.$router.go();

              }
  }
};
</script>
<style scoped>
.commentSection{
margin-top: 5%;
resize: none;

}
#comment{
  resize: none;
}
.commentsSection{
margin-top: 5%;
  border-top: 1px solid #e4ddc7;
  color: black;
  background: ivory;
}
.comment{
border-bottom: 1px solid black;
padding: 10px;
margin-top: 10px;

  border-top: 1px solid #e4ddc7;
  color: black;
  background: ivory;
}
.boxsizingBorder {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}
.multi-p {
  padding: 5px;
  margin: 0 8px 5px 0;
  display: inline;
}
.multi-p p.p2 {
  margin-right: 2px;
}

p.p2 span {
  border: 1px solid #ccc;
  border-right: 0;
  border-radius: 0;
  font-size: 21px;
  font-weight: 400;
  height: 33px;
  line-height: 32px;
  margin-right: 0;
  padding-left: 5px;
  padding-right: 5px;

  letter-spacing: -0.7px;
  background: #f1f1f1;
  color: #000;
}
p.p2 span.s2 {
  font-size: 21px;
  height: 33px;
  line-height: 32px;
  letter-spacing: -0.4px;
  text-align: center;
}

p.p2 span.s3 {
  font-weight: 700;
  border-right: 1px solid #ccc;
}

.container2 {
  min-height: 100vh;
  padding: 15px;

  background: #858585b3;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  box-shadow: 30px 30px 29px rgb(0, 0, 0);
  -webkit-box-shadow: 0px 0px 60px rgb(0, 0, 0);
  -moz-box-shadow: 30px 20px 29px rgb(0, 0, 0);
}
img {
  width: 300px;
  height: 400px;
  margin: 10px;
  

  border-style: solid;
}
.img_rate{
 float: right;
  clear: both;
	position: relative;

 padding: 30px;


}
.vue-star-rating{
  margin-left:10% ;
}
.platformy{
  display:inline;
}

span {
  margin: 0.4% !important ;
}
#title {
  margin-top: 2%;
  margin-left: 1%;
  color: white;
  font-weight: bold;
  font-size: 60px;
}
#genre {
  color: white;
  font-weight: bold;
  font-size: 30px;
}

#platforms {
  margin-bottom: 2%;
}
#producer {
  color: white;
}
.producer_name {
  border: 1px solid #ccc;
  border-right: 0;
  border-radius: 0;
  font-size: 21px;
  font-weight: 400;
  height: 33px;
  line-height: 32px;
  margin-right: 0;
  padding-left: 5px;
  padding-right: 5px;

  letter-spacing: -0.7px;
  background: #f1f1f1;
  color: #000;
}
#release_date {
  color: white;
  font-weight: bold;
  display: inline-block;
}

#release_date > div {
  color: crimson;
  font-weight: bold;
  display: inline-block;
}

p {
  color: #222;
  
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

.badge{
display: inline;

}
#text-content{
  word-wrap: break-word;


}
</style>
