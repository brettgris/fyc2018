<template>
	<div class="trailer fullvideo fitonmobile" v-if="show">
		<video
			ref="videoplayer"
			:autoPlay="!controls"
			playsInline
			:src="trailer"
			:controls="controls"
			:poster="show.key.horizontal"
		/>
	</div>
</template>

<script>
	export default {
		name: 'Trailer',
		data(){
			return{
				controls: false
			}
		},
		computed:{
			show(){
				return this.$store.state.show;
			},
			trailer(){
				return this.show.trailer;
			}
		},
		mounted(){
			this.$autoplay.video().then( ({result})=>{
				this.controls = !result;
			});
		}
		// mounted(){
		// 	const vp = this.$refs.videoplayer;
		// 	if (vp) vp.addEventListener("ended", this.onVideoEnded);
		// },
		// destroyed(){
		// 	const vp = this.$refs.videoplayer;
		// 	if (vp) vp.removeEventListener("ended", this.onVideoEnded);
		// },
		// methods:{
		// 	onVideoEnded(){
		// 		this.$router.push(`/show/${this.show.safename}/episodes`);
		// 	}
		// }
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
		overflow: hidden;
	}
</style>
