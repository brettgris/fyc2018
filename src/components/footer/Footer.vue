<template>
	<footer class="footer container-fluid">
		<p class="copyrights">
			STARZ and related channels and service marks are the property of Starz Entertainment, LLC.
			 <span v-if="home" v-html="home.copyright"></span>
			 <span v-if="show" v-html="show.copyright"></span>
		</p>
		<router-link v-if="authenticated" to="/logout">Log out</router-link>
	</footer>
</template>

<script>
	export default {
		name: 'Footer',
		computed:{
			authenticated(){
				return this.$store.state.authenticated;
			},
			shows(){
				return this.$store.state.shows;
			},
			show(){
				return this.$store.state.show;
			},
			home(){
				if (this.$store.state.route.name==='home-page') return this.shows[this.$store.state.page];
				else if (this.$store.state.route.name==='home') return this.shows[0];
				else return null;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.footer{
		background: $black;
		color: $white;
		height: $footer-height;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: $border-gold;
		box-shadow: $box-shadow;
		z-index: $footer-z;
		overflow: hidden;

		.copyrights{
			font-size: 10px;
			color: $medium-grey;

			@include portait(){
				font-size: 9px;
				line-height: 10px;
			}

			@include mobile(){
				font-size: 8px;
				line-height: 8px;
			}

			span{
				&:after{
					content: " ";
				}
			}
		}

		a{
			font-size: 12px;
			color: $light-grey;

			//@include portait(){
				width: 100px;
				text-align: right;
			//}

			@include mobile(){
				font-size: 8px;
				width: 90px;
				text-align: right;
			}

			&:hover{
				color: $white;
			}
		}
	}
</style>
