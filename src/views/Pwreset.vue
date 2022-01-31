<template>
<form @submit.prevent="emailReset">
       <label for="email" >Email:</label>
      <input
       type="email" 
       required
        v-model="email"
        placeholder="E-mail">
  <div class="submit">
    <button>Reset Password </button>
    <br>
    <router-link to="/register">Need account ?</router-link>
  </div>
  <div v-for="message in msg" v-bind:key="message" class="success">
          {{ message }}
        </div>
</form>



</template>
<script>
import axios from "axios";
// import StarRating from 'vue-star-rating';
export default {
  // components: {StarRating},
  beforeCreate() {
    // do body background w global.css
    document.body.className = "home";
  },
  data() {
    return {
      email: this.email,
      msg:[],
    };
  },
  methods: {
  emailReset(){
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + 'guard' + '=([^;]*)')); 
if(!match){
const response = axios
      .post("api/users/recovery/" + this.email)
      .then((res) => {
   
      //console.log(res);
      
        this.msg =[];
        this.msg.push('Email został wysłany')
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 25*36000;
        now.setTime(expireTime);
        document.cookie = 'guard=ok;expires='+now.toUTCString()+';path=/';
        console.log(document.cookie)
     
      }) .catch((error) => {
         this.msg =[];
        this.msg.push( "Nie udało się wysłać Emailu" ); 
        
      });
       }else{
        this.msg =[];
        this.msg.push('Email został już wysłany, proszę odczekać 15 minut')
      }

      


  }
  },
};
</script>

<style scoped>
 form {
    max-width: 520px;
    margin: 30px auto;
    margin-top: 160px;
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
  input, select {
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


