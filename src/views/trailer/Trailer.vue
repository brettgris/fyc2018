<template>
	<div class="trailer" v-if="show" ref="trailer">
		<div :style="style">
			<iframe  v-if="trailerpath" :src="trailerpath" frameBorder="0" ></iframe>
			<video
				v-else
				ref="videoplayer"
				:autoPlay="!controls"
				playsInline
				:src="trailer"
				:controls="controls"
				:poster="show.key.horizontal"
			/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Trailer',
		data(){
			return{
				controls: false,
				size:{
					width: 1024,
					height: 768,
					ratio: 1024/768
				}
			}
		},
		computed:{
			show(){
				return this.$store.state.show;
			},
			trailerpath(){
				return this.show.traileriframe;
			},
			trailer(){
				return this.show.trailer;
			},
			style(){
				if (this.size.ratio>1.7){
					return {
						height: `${this.size.height}px`,
						width: `${this.size.height*16/9}px`
					}
				} else{
					return {

						width: `${this.size.width}px`,
						height: `${this.size.width*9/16}px`,
					}
					// return {
					// 	width: this.size.width
					// }
				}
			}
		},
		mounted(){
			this.$autoplay.video().then( ({result})=>{
				this.controls = !result;
			});

			window.addEventListener("resize", this.onResize);
			this.onResize();
		},
		destroyed(){
			window.removeEventListener("resize", this.onResize);
		},
		methods:{
			onResize(){
				const t = this.$refs.trailer;

				this.size =  {
					width: t.offsetWidth,
					height: t.offsetHeight,
					ratio: t.offsetWidth/t.offsetHeight
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.trailer{
		&.animate-enter-active, &.animate-leave-active {
			transition: all $transition-speed*2 $transition-ease;

			// .diagonal{
			// 	transform: translateX(0%);
			// 	transition: all $transition-speed $transition-ease $transition-speed;
			// }
		}

		&.animate-enter, &.animate-leave-to {
			opacity: 0;

			// .diagonal{
  		// 	transform: translateX(150%);
			// }
		}
	}

	//.page in globals

	.trailer{
		background: $black;
		color: $white;
		overflow: hidden !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	iframe, video{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
