<template>
	<header class="header container-fluid">
		<router-link to="/" class="title-art">
			<div></div>
			<h1>For Your EMMY<sup>&reg;</sup> Consideration</h1>
		</router-link>

		<div class="menu">
			<router-link :to="path">
				<span>{{text}}</span>
				<FontAwesomeIcon :icon="icon" />
			</router-link>
		</div>
	</header>
</template>

<script>
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

	export default {
		name: 'Header',
		components:{
			'FontAwesomeIcon': FontAwesomeIcon
		},
		computed:{
			menu(){
				return this.$store.state.route.name==="menu";
			},
			path(){
				if (this.menu) return this.$store.state.route.from.path;
				else return "/menu";
			},
			text(){
				if (this.menu) return "CLOSE MENU";
				else return "VIEW ALL SHOWS"
			},
			icon(){
				if (this.menu) return ['fal', 'times'];
				else return ['fal', 'bars'];
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.header{
		background: $black-linear-gradient;
		color: $white;
		height: $header-height;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: $border-gold;
		box-shadow: $box-shadow;
		z-index: $header-z;

		@include mobile(){
			height: $header-height * .85;
		}

		.title-art{
			display:flex;
			align-items: center;

			div{
				background: url(~@/assets/images/starz.png);
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center center;
				width: 100px;
				height: $header-height;
				margin-right: 10px;

				@include mobile(){
					width: 70px;
					height: $header-height * .85;
				}
			}

			h1{
				color: $gold;
				font-weight: normal;
				font-size: 18px;

				@include mobile(){
					font-size: 12px;
				}

				sup{
					font-size: 11px;

					@include mobile(){
						font-size: 8px;
					}
				}
			}
		}


		a{
			color: $light-grey;
			display: flex;
			align-items: center;

			span{
				font-size: 18px;
				line-height: 18px;
				//margin-right: 15px;

				@include small(){
					display: none;
				}
			}

			svg{
				display: none;
				@include small(){
					display: block;
				}
			}

			&:hover{
				color: $white;
			}
		}

		.menu{
			font-size: 28px;
		}
	}
</style>
