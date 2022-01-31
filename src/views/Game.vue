<template>
  <div class="container2">
    
    <div class="platformy">
      <div class="img_rate">
        <img :src="game.img" @error="imageUrlAlt" alt="./assets/noimage.png" />
        <star-rating
          v-if="isLoggedIn && !this.hasVoted"
          @update:rating="setRating"
          increment="0.5"
        ></star-rating>
        <star-rating
          v-else
          v-model:rating="this.overallrating"
          increment="0.1"
          read-only="true"
        ></star-rating>
      </div>
      <button  v-if="this.user.permission>1"   id="btn3"   @click="DeleteGame(game)">Delete Game</button>
      <h1 id="platforms">
        <span
          class="plat"
          v-for="platform in game.platforms"
          :key="platform._id"
        >
          <span class="badge bg-success" v-if="platform.name === 'ONE'">
            <i class="fab fa-xbox"> ONE </i>
          </span>

          <span class="badge bg-dark" v-if="platform.name === 'PS5'">
            <i class="fab fa-playstation"> PS5</i>
          </span>

          <span class="badge bg-secondary" v-if="platform.name === 'PS4'">
            <i class="fab fa-playstation"> PS4</i>
          </span>

          <span class="badge bg-primary" v-if="platform.name === 'PC'">
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
    <p id="text-content" contenteditable="true">
      {{ game.content }}
    </p>
    <button id="btnUpdate" v-if="this.user.permission>1"  @click="UpdateGameInfo(game)">Update</button>
    
  </div>
  

  <div class="commentSection" v-if="isLoggedIn">
    <div class="boxsizingBorder">
      <textarea
        name="comment"
        id="comment"
        style="width: 100%"
        rows="6"
        v-model="comment_area"
      ></textarea>
    </div>

    <button @click="addComment">Dodaj komentarz</button>
  </div>

  <!-- <div  class="commentsSection"> -->
    <div v-if="isLoggedIn">
  <div class="comment"   v-for="comment in game.game_comments" :key="comment._id">
    <b style="font-size: large"> {{ comment.userId.username }}</b
    >: {{ comment.created_at.slice(0, 10) }} <br />
    <p id="commentcontent" v-if="this.user._id==comment.userId._id" contenteditable="true">{{ comment.comment_content }}</p>
    <p v-else>{{ comment.comment_content }}</p>
    <div v-if="this.user._id==comment.userId._id || this.user.permission>1"> 
      
      <button class="btn btn-primary"  id="btnUpdate" @click="UpdateComment(comment)">Update</button>
    <button class="btn btn-primary"  id="btn2"  @click="DeleteComment(comment)">Delete</button>
    </div>
   
  </div>
  </div>


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
      comment_area:"",
      comment_content:"",
      overallrating:0,
      hasVoted:0
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

        //do poprawy
       this.game.users.forEach(item=>
      {
         if(item==this.user._id)this.hasVoted=1;

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

              },

       async addComment(){
      await axios.post("api/games/addcomment", {
       comment_content: this.comment_area,
       gameId:this.gameId,
       userId:this.user._id
      });
      this.$router.go();

              },
              

     async DeleteComment(comment){
        await axios.delete("api/games/deletecomment/" +comment._id)
       
        this.$router.go(0);
        },
         async DeleteGame(game){
        await axios.delete("api/games/" +game._id)
       
        this.$router.go(0);
        },
      async UpdateGameInfo(game){
        let cmnt = {
            _id: game._id,
            content: document.getElementById('text-content').innerText,
          
          }
             await axios.post("api/games/updategameinfo",{cmnt});
        this.$router.go(0);
      },

      async UpdateComment(comment){
        let cmnt = {
            _id: comment._id,
            comment_content: document.getElementById('commentcontent').innerText,
          
          };
     
          
        await axios.post("api/games/updatecomment",{cmnt});
        this.$router.go(0);
        }



  }
};
</script>
<style scoped>
#btn2{
margin-top: 4%;
   color: white;
  background: crimson;
}
#btn3{
margin-top: 1%;
   color: white;
  background: crimson;
  float: right;
}
#btnUpdate{
margin-top: 4%;
   color: white;
  background: #183;

}

.commentSection {
  margin-top: 5%;
  resize: none;
}
#comment {
  resize: none;
}
.commentsSection {
  margin-top: 5%;
  border-top: 1px solid #e4ddc7;
  color: black;
  background: ivory;
}
.comment {
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
 width: 100%;
 height: 100%;
  min-height: 300px;
  min-width: 300px;
  max-height: 300px;
  max-width: 450px;
  margin: 10px;
object-fit: fill;
  border-style: solid;
}
.img_rate {
  float: right;
  clear: both;
  position: relative;

  padding: 30px;
}
.vue-star-rating {
  margin-left: 10%;
}
.platformy {
  display: inline;
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

.badge {
  display: inline;
}
#text-content {
  word-wrap: break-word;
  font-size: 23px;
  line-height: 1.6;
}
</style>
