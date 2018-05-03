<template>
	<div class="showmenu" v-if="show">
		<div class="title-art">
			<router-link :to="{path:`/show/${show.safename}`}">
				<span :style="{backgroundImage:`url(${show.titleart})`}" v-if="show.titleart"/>
				<h2 v-else>{{show.name}}</h2>
			</router-link>
		</div>
		<ul>
			<li :class="{selected:route==='synopsis'}" v-if="show.synopsis">
				<router-link :to="{path:`/show/${show.safename}/`}">Synopsis</router-link>
			</li>
			<li :class="{selected:route==='trailer'}" v-if="show.trailer||show.traileriframe">
				<router-link :to="{path:`/show/${show.safename}/trailer`}">Trailer</router-link>
			</li>
			<li :class="{selected:route==='acclaim'}" v-if="show.acclaim">
				<router-link :to="{path:`/show/${show.safename}/acclaim`}">Acclaim</router-link>
			</li>
			<li :class="{selected:route==='categories'}" v-if="show.categories">
				<router-link :to="{path:`/show/${show.safename}/categories`}">Categories</router-link>
			</li>
			<li :class="{selected:route==='episodes'}" v-if="show.episodes.length>1">
				<router-link :to="{path:`/show/${show.safename}/episodes/0`}" class="button reverse" content="Episodes">Episodes</router-link>
			</li>

			<li :class="{selected:route==='episode'}" v-if="show.episodes.length===1">
				<router-link :to="{path:`/show/${show.safename}/episode/1`}" class="button reverse" content="Watch">Watch</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'ShowMenu',
		computed:{
			show(){
				return this.$store.state.show;
			},
			route(){
				return this.$store.state.route.name;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.showmenu{
		background: $white-linear-gradient;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: $show-header-height;
		box-shadow: $box-shadow;
		z-index: $showmenu-z;
		position: relative;
		padding: 0 15px;
		transform: translateY(0%);

		&.animate-enter-active, &.animate-leave-active {
  			transition: all $transition-speed $transition-ease;
		}

		&.animate-enter, &.animate-leave-to {
  			transform: translateY(-100%);
		}

		@include small(){
			height: 40px;
		}

		.title-art{
			flex-grow: 1;
			position: relative;

			@include mobile(){
				display: none;
			}

			a {
				width: 100%;
				height: $show-header-height - 10;
				display: flex;
				position: relative;
				align-items: center;

				@include portait(){
					height: 30px;
				}

				span{
					display: block;
					width: 100%;
					height: 100%;
					max-width: 300px;
					// width: 200px;
					// height: ;
					background-repeat: no-repeat;
					background-position: left center;
					background-size: contain;
				}

				h2{
					font-size: 21px;
				}
			}
		}

		a{
			color: $black;
		}

		ul{
			display: flex;
			align-items: center;

			@include mobile(){
				flex-grow: 1;
			}

			li{
				margin-right: 25px;
				position: relative;

				&:after{
					content: "";
					background: $black;
					height: 2px;
					width: 0%;
					display: block;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					pointer-events: none;

					transition: width $transition-speed $transition-ease;
				}


				@include small(){


					text-align: center;
					//margin-right: 10px;
					font-size: 13px;
				}

				@include portait(){
					margin-right: 15px;
				}

				@include mobile(){
					flex-grow: 1;
					margin-right: 0;
				}

				&:last-child{
					margin-right: 0;

					&:after{
						@include notmobile(){
							display: none;
						}
					}
				}

				.button{
					@include mobile(){
						border: none;
						padding: 0;
					}

					&:after{
						@include mobile(){
							display: none;
						}
					}
				}

				&.selected{
					&:after{
						width: 100%;

						@include mobile(){
							display: block;
						}
					}
				}

				@media (pointer: fine) {
					&:hover{
						&:after{
							width: 100%;

							@include mobile(){
								display: block;
							}
						}
					}
				}

				&.selected{
					.button{
						&:after{
							display: flex !important;
							transform: translateY(0%);

							@include mobile(){
								display: none !important;
							}
						}
					}
				}

				// &:last-child{
				// 	margin-right: 0;
				// 	border: 2px solid $black;
				// 	padding: 5px 10px;
				// }
			}
		}
	}
</style>
