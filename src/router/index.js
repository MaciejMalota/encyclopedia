import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Encyclopedia from "../views/Encyclopedia.vue";
import Top10 from "../views/Top10.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import All_Users from "../views/All_Users.vue";
import Game from "../views/Game.vue";
import AddGame from "../views/AddGame.vue";
import EmailVerif from "../views/EmailVerif.vue";
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
    path: "/Top10",
    name: "Top10",

    component: Top10,
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
