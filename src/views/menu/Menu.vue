<template>
	<div class="menu">
		<ul class="textlinks">
			<template v-for="cat in categories">
				<li class="title">
					{{cat.display}}
				</li>
				<li v-for="show in cat.shows" class="show">
					<router-link :to="{path:`/show/${show.safename}`}">{{show.name}}</router-link>
				</li>
			</template>
		</ul>
		<!-- <div class="category" v-for="row in getRows()">
			<div class="title">
				<h2 v-for="cat in row" :style="{width:getSize(cat,row)}">{{cat.display}}</h2>
			</div>
			<ul>
				<li v-for="show in getShows(row)">
					<router-link :to="{path:`/show/${show.safename}`}" :style="{backgroundImage:`url(${show.key.vertical})`}">
						<div>
							<div class="titleart" :style="{backgroundImage:`url(${show.titleartwhite})`}"></div>
							<span>CLICK FOR MORE INFORMATION</span>
						</div>
					</router-link>
				</li>
			</ul>
		</div> -->
	</div>
</template>

<script>
	import _ from 'lodash';

	export default {
		name: 'Home',
		computed:{
			categories(){
				return this.$store.state.categories;
			}
		},
		created(){
			this.$store.dispatch('clearShow');
		},
		methods:{
			getRows(){
				// return [
				// 	[this.categories[0],this.categories[2]],
				// 	[this.categories[1]]
				// ]
				return [
					[this.categories[0]],
					[this.categories[1],this.categories[2]]
				];
			},
			getShows(arr){
				return _.flatMap(arr, (c)=>c.shows );;
			},
			getSize(cat,row){
				const sl = this.getShows(row).length;
				const cl = cat.shows.length;
				return (cl/sl * 100)+'%';
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.menu{
		// .diagonal{
		// 	transform: translateX(0%);
		// 	transition: all $transition-speed $transition-ease;
		// }

		&.animate-enter-active, &.animate-leave-active {
			opacity: 1;
			transform: translateY(0%);
			transition: all $transition-speed $transition-ease;

			// .diagonal{
  		// 	transform: translateX(150%);
			// }
		}

		&.animate-enter, &.animate-leave-to {
			opacity: 0;
			transform: translateY(-100%);
		}
	}

	.menu{
		display: flex;
		flex-direction: column;

		.textlinks{
			//display: none;
			display: flex;
			flex-direction: column;
			height: 100%;

			// @include portait(){
			// 	display: flex;
			// }
			//
			// @include mobile(){
			// 	display: flex;
			// }

			li{
				display: flex;
				align-items: center;
				justify-content: center;

				&.title{
					background: $white-linear-gradient;
					height: 5vh;
					text-transform: uppercase;
					font-weight: 700;
					letter-spacing: 3px;

					//@include portait(){
						font-size: 24px;

					//}

					@include mobile(){
						font-size: 16px;
					}
				}

				&.show{
					flex-grow: 1;
					border-bottom: $border-gold;
				}

				&:last-child{
					border-bottom: none !important;
				}

				a{
					color: $light-grey;
					text-transform: uppercase;
					letter-spacing: 3px;
					font-weight: 300;
					text-align: center;

					//@include portait(){
						font-size: 24px;
						line-height: 24px;
					//}

					@include mobile(){
						font-size: 16px;
						line-height: 18px;
					}

					&:hover{
						color: $white;
					}
				}
			}
		}

		.category{
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			position: relative;

			@include portait(){
				display: none;
			}

			@include mobile(){
				display: none;
			}

			.title{
				background: $white-linear-gradient;
				height: $show-header-height;
				box-shadow: 0 5px 5px rgba($black,.15);
				z-index: $showmenu-z;
				position: relative;

				display: flex;
				align-items: center;
				justify-content: space-between;


				h2{
					font-size: 24px;
					font-weight: 300;
					padding: 0 15px;
				}
			}



			&:last-child{
				margin-bottom: 0;
			}

			ul{
				position: relative;
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				background: $black;
				overflow: hidden;


				li{
					align-self: stretch;
					flex-grow: 1;
					position: relative;
					transition: all $transition-speed $transition-ease;

					@include portait(){
						width: 100%;
						border-bottom: $border-gold;
					}

					&:last-child{
						border-right: 0;
					}
					//width: 20%;


					a{
						display: block;
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						background-repeat: no-repeat;
						background-size: cover;
						background-position: center center;
						position: relative;
						transform: scale(1);
						transition: all $transition-speed $transition-ease;
						box-shadow: 0;

						// border-right: 1px solid $black;

						&:after{
							content: "";
							display: block;
							width: 100%;
							height: 100%;
							background: $black;
							top: 0; bottom: 0;
							left: 0; right: 0;
							position: absolute;
							z-index: 0;
							opacity: 0;

							transition: all $transition-speed $transition-ease;

							@include panel(){
								opacity: .55;
							}
						}

						&>div{

							z-index: 10;
							position: absolute;
							text-align: center;
							width: 100%;

							.name{
								display: none;
								color: $white;
								text-transform: uppercase;
								letter-spacing: 3px;
								font-weight: 700;
								font-size: 36px;


							}

							.titleart{
								width: 250px;
								height: 50px;
								margin: auto;
								margin-bottom: 10px;
								opacity: 0;
								transition: all $transition-speed $transition-ease;
								background-position: center center;
								background-repeat: no-repeat;
								background-size: contain;


								@include panel(){
									opacity: 1;
									width: 80%;
									height: 40px;
									margin-bottom: 0;
								}
							}


							span{
								display: block;
								color: $white;
								font-size: 26px;
								text-transform: uppercase;
								letter-spacing: 1px;
								opacity: 0;

								transition: all $transition-speed $transition-ease;

								@include panel(){
									display: none;
								}

								&:last-child{
									font-size: 14px;
									font-weight: 300;
									color: $light-grey;
								}
							}
						}
					}

					&:hover{
						flex-grow: 1.2;

						@include panel(){
							flex-grow: 1;
						}


						a{
							//transform: scale(1.1);
							box-shadow: $box-shadow;


							&:after{
								opacity: .55;
							}

							&>div{
								.titleart{
									opacity: 1;
									transition: all $transition-speed $transition-ease $transition-speed;
								}

								span{
									opacity: 1;

									transition: all $transition-speed $transition-ease $transition-speed;

									&:last-child{
										transition: all $transition-speed $transition-ease $transition-speed*2;
									}
								}

							}
						}
					}
				}
			}
		}
	}
</style>
