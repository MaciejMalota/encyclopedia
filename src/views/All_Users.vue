<template>
  <div>
    <h2>All Users</h2>
>

<table class="table table-dark table-borderless">
  <thead>
    <tr>
      <th scope="col">#_id</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Permission</th>
      <th scope="col">Age</th>
      <th scope="col">Banned</th>
      <th scope="col">Deleted</th>
    </tr>
  </thead>
  <tbody  v-for="(user,i) in users" :key="user._id">
    <tr contenteditable="true" >
      <th scope="row" contenteditable="false">{{i}}</th>
      <td :id="'user'+i" ><p>{{ user.username }} </p> </td>
      <td :id="'email'+i"> {{ user.email }}</td>
      <td :id="'permission'+i"> {{ user.permission}}</td>
      <td :id="'age'+i" > {{ user.age }}</td>

      <td> <input type="checkbox" name="banned" class="inline checkbox" :id="'ban'+i" :checked="user.banned"></td>
      <!-- <td> <input type="checkbox" name="banned" class="inline checkbox" @change="DeleteUser(user, i)" :checked="user.deleted" ></td> -->

   
    <button class="btn btn-primary"  id="btnUpdate" @click="UpdateUser(i)">Update</button>
    <button class="btn btn-primary"  id="btn2"  @click="DeleteUser(user)">Delete</button>
 
    </tr>
   
  </tbody>
</table>
    

   
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["users"]),
  methods: {
    ...mapActions(["getUsers"]),

      async DeleteUser(user){
        await axios.delete("api/users/" +user._id);
       
        this.$router.go(0);
        },

      async UpdateUser(user){
        let usr = {
            id: user,
            username: document.getElementById('user'+user).innerText,
            email: document.getElementById('email'+user).innerText,
            permission: document.getElementById('permission'+user).innerText,
            age: document.getElementById('permission'+user).innerText,
            banned: document.getElementById('ban'+user).checked
          };
        await axios.post("api/users/updateUser",{usr});
        this.$router.go(0);
        }
    
  },
    
  
  created() {
    this.getUsers();
  },

};


</script>

<style scoped>
#btn2{
margin-top: 4%;
   color: white;
  background: crimson;
}
#btnUpdate{
margin-top: 4%;
   color: white;
  background: #183;

}
tr>td{


}
</style>