<template>
<form @submit.prevent="newPassword">
    <label for="password" >New Password:</label>
      <input
      id="password"
       type="password" 
       placeholder="Password"
       required 
       v-model="password">
 
  <label for="confirm_password" >Confirm Password:</label>
      <input
      id="confirm_password"
      placeholder="Confirm Password"
       type="password"
        required 
        v-model="confirm_password">


  <div class="submit">
    <button>Set New Password </button>
  </div>
  <div v-for="msg in messages" v-bind:key="msg" class="success">
          {{ msg }}
        </div>
</form>



</template>
<script>
import axios from "axios";
// import StarRating from 'vue-star-rating';
export default {
  // components: {StarRating},
  
  data() {
    return {
       password: "",
      confirm_password: "",
      messages:[],
      email:"",
    };
  },
  beforeCreate() {
    // do body background w global.css
    document.body.className = "home";
  },
  mounted() {
    let path = window.location.pathname;
    let segments = path.split("/");
    let token = [segments[2]];

    const response = axios
      .post("api/users/checkToken/" + token)
      .then((res) => {
      
        this.email= res.data
        console.log(this.email);
      }).catch((err) =>
       {
       window.location.replace("http://localhost:8080/")
         });


  },
  methods: {
  async newPassword(){
     let newData = {
      
        password: this.password,
        confirm_password: this.confirm_password,
        email: this.email,
       
      };

const response = axios
      .post("api/users/updatePassword", {newData})

      .then((res) => {
      console.log(res);
this.$router.push("/login");
      })


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


