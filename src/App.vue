<template>
	<div id="app">
		<Header />
		<div id="content">
			<transition name="animate">
				<ShowMenu />
			</transition>
			<div class="wrapper" :class="{showpage:show}">
				<transition name="animate">
					<router-view />
				</transition>
			</div>
		</div>
		<Footer />
  	</div>
</template>

<script>
	import Header from '@/components/header/Header';
	import Footer from '@/components/footer/Footer';
	import ShowMenu from '@/components/showmenu/ShowMenu';

	export default{
		name: 'App',
		components:{
			'Header': Header,
			'Footer': Footer,
			'ShowMenu': ShowMenu
		},
		computed: {
			menu(){
				return this.$store.state.menu;
			},
			show(){
				return this.$store.state.show;
			}
		},
		created(){
			this.routes(this.$route);
		},
		mounted(){
			this.onResize();
      window.addEventListener("resize", this.onResize)
		},
		destroyed(){
			window.removeEventListener("resize", this.onResize)
		},
		watch:{
			'$route'(t,f){
				this.routes(t);
			}
		},
		methods:{
			routes(t) {
				if (t.params.safename) this.$store.dispatch("setShow", t.params.safename );
				if (t.params.episode) this.$store.dispatch("setEpisode", t.params.episode );
				if (t.params.page) this.$store.dispatch("setPage", t.params.page );
				this.$store.dispatch("isAuthenticated", this.$auth);

				if ( t.path.substr(0,14) === "/access_token=" ){
					this.$auth.handleCallback((pass)=>{
						if (pass){
							const redirect = `/show/${this.$cookies.get("fycshow")}/episode/${this.$cookies.get("fycepisode")}`;
							this.$router.replace(redirect);
						} else {
							this.$router.push("/");
						}
					});
				}
    	},
			onResize(){
				this.$store.dispatch("setSize", {
						width: window.innerWidth,
						height: window.innerHeight,
						ratio: window.innerWidth/window.innerHeight
				});
			}
		}
	}
</script>

<style lang="scss">
	@import 'styles/bootstrap.scss';
	@import 'styles/globals.scss';
	@import 'styles/type.scss';
	@import 'styles/variables.scss';

	#app{
		position: relative;
		height: 100%;
		width: 100%;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
	}

	#content{
		position: relative;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		background: $black;

		.wrapper{
			width: 100%;
			height: 100%;
			// position: absolute;
			// top: 0;
			flex-grow: 1;
			position: relative;

			&>div{
				width: 100%;
				height: 100%;
				position: absolute;
				background-position: top center;
				background-repeat: no-repeat;
				background-size: cover;

				overflow-y: auto;
				overflow-x: hidden;

				@include mobile(){
					background: $black !important;
				}
			}

			// &.showpage{
			// 	&>div{
			// 		padding-top: $show-header-height;
			// 	}
			// }
		}
	}
</style>
