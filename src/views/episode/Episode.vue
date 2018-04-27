<template>
	<div class="episode">
		<div>
			<Player v-if="auth"/>
		</div>
	</div>
</template>


<script>
	import Player from './player/Player';

	export default {
		name: 'Episode',
		components:{
			'Player': Player
		},
		computed:{
			auth(){
				return this.$auth.loggedIn();
			}
		},
		created(){
			this.getEpisodeData();
		},
		watch:{
			'$store.state.show'(t,f){
				this.getEpisodeData()
			},
			'$store.state.episode'(t,f){
				this.getEpisodeData()
			}
		},
		methods:{
			getEpisodeData(){
				if (this.$store.state.show&&this.$store.state.episode){
					const safename = this.$store.state.show['safename'];
					const number = this.$store.state.episode['number'];

					if (this.$auth.loggedIn()){
						if (safename&&number){
								this.$store.dispatch("getData", {
									token: this.$auth.getToken(),
									show: safename,
									episode: number,
									callback: (pass)=>{
										this.$router.push("/show/"+safename);
									}
								},);
							} else this.$router.push("/");
					} else {
						if (safename) this.$router.push("/show/"+safename+"/login");
						else this.$router.push("/login");
					}
				} else this.$router.push("/");
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/variables.scss';

	.episode{
		&>div{
			width: 100%;
			height: 100%;
			position: relative;
		}
	}
</style>
