<template>
  <div>
    <h2 style="color:white"> My Profile</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item"><b>Email: {{ user.email }}</b></li>
        <li class="list-group-item"><b>Username:{{ user.username }}</b></li>
        <li class="list-group-item"><b>Age: {{ user.age }}</b></li>
        <li class="list-group-item">
          <label for="img" class="av"><b>Avatar path:</b></label>
    <input
      @error="imageExists"
      id="img"
      type="text"
      required
      placeholder="Set path to ur Img "
      v-model="img"
      
    />
     <div class="submit">
      <button>Add Avatar</button>
    </div>
        </li>
        

      </ul>
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["user"]),
   async beforeCreate() {
    // do body background w global.css
    document.body.className = "home";
   
  },
  methods: {
    ...mapActions(["getProfile"])
  },
  created() {
    this.getProfile();
  }
};
</script>

<style>
.av{
  margin-bottom: 25px;
  margin-right: 5px;
}
.card{
  width: 40%;
 
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
</style>