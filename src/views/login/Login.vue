<template>
	<div class="login overlay" v-if="show" :style="{backgroundImage:`url(${show.backgrounds.login})`}">
		<div class="form">
			<form @submit.prevent="login">
				<div class="form-group form-group-lg">
					<input type="password" class="form-control" :class="{'is-invalid':error}" id="sitepw" placeholder="Enter Password" v-model="pass" />
					<div class="invalid-feedback">{{message}}</div>
				</div>
				<div class="form-group form-group-lg">
					<button type="submit" class="button" content="Login">Login</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	//

	export default{
		name: 'Login',
		data(){
			return {
				pass: '',
				message: 'Incorrect Login. Please Try Again.',
				error: false
			}
		},
		computed:{
			show(){
				return this.$store.state.show;
			},
			authenticated(){
				return this.$store.state.authenticated
			}
		},
		methods:{
			login(){
				this.$auth.login(this.pass, (err)=>{
					this.error = true;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.login{
		.form{
			opacity: 1;
			transform: translateY(0%);
			transition: all $transition-speed $transition-ease;
		}

		&.animate-enter-active, &.animate-leave-active {
			transition: all $transition-speed $transition-ease;

			.form{
				opacity: 0;
  			transform: translateY(-100%);
			}
		}

		&.animate-enter, &.animate-leave-to {
			opacity: 0;
		}
	}

	.login{
		display: flex;
		align-items: center;
		justify-content: center;

		// &:after{
		// 	content: "";
		// 	display: block;
		// 	position: absolute;
		// 	width: 100%;
		// 	height: 100%;
		// 	top: 0;
		// 	left: 0;
		// 	right: 0;
		// 	bottom: 0;
		// 	background: rgba($black,.75);
		// }

		.form{
			position: absolute;
			z-index: 5;
			width: 30%;
			text-align: center;

			@include mobile(){
				width: 50%;
			}

			color: $white;

			.button{
				display: inline-block;
			}
		}

	}

	.error {
    	color: red;
  	}
</style>
