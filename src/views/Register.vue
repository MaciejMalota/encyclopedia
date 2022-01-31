<template>

  <form @submit.prevent="registerUser">
      <label for="username" >Username:</label>
      <input
      id="username"
       type="text"
        required
        placeholder="Username"
         v-model="username">

      <label for="password" >Password:</label>
      <input
      id="password"
       type="password" 
       placeholder="Password"
       required 
       v-model="password">
      <!-- <div v-if="passwordError" class="error"> {{passwordError}}</div> -->
      <label for="confirm_password" >Confirm Password:</label>
      <input
      id="confirm_password"
      placeholder="Confirm Password"
       type="password"
        required 
        v-model="confirm_password">
      <!-- <div v-if="passwordError" class="error"> {{passwordError}}</div> -->

       <label for="email" >Email:</label>
      <input
       type="email" 
       required
        v-model="email"
        placeholder="E-mail">

        <label > Age: </label>
      <input type="number " min="3" max="100"   step="1"  placeholder="How old are You?" required v-model="age">



         <!-- <label > City</label>
      <input type="text" required v-model="user.city"> -->
      

      <!-- <label >Role:</label>
      <select v-model="role"> 
        <option value="developer">Web Developer</option>
        <option value="designer">Web Designer</option>
      </select>
      
      <label>Skills:</label>
      <input type="text" v-model="tempSkill" @keyup.alt="addSkill">
      <div  v-for="skill in skills" :key="skill" class="pill">
        <span @click="deleteSkill(skill)">  {{skill}}</span>
      
      </div> -->


  <div class="terms">
    <input type="checkbox" v-model="terms" required>
    <label >Accept terms and conditions</label>
  </div>
  <div class="submit">
    <button>Create an Account</button>
  </div>
 
</form>



</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      age: "",
      terms:false
   
    };
  },
   beforeCreate() {
    // do body background w global.css
    document.body.className = "register";
  },
  methods: {
    ...mapActions(["register"]),
    
    registerUser() {
      let user = {
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password,
        email: this.email,
        age: this.age
       
      };
      this.register(user).then(res => {
        if (res.data.success) {
          this.$router.push("login");
        }
      });
    }
  }
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