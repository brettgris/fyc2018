<template>
	<div class="panel" v-if="shows">
		<div class="content">
			<div class="slider">
				<ul>
					<li
						v-for="(show,index) in shows"
						v-if="show.intro!==false"
						:class="{selected:index===page&&route!=='documentaries'}"
						:style="{backgroundImage:`url(${show.key.panel})`}"
					>
						<router-link :to="{ path: `/video/${index}` }">
							<span>{{show.name}}</span>
						</router-link>
					</li>
					<li
						class="docs"
						:class="{selected:route==='documentaries'}"
					>
						<router-link to="/documentaries">
							<span>Documentaries</span>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="all">
				<router-link to="/menu">
					VIEW ALL
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import _ from 'lodash';

	export default {
		name: 'Synopsis',
		computed:{
			shows(){
				return this.$store.state.shows;
			},
			page(){
				const page = this.$store.state.page;
				if (page) return page;
				else return 0;
			},
			route(){
				return this.$store.state.route.name;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	$selected-size: 50px;
	$hover-size: 25px;

	.panel{
		height: $home-panel-height+$selected-size;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		width: 100%;
		left: 0;
		right: 0;


		.content{
			height: $home-panel-height;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: $border-gold;
			box-shadow: $box-shadow;
			position: relative;
			z-index: 10;
			color: $white;
			background: $black;

			@include panel(){
				background: transparent;
				height: 15px;
				margin-bottom: 10px;
				border-top: none;
				box-shadow: none;
			}

			.slider{
				position: relative;
				width: 100%;
				height: 100%;

				ul{
					position: absolute;
					height: $home-panel-height;
					display: flex;
					justify-content: center;
					width: 100%;

					@include panel(){
						height: auto;
					}

					li{
						flex-grow: 1;
						background: $black;
						height: $home-panel-height;
						position: relative;
						top: 0;
						border: 1px solid $black;
						width: 1/8*100%;
						transition: all $transition-speed $transition-ease;
						background-size: cover;
						background-repeat: no-repeat;
						background-position: top center;
						overflow: hidden;

						&.docs{
							background:$black-linear-gradient-2;
						}

						@include panel(){
							width: 12px;
							height: 12px !important;
							flex-grow: inherit;
							border-radius: 50%;
							margin-right: 15px;
							top: 0 !important;
							background: $light-grey !important;
							opacity: .5;
							transition: none;
							border: none !important;
						}

						&:last-child{
							@include panel(){
								margin-right: 0px;
							}
						}

						&:after{
							content: "";
							display: block;
							position: absolute;
							background: rgba($black,.75);
							z-index: 1;
							width: 100%;
							height: 100%;
							opacity: 1;
							transition: all $transition-speed $transition-ease;

							@include panel(){
								display: none;
							}
						}

						a{
							position: absolute;
							width: 100%;
							height: 100%;
							z-index: 2;

							&>div{
								position: absolute;
								width: 100%;
								height: 100%;
								z-index: 3;
								opacity: 1;
								background-size: cover;
								background-repeat: no-repeat;
								background-position: center center;

								transition: opacity $transition-speed $transition-ease;
							}

							@include panel(){
								border: none !important;
							}
						}

						span{
							display: block;
							position: absolute;
							width: 100%;
							height: 100%;
							z-index: 10;
							color: $light-grey;
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;
							opacity: .65;
							font-size: 14px;
							line-height: 18px;
							letter-spacing: 1px;
							padding: 0 10px;
							pointer-events: none;

							transition: all $transition-speed $transition-ease;

							@include panel(){
								display: none;
								border: none !important;
							}
						}

						&:hover{
							height: $home-panel-height+ $hover-size;
							top:-1*$hover-size;
							border: 1px solid $black;

							&:after{
								opacity: .75;
							}

							span{
								color: $white;
								opacity: 1;
							}
						}

						&.selected{
							height: $home-panel-height+ $selected-size;
							top:-1*$selected-size;
							border: $border-gold;
							box-shadow: $box-shadow;
							z-index: 100;

							@include panel(){
								border: none;
								opacity: .75;

							}

							a>div{
								opacity: 1;
							}

							&:after{
								opacity: 0;
							}

							span{
								opacity: 0;
							}

							&.docs{
								span{
									opacity: 1;
								}
							}
						}
					}
				}
			}


			.all{
				height: $home-panel-height;
				border-left: $border-gold;
				z-index: 10;

				@include panel(){
					display: none;
				}

				a{
					display: block;
					width: 150px;
					height: $home-panel-height;
					display: flex;
					align-items: center;
					justify-content: center;
					color: $light-grey;
					background: $black-linear-gradient;

					&:hover{
						color:$white;
					}
				}

				&.docs{
					a {
						width: 140px;
						background:$black-linear-gradient-2;
						font-size: 14px;
						line-height: 18px;
						letter-spacing: 1px;
						padding: 0 10px;

					}
				}
			}
		}



	}
</style>
