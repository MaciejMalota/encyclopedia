<template>
  <h1 style="color: white">Top Gry - Najpopularniejsze gry</h1>

  <div class="wrapper" >
      
    <div class="box box1">
       <router-link :to="{ name: 'game' , params: { gameId: games[0]._id } }" >
      <img
        :src="this.games[0].img"
       
      />
      <div class="text-block">
        <h5>{{this.games[0].title}}</h5>
        <p><b>{{this.games[0].genres[0].name}}</b> {{this.games[0].release_date}}</p>
      </div>
       </router-link>
    </div>
   
    <div class="box box2">
       <router-link :to="{ name: 'game' , params: { gameId: games[6]._id } }">
      <img
        :src="this.games[6].img"
        
      />
      <div class="text-block">
        <h5>{{this.games[6].title.slice(0, 14)}}</h5>
        <p><b>{{this.games[6].genres[0].name}}</b> {{this.games[6].release_date}}</p>
      </div>
      </router-link>
    </div>
    <div class="box box3 nested">
      <div class="box">
         <router-link :to="{ name: 'game' , params: { gameId: bestofGenres[0]._id } }" >
        <img
          :src="this.bestofGenres[0].img"      
        />
        <p class="label-p">Top <b>{{this.bestofGenres[0].producer}}</b></p>
        <p class="more">{{this.bestofGenres[0].producer}}</p>
        </router-link>
      </div>
      <div class="box">
         <router-link :to="{ name: 'game' , params: { gameId: bestofGenres[1]._id } }" >
          <img
          :src="this.bestofGenres[1].img"      
        />
        <p class="label-p">Top <b>{{this.bestofGenres[1].producer}}</b></p>
        <p class="more">{{this.bestofGenres[1].producer}}</p>
         </router-link>
      </div>
      <div class="box">
         <router-link :to="{ name: 'game' , params: { gameId: bestofGenres[2]._id } }" >
       <img
          :src="this.bestofGenres[2].img"      
        />
        <p class="label-p">Top <b>{{this.bestofGenres[2].producer}}</b></p>
        <p class="more">{{this.bestofGenres[2].producer}}</p>
         </router-link>
      </div>
      <div class="box">
        <router-link :to="{ name: 'game' , params: { gameId: bestofGenres[3]._id } }" >
          <img
          :src="this.bestofGenres[3].img"      
        />
        <p class="label-p">Top <b>{{this.bestofGenres[3].producer}}</b></p>
        <p class="more">{{this.bestofGenres[3].producer}}</p>
         </router-link>
      </div>
      <div class="box">
        <router-link :to="{ name: 'game' , params: { gameId: bestofGenres[4]._id } }" >
           <img
          :src="this.bestofGenres[4].img"      
        />
        <p class="label-p">Top <b>{{this.bestofGenres[4].producer}}</b></p>
        <p class="more">{{this.bestofGenres[4].producer}}</p>
         </router-link>
      </div>
      <div class="box">
         <router-link :to="{ name: 'game' , params: { gameId: bestofGenres[5]._id } }" >
            <img
          :src="this.bestofGenres[5].img"      
        />
        <p class="label-p">Top <b>{{this.bestofGenres[5].producer}}</b></p>
        <p class="more">{{this.bestofGenres[5].producer}}</p>
         </router-link>
      </div>
      <div class="box">
         <router-link :to="{ name: 'game' , params: { gameId: bestofGenres[6]._id } }" >
          <img
          :src="this.bestofGenres[6].img"      
        />
        <p class="label-p">Top <b>{{this.bestofGenres[6].producer}}</b></p>
        <p class="more">{{this.bestofGenres[6].producer}}</p>
         </router-link>
      </div>
      <div class="box">
         <router-link :to="{ name: 'game' , params: { gameId: bestofGenres[7]._id } }" >
        <img
          :src="this.bestofGenres[7].img"      
        />
        <p class="label-p">Top <b>{{this.bestofGenres[7].producer}}</b></p>
        <p class="more">{{this.bestofGenres[7].producer}}</p>
         </router-link>
      </div>
    </div>
    <div class="box box4">
       <router-link :to="{ name: 'game' , params: { gameId: games[2]._id } }">
      <img
        :src="this.games[2].img"
        
      />
      <div class="text-block">
      <h5>{{this.games[2].title.slice(0, 14)}}</h5>
        <p><b>{{this.games[2].genres[0].name}}</b> {{this.games[2].release_date}}</p>
      </div>
      </router-link>
    </div>
    <div class="box box5">
       <router-link :to="{ name: 'game' , params: { gameId: games[3]._id } }">
      <img
        :src="this.games[3].img"
        
      />
      <div class="text-block">
      <h5>{{this.games[3].title.slice(0, 10)}}</h5>
        <p><b>{{this.games[3].genres[0].name}}</b> {{this.games[3].release_date}}</p>
      </div>
        </router-link>
    </div>
    <div class="box box6">
       <router-link :to="{ name: 'game' , params: { gameId: games[4]._id } }">
    <img
        :src="this.games[4].img"
        
      />
      <div class="text-block">
      <h5>{{this.games[4].title}}</h5>
        <p><b>{{this.games[4].genres[0].name}}</b> {{this.games[4].release_date}}</p>
      </div>
        </router-link>
    </div>
    <div class="box box7">
       <router-link :to="{ name: 'game' , params: { gameId: games[5]._id } }">
    <img
        :src="this.games[5].img"
        
      />
      <div class="text-block">
      <h5>{{this.games[5].title.slice(0, 10)}}</h5>
        <p><b>{{this.games[5].genres[0].name}}</b> {{this.games[5].release_date}}</p>
      </div>
        </router-link>
    </div>
    <div class="box box8">
       <router-link :to="{ name: 'game' , params: { gameId: games[1]._id } }">
   <img
        :src="this.games[1].img"
        
      />
      <div class="text-block">
      <h5>{{this.games[1].title}}</h5>
        <p><b>{{this.games[1].genres[0].name}}</b> {{this.games[1].release_date}}</p>
      </div>
        </router-link>
    </div>
    <div class="box box9">
       <router-link :to="{ name: 'game' , params: { gameId: games[7]._id } }">
    <img
        :src="this.games[7].img"
        
      />
      <div class="text-block">
      <h5>{{this.games[7].title}}</h5>
        <p><b>{{this.games[7].genres[0].name}}</b> {{this.games[7].release_date}}</p>
      </div>
        </router-link>
    </div>
    <div class="box box10">
       <router-link :to="{ name: 'game' , params: { gameId: games[8]._id } }">
    <img
        :src="this.games[8].img"
        
      />
      <div class="text-block">
      <h5>{{this.games[8].title}}</h5>
        <p><b>{{this.games[8].genres[0].name}}</b> {{this.games[8].release_date}}</p>
      </div> 
       </router-link>
    </div>
    <div class="box box11">
       <router-link :to="{ name: 'game' , params: { gameId: games[9]._id } }">
  <img
        :src="this.games[9].img"
        
      />
      <div class="text-block">
      <h5>{{this.games[9].title}}</h5>
        <p><b>{{this.games[9].genres[0].name}}</b> {{this.games[9].release_date}}</p>
      </div>
        </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // components: {StarRating},
  async beforeCreate() {
    // do body background w global.css
    document.body.className = "home";
    const response = await axios.get("api/games/bestgames");
    console.log(response)
    this.games = response.data.bestGamesListItems;
    this.bestofGenres = response.data.tab
  },
  data() {
    return {
     games: [],
     bestofGenres:[]
    };
  },
  // async mounted() {
    
  //   const response = await axios.get("api/games/bestgames");
  //   this.games = response.data;
  // },
  methods: {},
};
</script>

