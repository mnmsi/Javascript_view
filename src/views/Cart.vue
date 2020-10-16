<template>
	<div class="text-white">
		<Layout />
		<br />
		<h1>Shopping cart list</h1>
		<br /><br />
		<div class="container mb-4">
			<div class="row">
				<div class="col-12">
					<div class="table-responsive">
						<table class="table table-striped text-white">
							<thead>
								<tr>
									<th scope="col"></th>
									<th scope="col">Product</th>
									<th scope="col" class="text-center">
										Quantity
									</th>
									<th scope="col" class="text-center">
										Price
									</th>
									<th scope="col">Total Price</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(cart, index) in cartedProducts"
									v-bind:key="index"
								>
									<td>
										<img
											src="https://dummyimage.com/50x50/55595c/fff"
										/>
									</td>
									<td>
										{{
											cart.productName +
												" " +
												cart.productModel
										}}
									</td>
									<td width="20%">
										<b-input-group>
											<b-input-group-prepend>
												<b-btn
													variant="secondary"
													@click="
														decrement(
															cart.productId,
															'decrement'
														)
													"
													>-</b-btn
												>
											</b-input-group-prepend>

											<b-form-input
												class="text-center"
												type="number"
												min="1"
												v-bind:value="
													cart.totalQuantity
												"
												readonly
											></b-form-input>

											<b-input-group-append>
												<b-btn
													variant="primary"
													@click="
														increment(
															cart.productId
														)
													"
													>+</b-btn
												>
											</b-input-group-append>
										</b-input-group>
									</td>
									<td>{{ cart.price }}</td>
									<td class="text-center">
										{{ cart.totalAmount }}
										TK
									</td>
									<td class="text-center">
										<button
											class="btn btn-sm btn-danger"
											@click="
												deleteProductFromCart(cart.id)
											"
										>
											<i class="fa fa-trash">Remove</i>
										</button>
									</td>
								</tr>
								<tr>
									<td colspan="3"></td>
									<td>Sub-Total</td>
									<td class="text-center">
										{{ totalPrice }} TK
									</td>
									<td></td>
								</tr>
								<tr>
									<td colspan="3"></td>
									<td>Shipping</td>
									<td class="text-center">40 TK</td>
									<td></td>
								</tr>
								<tr>
									<td colspan="3"></td>
									<td><strong>Total</strong></td>
									<td class="text-center">
										<strong
											>{{ totalPrice + 40 }} TK</strong
										>
									</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col mb-2">
					<div class="row">
						<div class="col-sm-12  col-md-6">
							<a class="btn btn-block btn-light" href="/home">
								Continue Shopping
							</a>
						</div>
						<div class="col-sm-12 col-md-6 text-right">
							<button
								class="btn btn-lg btn-block btn-success text-uppercase"
								@click="placeOrder()"
							>
								Order
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Layout from "./Layout.vue";
	import {
		CART_iTEMS,
		ADD_CART,
		DELETE_CART_PROD,
		SUBMIT_ORDER,
	} from "../services/apis.js";

	export default {
		name: "Cart",
		components: {
			Layout,
		},
		data() {
			return {
				cartedProducts: [],
				totalPrice: null,
				posttotalQuantity: 0,
			};
		},
		created: function() {
			this.init();
		},
		methods: {
			init: function() {
				fetch(CART_iTEMS, {
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
						this.cartedProducts = data.products;
						this.totalPrice = data.totalPrice;
					})
					.catch((error) => {
						console.error(error);
						return error;
					});
			},
			increment: function(productId) {
				fetch(ADD_CART, {
					method: "POST",
					headers: {
						Authorization:
							"Bearer " + this.$localStorage.get("token"),
						Accept: "application/json",
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						productId: productId,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.responseType == "success") {
							alert(data.message);
							this.init();
							this.$root.$refs.Navbar.init();
						} else {
							alert(data.message);
						}
					})
					.catch((error) => {
						console.error(error);
						return error;
					});
			},
			decrement: function(productId, method) {
				fetch(ADD_CART, {
					method: "POST",
					headers: {
						Authorization:
							"Bearer " + this.$localStorage.get("token"),
						Accept: "application/json",
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						productId: productId,
						method: method,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.responseType == "success") {
							alert(data.message);
							this.init();
							this.$root.$refs.Navbar.init();
						} else {
							alert(data.message);
						}
					})
					.catch((error) => {
						console.error(error);
						return error;
					});
			},
			deleteProductFromCart: function(cartId) {
				var url = DELETE_CART_PROD + "?id=" + cartId;
				fetch(url, {
					method: "DELETE",
					headers: {
						Authorization:
							"Bearer " + this.$localStorage.get("token"),
						Accept: "application/json",
						"Content-type": "application/json",
					},
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.responseType == "success") {
							alert(data.message);
							this.init();
						} else {
							alert(data.message);
						}
					})
					.catch((error) => {
						console.error(error);
						return error;
					});
			},
			placeOrder: function() {
				let productIdArr = [];
				let productQuantityArr = [];
				let productPriceArr = [];
				let productDiscountArr = [];
				let productTotalAmountArr = [];

				// let totalQuantity = 0;
				let totalPrice = this.totalPrice;
				let totalDiscount = 0;
				let totalAmount = this.totalPrice + 40;

				this.cartedProducts.forEach((value, index) => {
					this.posttotalQuantity = this.sum(this.posttotalQuantity, value.totalQuantity);

					productIdArr.push(value.productId);
					productQuantityArr[value.productId] = value.totalQuantity;
					productPriceArr[value.productId] = value.price;
					productDiscountArr[value.productId] = 0;
					productTotalAmountArr[value.productId] = value.totalAmount;

					console.log(value);
					console.log(index);
				});

				fetch(SUBMIT_ORDER, {
					method: "POST",
					headers: {
						Authorization:
							"Bearer " + this.$localStorage.get("token"),
						Accept: "application/json",
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						productIdArr: productIdArr,
						productQuantityArr: productQuantityArr,
						productPriceArr: productPriceArr,
						productDiscountArr: productDiscountArr,
						productTotalAmountArr: productTotalAmountArr,

						totalQuantity: this.posttotalQuantity,
						totalPrice: totalPrice,
						totalDiscount: totalDiscount,
						totalAmount: totalAmount,

					}),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.responseType == "success") {
							alert(data.message);
							this.$router.push('/home');
						} else {
							alert(data.message);
						}
					})
					.catch((error) => {
						console.error(error);
						return error;
					});
			},
			sum: function(totalQuantity1, totalQuantity2) {
				return Number(totalQuantity1) + Number(totalQuantity2);
			}
		},
	};
</script>
