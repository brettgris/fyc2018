<template>
	<div class="next overlay" v-if="ready" :style="{backgroundImage:`url(${show.backgrounds.next})`}">
		<div class="content">
			<div class="nextitem">
				<h3>Starts in <span>{{time}}</span> Seconds</h3>
				<router-link class="copy" :to="{path:`/show/${show.safename}/episode/${next.number}`}">
					<div class="image">
						<div :style="{backgroundImage:`url(${next.image})`}">
							<span><FontAwesomeIcon :icon="['fas','play-circle']" /></span>
						</div>
					</div>
					<div class="description">
						<h4>{{next.number}} - {{next.title}}</h4>
						<p>{{next.description}}</p>
						<a class="button" content="Watch Now">Watch Now</a>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

	export default{
		name: 'Next',
		components:{
			'FontAwesomeIcon': FontAwesomeIcon
		},
		data(){
			return{
				time: 15,
				timer: null
			}
		},
		computed:{
			show(){
				return this.$store.state.show;
			},
			next(){
				return this.$store.state.next;
			},
			ready(){
				return (this.show&&this.next);
			}
		},
		created(){
			if (!this.next) {
				if(this.show.episodes && this.show.episodes.length>1) this.$router.push( `/show/${this.show.safename}/episodes` );
				else this.$router.push( `/show/${this.show.safename}` );
			} else {
				this.timer = setInterval(this.handleTime, 1000);
			}
		},
		destroyed(){
			clearInterval( this.timer );
		},
		methods:{
			handleTime(){
				this.time -= 1;
				if (this.time===0){
					clearInterval( this.timer );
					this.$router.push( `/show/${this.show.safename}/episode/${this.next.number}` );
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.next{
		.nextitem{
			opacity: 1;
			transform: translateY(0%);
			transition: all $transition-speed $transition-ease;
		}

		&.animate-enter-active, &.animate-leave-active {
			transition: all $transition-speed $transition-ease;

			.nextitem{
				opacity: 0;
  			transform: translateY(-100%);
			}
		}

		&.animate-enter, &.animate-leave-to {
			opacity: 0;
		}
	}

	.next{
		.content{
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 2;
			top: 0; bottom: 0;
			left: 0; right: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			&>div{
				width: 60%;
				color: $white;

				h3{
					text-transform: uppercase;
					font-size: 28px;
					letter-spacing: 1px;
					margin-bottom: 15px;
					text-align: center;

					@include mobile(){
						font-size: 21px;
					}

					span{
						color: $gold;
						font-size: 42px;

						@include mobile(){
							font-size: 30px;
						}
					}
				}

				.copy{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					@include small(){
						display: block;
					}

					&>div{
						width: 50%;
						position: relative;

						@include small(){
							width: 100%;
						}

						&.image{
							@include small(){
								margin-bottom: 10px;
							}
							&>div{
								padding-top: 766/1362 * 100%;
								background-repeat: no-repeat;
								background-size: cover;
								background-position: center center;
								box-shadow: $box-shadow;
								border: 2px solid $black;

								span{
									position: absolute;
									top: 0;
									left: 0;
									width: 100%;
									height: 100%;
									display: block;
									display: flex;
									align-items: center;
									justify-content: center;
									opacity: 0;
									transition: opacity $transition-speed $transition-ease;
									color: $white;

									font-size: 48px;
								}
							}
						}

						&.description{
							padding-left: 15px;
							@include mobile(){
								text-align: center;
							}

							h4{
								color: $white;
								text-align: left;
								font-size: 24px;
								margin-bottom: 10px;

								@include mobile(){
									font-size: 18px;
									text-align: center;
								}
							}

							p{
								color: $light-grey;
								text-align: left;
							}

							a{
								color: $white;
								width: auto;
								display: inline-block;
								margin-top: 15px;
							}
						}
					}

					&:hover{
						.image{
							span{
								opacity: $episode-play-opacity;
							}
						}
					}
				}
			}

		}
	}
</style>
