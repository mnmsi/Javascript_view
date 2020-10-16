<template>
	<div id="navbar">
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand href="#">JavaScript View</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item href="/home">Home</b-nav-item>
					<b-nav-item href="/about">About</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<div class="text-center">
						<a
							class="btn btn-sm my-2 my-sm-0 bg-white text-black"
							href="/cart"
						>
							Cart
							<b-badge variant="light">{{ cartedItems }}</b-badge>
						</a>
					</div>

					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template v-slot:button-content>
							<em>User</em>
						</template>
						<b-dropdown-item href="#">Profile</b-dropdown-item>
						<b-dropdown-item href="#">Log Out</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { NUM_CART_iTEMS } from "../services/apis.js";

	export default {
		name: "Navbar",
		data() {
			return {
				cartedItems: null,
			};
		},
        created: function() {
            this.$root.$refs.Navbar = this;
        },
		mounted: function() {
			this.init();
		},
		methods: {
			init: function() {
				fetch(NUM_CART_iTEMS, {
					method: "GET",
					headers: {
						Authorization:
							"Bearer " + this.$localStorage.get("token"),
						Accept: "application/json",
						"Content-type": "application/json",
					},
				})
					.then((response) => response.json())
					.then((data) => {
						this.cartedItems = data;
						this.$root.$on("updateCartItemEvent", (value) => {
							this.cartedItems += value;
						});
					})
					.catch((error) => {
						console.error(error);
						return error;
					});
			},
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
