<template>
  <div>
<nav class="navbar fixed-top  navbar-expand-lg navbar-dark bg-dark ">
  <div class="container-fluid">
    <a class="navbar-brand" ><router-link to="/">Home</router-link> |</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         <li class="nav-item">
          <a class="nav-link active" aria-current="page"><router-link to="/Encyclopedia">Encyclopedia</router-link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page"><router-link to="/Top10">Top10</router-link></a>
        </li>
        <li class="nav-item"  v-if="isLoggedIn">
          <a class="nav-link active" ><router-link to="/profile">Profile </router-link></a>
        </li>
        <li class="nav-item"  v-if="!isLoggedIn">
          <a class="nav-link active" ><router-link to="/register">Register</router-link></a>
        </li>
          <li class="nav-item"  v-if="!isLoggedIn">
          <a class="nav-link active" ><router-link to="/login">Log in</router-link></a>
        </li>
      
       
          <li class="nav-item"  v-if="user.permission==3">
          <a class="nav-link active"  style="color:crimson; cursor:pointer; text-transform: capitalize;"> <router-link to="/allusers">All users</router-link></a>
        </li>
          <li class="nav-item"  v-if="isLoggedIn">
          <a to="/logout"  style="color:#16f; cursor:pointer;" class="nav-link"  @click.prevent="logoutUser">Log out</a>
        </li>
          
    
      </ul>
      <li class="nav-item admin d-flex"  v-if="isLoggedIn ">
          <a class="nav-link active"  style="color:crimson; cursor:pointer; text-transform: capitalize; float: right !important;margin:0 auto;" >Welcome  {{ user.username }}</a>
        </li>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>


  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn", "user", "isAdmin"])
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    }
  }
};
</script>


<style scoped>
a.router-link-exact-active {
  color: white;
  background: crimson;
}
a {
  font-weight: bold;

  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}
/* a:hover{

  color:rgb(12, 9, 146);
} */

#btnLOG{

   background: crimson;
    border: 0;
    padding: 10px 20px;
    color:white;
    
 width: 100%;
    border-radius: 20px;
  

}
 .admin{
   margin-right:30px;
 }
</style>
