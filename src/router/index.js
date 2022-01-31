import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Encyclopedia from "../views/Encyclopedia.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import All_Users from "../views/All_Users.vue";
import Game from "../views/Game.vue";
import AddGame from "../views/AddGame.vue";
import EmailVerif from "../views/EmailVerif.vue";
import Pwreset from "../views/Pwreset.vue";
import PwChange from "../views/PwChange.vue";
import SearchResults from "../views/SearchResults.vue";
import "/src/assets/css/global.css";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/emailverif",
    name: "EmailVerif",
    component: EmailVerif,
  },
  {
    path: "/pwreset",
    name: "Pwreset",
    component: Pwreset,
  },
  {
    path: "/searchresults",
    name: "SearchResults",
    component: SearchResults,
  },
  {
    path: "/pwchange/:token",
    name: "PwChange",
    component: PwChange,
  },

  {
    path: "/game/:gameId",
    name: "game",
    component: Game,
    props: true,
  },
  {
    path: "/addgame",
    name: "AddGame",
    meta: {
      requiresModerator: true,
    },
    component: AddGame,
  },
  {
    path: "/Encyclopedia",
    name: "Encyclopedia",

    component: Encyclopedia,
  },

  {
    path: "/allusers",
    name: "All users",
    meta: {
      requiresAdmin: true,
    },

    component: All_Users,
  },
  {
    path: "/Profile",
    name: "Profile",
    meta: {
      requiresAuth: true,
    },
    component: Profile,
  },
  {
    path: "/Login",
    name: "Login",
    meta: {
      requiresGuest: true,
    },
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requiresGuest: true,
    },
    component: Register,
  },
];

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.isLoggedIn) {
//       // Redirect to the Login Page
//       next('/login');
//     } else {
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.requiresGuest)) {
//     if (store.getters.isLoggedIn) {
//       // Redirect to the Login Page
//       next('/profile');
//     } else {
//       next();
//     }
//   } else {
//     next()
//   }
// });
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next("/profile");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresModerator)) {
    if (!store.getters.isModerator) {
      // Redirect to the Login Page
      next("/profile");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!store.getters.isAdmin) {
      // Redirect to the Login Page
      next("/profile");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