<style scoped>
.more{
float: right;
    padding-right: 10px;
    padding-left: 10px;
    
    background: #e44600;
    
    color: #fff;
    position: relative;
    bottom: 53px;
    font-size: 14px;
    width: 75px;
    text-align: center;

}
.label-p{
      font-size: 14px;
    line-height: 14px;
    margin: 0;
    line-height: 29px;
    font-weight: 400;
    color: #fff;
    padding-left: 10px;
    border-bottom: 1px solid #7a7a7a;
    position: relative;
  background: rgba(0, 0, 0, 0.7);
    bottom: 26px;
}

.wrapper {
  display: grid;
  grid-template-columns: 2fr  2fr 2fr 2fr;
  grid-auto-rows: minmax(100px, 100px);
  grid-gap: 2px;
}
.wrapper > div {
  background: #333;
}
.wrapper > div:nth-child(odd) {
  background: #333;
}

.text-block {
  position: relative;
  display: inline-block;
  bottom: 60px;
right: 2px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  margin-top: 2px;
  padding-left: 3px;
  padding-right: 5px;
 
}
.text-block p {
  font-size: 14px;
  line-height: 14px;
  color: #fff;
  text-align: left;
  color: #ccc;
  margin: 0;
}
.box p b {
  color: #fc0;
  font-weight: 400;
}
.box h5 {
  font-size: 28px;
  line-height: 36px;
}
.nested {
  display: grid;
  grid-auto-rows: minmax(190px, 200px);
  
}
.box {
  border: 2px solid black;
}
.box1 {
  grid-row: 1/5;
  grid-column: 1/3;
}
.box2 {
  grid-row: 1/3;
    grid-column: 3/4;
}
.box3 {
  grid-row: 1/16;
}
.box4 {
  grid-row: 3/5;
}
.box5 {
  grid-row: 5/7;
}
.box6 {
  grid-column: 2/4;
  grid-row: 5/9;
}
.box7 {
  grid-row: 7/9;
}
.box8 {
  grid-row: 9/14;
  grid-column: 1/4;
}
.box9 {
  grid-row: 14/18;
  grid-column: 1/3;
}
.box10 {
  grid-column: 3/4;
  grid-row: 14/16;
}
.box11 {
  grid-column: 3/4;
  grid-row: 16/18;
}

.box img {
   width: 100%;
  height: 100%;
  object-fit: cover;
}

/* .box1 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.box2 img {
  width: 100%;
  height: 100%;
}
.box3 img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.box4 img {
  width: 100%;
  height: 100%;
}
.box5 img {
  width: 100%;
  height: 100%;
}
.box6 img {
  width: 100%;
  height: 100%;
}
.box7 img {
  width: 100%;
  height: 100%;
}
.box8 img {
  width: 100%;
  height: 100%;
}
.box9 img {
  width: 100%;
  height: 100%;
}
.box10 img {
  width: 100%;
  height: 100%;
}
.box11 img {
  width: 100%;
  height: 100%;
}
.box12 img {
  width: 100%;
  height: 100%;
}
.box13 img {
  width: 100%;
  height: 100%;
} */
</style>
>
