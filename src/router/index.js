import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Cart from "../views/Cart.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/signup",
		component: Signup,
	},
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/",
		component: Home,
	},
	{
		path: "/home",
		component: Home,
	},
	{
		path: "/cart",
		component: Cart,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
