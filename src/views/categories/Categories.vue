<template>
	<div class="categories" v-if="show" :style="{backgroundImage:`url(${backgroundImage})`}">
		<div class="copy diagonal right">
			<div>
				<h1>For Your EMMY<sup>&reg;</sup> Consideration</h1>
				<div class="main-category" v-for="cat in show.categories.large">
					<h3 v-html="cat.title"></h3>
					<ul v-for="row in cat.items">
						<li v-for="ritem in row"><h6>{{ritem}}</h6></li>
					</ul>
				</div>
				<div class="columns">
					<div>
						<div class="sub-category" v-for="cat in show.categories.left">
							<h4 v-html="cat.title"></h4>
							<h6 v-for="item in cat.items">{{item}}</h6>
						</div>
					</div>
					<div>
						<div class="sub-category" v-for="cat in show.categories.right">
							<h4 v-html="cat.title"></h4>
							<h6 v-for="item in cat.items">{{item}}</h6>
						</div>
					</div>
				</div>
				<!-- <div class="sub-category" v-for="cat in show.categories.small">
					<h4 v-html="cat.title"></h4>
					<h6 v-for="item in cat.items">{{item}}</h6>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Categories',
		computed:{
			show(){
				return this.$store.state.show;
			},
			backgroundImage(){
				if (!this.show.backgrounds) return null;

				if (this.$store.state.size.width<900&&this.$store.state.size.height>800) return this.show.backgrounds.categoriestab;
				else return this.show.backgrounds.categories;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.categories{
		.diagonal{
			opacity: 1;
			transform: translateX(0%);
			transition: all $transition-speed $transition-ease;
		}

		&.animate-enter-active, &.animate-leave-active {
			transition: all $transition-speed $transition-ease;

			.diagonal{
				opacity: 0;
			  transform: translateX(150%);
			}
		}

		&.animate-enter, &.animate-leave-to {
			opacity: 0;

		}
	}

	.categories{



		.copy{

			&>div{
				overflow-y: auto;
				overflow-x: hidden;

				// @include landscape(){
				// 	display: flex;
				// 	flex-wrap: wrap;
				// 	flex-direction: row;
				// 	align-items: flex-start;
				// }

				@include laptop(){
					display: block;
					min-height: 100%;
					padding-top: $footer-height;
					padding-bottom: $footer-height;
				}
			}
		}

		h1{
			width: 80%;
			text-align: center;
			text-transform: uppercase;
			font-weight: 700;
			margin-bottom: 20px;
			line-height: 36px;
			font-size: 32px;

			@include large(){
				line-height: 40px;
				font-size: 40px;
			}

			@include laptop(){
				margin-left: auto;
				margin-right: auto;
			}

			@include landscape(){
				font-size: 28px;
				line-height: 32px;
			}

			@include portait(){
				width: 100%;
			}

			@include mobile(){
				font-size: 18px;
				line-height: 21px;
			}

			sup{
				font-size: 14px;
				vertical-align:super;

				@include large(){
					font-size: 18px;
				}

				@include landscape(){
					font-size: 12px;
				}

				@include mobile(){
					font-size: 9px;
				}
			}
		}

		.main-category{
			margin-bottom: 30px;

			@include portait(){
				width: 100%;
				text-align: center;
			}




			h3{
				width: 100%;
				color: $gold;
				text-transform: uppercase;
				font-size: 24px;
				text-align: center;
				margin-bottom: 5px;

				@include large(){
					font-size: 28px;
				}

				@include laptop(){
					margin-left: auto;
					margin-right: auto;
					text-align: center;
				}

				@include landscape(){
					font-size: 20px;
				}

				@include mobile(){
					font-size: 16px;
				}
			}

			ul{

				text-align: center;
				li{
					display: inline-block;

					h6{
						padding-right: 5px;
						padding-left: 5px;
						border-right: 1px solid $gold;
					}

					&:first-child{
						h6{
							padding-left: 0 !important;
						}
					}

					&:last-child{
						h6{
							padding-right: 0 !important;
							border-right: none;
						}
					}

				}
			}
		}

		.columns{
			width: 100%;

			&>div{
				width: 46%;
				float: left;

				&:first-child{
					margin-right: 4%;

					@include small(){
						margin-left: 4%;
					}
				}
			}
		}


		.sub-category{
			margin-bottom: 15px;
			width: 100%;

			@include mobile(){
				width: 100%;
			}

			h4{
				width: 100%;
				text-align: left;
				margin: auto;
				color: $gold;
				text-transform: uppercase;
				font-size: 18px;
				margin-bottom: 5px;

				@include laptop(){
					margin-left: auto;
					margin-right: auto;
				}

				@include landscape(){
					font-size: 14px;
				}

				@include mobile(){
					font-size: 12px;
				}
			}

		}

		h6{
			width: 100%;
			text-align: left;
			margin-bottom: 2px;
			font-size: 14px;

			@include large(){
				font-size: 16px;
			}

			@include landscape(){
				font-size: 12px;
			}

			@include mobile(){
				font-size: 8px;
				letter-spacing: 0;
				padding-left: 2px !important;
				padding-right: 2px !important;;
			}
		}
	}
</style>
