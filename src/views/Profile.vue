<template>
  <div>
    <h2 style="color:white"> My Profile</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item"><b>Email: {{ user.email }}</b>       <label for="img" class="av"><b>Your Avatar:</b>
 <img :src=user.avatar_url ></label>
       <br> <b>Username:{{ user.username }}</b>
      <br> <b>Age: {{ user.age }}</b>
       
        </li>

      </ul>
     
         <li class="list-group-item">
   
 <div class="row">
    <div class="col-md-3">
        <div class="custom-control custom-radio image-checkbox">
            <input type="radio" class="custom-control-input" id="ck2a" name="ck2">
            <label class="custom-control-label" for="ck2a">
                <img src="https://i.imgur.com/nuI6wAK.png" alt="#" class="img-fluid">
            </label>
        </div>
    </div>
    <div class="col-md-3">
        <div class="custom-control custom-radio image-checkbox">
            <input type="radio" class="custom-control-input" id="ck2b" name="ck2">
            <label class="custom-control-label" for="ck2b">
                <img src="https://i.imgur.com/mkKbS7a.png" alt="#" class="img-fluid">
            </label>
        </div>
    </div>
    <div class="col-md-3">
        <div class="custom-control custom-radio image-checkbox">
            <input type="radio" class="custom-control-input" id="ck2c" name="ck2">
            <label class="custom-control-label" for="ck2c">
                <img src="https://i.imgur.com/hOQL5ty.png" alt="#" class="img-fluid">
            </label>
        </div>
    </div>


    <div class="col-md-3">
        <div class="custom-control custom-radio image-checkbox">
            <input type="radio" class="custom-control-input" id="ck2d" name="ck2">
            <label class="custom-control-label" for="ck2d">
                <img src="https://i.imgur.com/OR0Zh9e.png" alt="#" class="img-fluid">
            </label>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-3">
        <div class="custom-control custom-radio image-checkbox">
            <input type="radio" class="custom-control-input" id="ck2e" name="ck2">
            <label class="custom-control-label" for="ck2e">
                <img src="https://i.imgur.com/SRGw5rJ.png" alt="#" class="img-fluid">
            </label>
        </div>
    </div>
    <div class="col-md-3">
        <div class="custom-control custom-radio image-checkbox">
            <input type="radio" class="custom-control-input" id="ck2f" name="ck2">
            <label class="custom-control-label" for="ck2f">
                <img src="https://i.imgur.com/khXTvmv.png" alt="#" class="img-fluid">
            </label>
        </div>
    </div>
    <div class="col-md-3">
        <div class="custom-control custom-radio image-checkbox">
            <input type="radio" class="custom-control-input" id="ck2g" name="ck2">
            <label class="custom-control-label" for="ck2g">
                <img src="https://i.imgur.com/wWj3Ev6.png" alt="#" class="img-fluid">
            </label>
        </div>
    </div>
    <div class="col-md-3">
        <div class="custom-control custom-radio image-checkbox">
            <input type="radio" class="custom-control-input" id="ck2h" name="ck2">
            <label class="custom-control-label" for="ck2h">
                <img src="https://i.imgur.com/2TAHBqd.png" alt="#" class="img-fluid">
            </label>
        </div>
    </div>
</div>
     <div class="submit">
      <button @click="UpdateAvatar(user)">Save Avatar</button>
      
    </div>
        </li>
      </div>
      
    </div>
 
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
   async beforeCreate() {
    // do body background w global.css
    document.body.className = "home";
   
  },
  methods: {
    ...mapActions(["getProfile"]),
    //  async newAvatar(){
    //    await axios.post("api/users/changeAvatar", {
    //     avatar_url: document.querySelector('input[name="ck2"]:checked').nextElementSibling.firstElementChild.src
      
    //   });
    //   this.$router.go();
    // }

     async UpdateAvatar(user){
        let cmnt = {
            _id: user._id,
            avatar_url: document.querySelector('input[name="ck2"]:checked').nextElementSibling.firstElementChild.src
          
          }
             await axios.post("api/users/updateavatar",{cmnt});
        this.$router.go(0);
      },
  },
  created() {
    this.getProfile();
    
  }
};
</script>

<style  scoped>
.av{
  float: right;
}
.card{
  width: 100%;
 color: slategray;
 background-color: #49AD96;
}
li{
 
   background-color: #49AD96 !important;
}

input{
 
  padding: 10px;

}
  button {
     background: crimson;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
  }

</style>>


