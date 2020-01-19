import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import store from "../store/index";

// AUTH ROUTES
import Auth from "@/views/auth/Auth.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import RegisterValidate from "@/views/auth/registration/RegisterValidate.vue";
import RegisterPending from "@/views/auth/registration/RegisterPending.vue";
import RegisterConfirmation from "@/views/auth/registration/RegisterConfirmation.vue";
import RegisterSuccess from "@/views/auth/registration/RegisterSuccess.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";
import NewPassword from "@/views/auth/NewPassword.vue";

// ADMIN ROUTES
import UserList from "@/views/admin/UserList.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "main",
    components: {
      default: Main
    },
    meta: {
      requiresAuth: true
    }
  },
  // ADMIN
  {
    path: "/admin",
    name: "admin",
    component: UserList,
    meta: {
      requiresAuth: true
    },
    async beforeEnter(to, from, next) {
      // Get isAdmin state
      const storageData = localStorage.getItem("user");
      const storageParsed = JSON.parse(storageData);
      const isAdmin = storageParsed.isAdmin
      try {
        if (isAdmin === true) {
          next();
        }
      } catch (err) {
        console.log(err)
        next({
          name: "main", // back to safety route //
          query: {
            redirectFrom: to.fullPath
          }
        });
      }
    }
  },
  // AUTH ROUTES
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    children: [{
        path: "",
        name: "login",
        component: Login
      },
      {
        path: "/register",
        name: "register",
        component: Register
      },
      {
        path: "/register-validate",
        name: "registerValidate",
        component: RegisterValidate
      },
      {
        path: "/register-validation/:token/:email",
        name: "registerConfirmation",
        component: RegisterConfirmation
      },
      {
        path: "/register-success",
        name: "registerSuccess",
        component: RegisterSuccess
      },
      {
        path: "/register-pending",
        name: "registerPending",
        component: RegisterPending
      },
      {
        path: "/forgotpassword",
        name: "forgotpassword",
        component: ResetPassword
      },
      // RESET PASSWORD ROUTES
      {
        path: "/newpassword/:token/:email",
        name: "newpassword",
        component: NewPassword
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If no match redirect user to login
    if (loggedIn) {
      store.dispatch("checkToken", loggedIn);
      next();
      return;
    }
    next("/auth");
  } else {
    //continues navigation
    next();
  }
});

export default router;