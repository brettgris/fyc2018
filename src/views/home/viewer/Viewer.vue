<template>
	<div class="viewer">
		<div class="view">
			<Animation :show="show" :complete="onVideoEnded" v-if="route!=='documentaries'"/>
			<Documentaries v-else :complete="onVideoEnded" />

			<div class="arrows">
				<router-link class="arrow" :to="{ path: `${prev}`}">
					<FontAwesomeIcon :icon="['fal','arrow-circle-left']" />
				</router-link>
				<router-link class="arrow" :to="{ path: `${next}`}">
					<FontAwesomeIcon :icon="['fal','arrow-circle-right']" />
				</router-link>
			</div>
		</div>
		<div class="spacer"></div>
	</div>
</template>

<script>
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
	import Animation from './animation/Animation';
	import Documentaries from './documentaries/Documentaries';

	import _ from 'lodash';

	export default {
		name: 'Viewer',
		components:{
			'FontAwesomeIcon': FontAwesomeIcon,
			'Animation': Animation,
			'Documentaries': Documentaries
		},
		computed:{
			shows(){
				const shows = _.filter( this.$store.state.shows, (d)=>{
					return (d.intro!==false)
				})

				return shows;
			},
			page(){
				return this.$store.state.page;
			},
			show(){
				return this.shows[this.page];
			},
			route(){
				return this.$store.state.route.name;
			},
			next(){
				if (this.route==='documentaries') return '/video/0';
				else {
					const n = this.page + 1;

					if (n<this.shows.length) return `/video/${n}`;
					else return '/documentaries';
				}
			},
			prev(){
				const n = this.page-1;

				if (this.route==='documentaries') return `/video/${this.shows.length - 1}`;
				else {
					if (n<0) return '/documentaries';
					else return `/video/${n}`;
				}
			},

		},
		methods:{
			onVideoEnded(){
				this.$router.push( `${this.next}` );
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.viewer{
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.view{
			flex-grow: 1;
			position: relative;
			background: $black;
		}

		.spacer{
			background: $black;
			height: $home-panel-height;
			width: 100%;

			@include panel(){
				display: none;
			}
		}

		.arrows{
			width: 100%;
			height: 100%;
			top:0;
			position: absolute;
			z-index: 10;
		}
	}
</style>
