<template>
	<div class="synopsis" v-if="show" :style="{backgroundImage:`url(${backgroundImage})`}">
		<div class="art" v-if="show.synopsisart" :style="{backgroundImage:`url(${show.synopsisart})`}">

		</div>
		<div class="copy diagonal right">
			<div>
				<div class="title-art" :class="{large:show.titleartlarge===true}":style="{backgroundImage:`url(${show.titleart})`}" v-if="show.titleart"></div>
				<h2 v-else>{{show.name}}</h2>
				<p v-for="p in show.synopsis" v-html="p"></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Synopsis',
		computed:{
			show(){
				return this.$store.state.show;
			},
			backgroundImage(){
				if (!this.show.backgrounds) return null;

				if (this.$store.state.size.width<900&&this.$store.state.size.height>800) return this.show.backgrounds.synopsistab;
				else return this.show.backgrounds.synopsis;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";



	.synopsis{
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

	.art{
		position: absolute;
		width: 49.5%;
		left: 1%;
		top: 0;
		height: 100%;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: contain;

		@include portait(){
			width: 100%;
			height: 35%;
			left: 0%;
			top: 2.5%;
		}

		@include mobile(){
			display: none;
		}
	}

	//.page in globals

	// .synopsis{
	//
	// 	.copy{
	// 		&>div{
				.title-art{
					background-repeat: no-repeat;
					background-position: center center;
					background-size: contain;
					width: 75%;
					height: 50px;
					margin-bottom: 25px;

					@include laptop(){
						margin-left: auto;
						margin-right: auto;
					}

					@include small(){
						margin-left: auto;
						margin-right: auto;

					}

					@include mobile(){
						height: 25px;
						margin-bottom: 10px;
					}

					&.large{
						height: 95px;

						@include mobile(){
							height: 55px;
						}
					}
				}

				h2{
					width: 90%;
					text-align: center;
					margin-bottom: 25px;
					@include laptop(){
						margin-left: auto;
						margin-right: auto;
					}
				}

				p{
					width: 90%;
					margin-bottom: 10px;
					color: $medium-grey;
					text-align: justify;

					@include laptop(){
						margin-left: auto;
						margin-right: auto;
					}

					// @include small(){
					// 	width: 100%;
					// }
				}
		// 	}
		// }
	//}
</style>
