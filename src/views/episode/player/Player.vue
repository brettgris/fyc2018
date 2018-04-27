<template>
	<video
		id="episodePlayer"
		data-account="1185055426"
		data-player="B1t0D2rYz"
		data-embed="default"
		:data-video-id="videoID"
		class="video-js"
		controls
		ref="videoplayer"
		>
	</video>
</template>

<script>
	export default {
		name: 'Player',
		data(){
			return{
				script: null,
				player: null
			}
		},
		computed:{
			show(){
				return this.$store.state.show;
			},
			next(){
				return this.$store.state.next;
			},
			episode(){
				return this.$store.state.episode;
			},
			videoID(){
				return this.$store.state.videoID;
			}
		},
		watch:{
			'videoID'(t,f){
				this.finished = false;
				if (!this.player) this.loadScript();
				else if(t) this.loadVideo();
			}
		},
		mounted(){
			if( this.videoID ){
				if (!this.player) this.loadScript();
				else console.log( "mounted player already exists" );
			}
		},
		destroyed(){
			var head = document.getElementsByTagName('head')[0];
			try{
				head.removeChild(this.script);
			} catch(e){
				
			}
		},
		methods:{
			loadScript(){
				var head = document.getElementsByTagName('head')[0];
				if(head) this.script = document.createElement('script');
				this.script.type = 'text/javascript';
				this.script.src = "//players.brightcove.net/1185055426/B1t0D2rYz_default/index.min.js";

			   	this.script.onreadystatechange = this.loadPlayer;
			   	this.script.onload = this.loadPlayer;

			   	head.appendChild(this.script);
			},
			loadPlayer(){
				this.player = videojs("episodePlayer");
				this.player.on("ended", this.onVideoEnded);
			},
			loadVideo(){
				this.player.catalog.getVideo(this.videoID, (e,v)=>{
					this.player.catalog.load(v);
				});
			},
			onVideoEnded(){
				this.$router.push( `/show/${this.show.safename}/next` );
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../styles/variables.scss';

	.video-js{
		background-color: $black !important;
		width: 100%;
		height: 100%;
		position: absolute;

		video{
			width: 100%;
			height: 100%;
		}
	}
</style>
