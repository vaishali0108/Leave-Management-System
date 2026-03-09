import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import ApplyLeave from "../pages/ApplyLeave.vue";
import MyLeaves from "../pages/MyLeaves.vue";
import AdminLeaves from "../pages/AdminLeaves.vue";

const routes = [

 { path: "/", component: Login },

 { path: "/signup", component: Signup },

 { path: "/dashboard", component: Dashboard },

 { path: "/apply-leave", component: ApplyLeave },

 { path: "/my-leaves", component: MyLeaves },

 { path: "/admin", component: AdminLeaves }

];

const router = createRouter({

 history: createWebHistory(),

 routes

});

export default router;