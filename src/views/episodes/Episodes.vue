<template>
	<div class="episodes overlay" v-if="ready" :style="{backgroundImage:`url(${show.backgrounds.episodes})`}">
		<div>

				<router-link class="arrow" :to="{path:`/show/${show.safename}/episodes/${prev}`}" v-if="prev!==page">
		      <FontAwesomeIcon :icon="['fal','arrow-circle-left']" v-on:click="setDirection('reverse')" />
		    </router-link>


				<div class="slider">
					<transition  name="animate">
						<Page :key="pagekey" :direction="direction" :itemsPerPage="itemsPerPage" />
					</transition>
				</div>

				<router-link class="arrow" :to="{path:`/show/${show.safename}/episodes/${next}`}" v-if="next!==page" >
		      <FontAwesomeIcon :icon="['fal','arrow-circle-right']" v-on:click="setDirection('forward')" />
		    </router-link>

		</div>
	</div>
</template>

<script>
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
	import Page from './page/Page';

	export default {
		name: 'Episodes',
		data(){
			return {
				direction: 'forward'
			}
		},
		components:{
			'FontAwesomeIcon': FontAwesomeIcon,
			'Page': Page
		},
		computed:{
			show(){
				return this.$store.state.show;
			},
			ready(){
				return (this.$store.state.show&&this.$store.state.show.episodes)
			},
			page(){
				return this.$store.state.page;
			},
			pagekey(){
				return "page"+this.page;
			},
      episodes(){
        return this.show.episodes;
      },
      max(){
        return Math.ceil( this.episodes.length / this.itemsPerPage ) - 1;
      },
      next(){
        return (this.page + 1 <= this.max) ? this.page+1 : 0;
      },
      prev(){
        return (this.page - 1 >= 0) ? this.page - 1: this.max;
      },
			itemsPerPage(){
				const w = this.$store.state.size.width;

				if (w>1024) return 3;
        else if (w>700) return 2;
        else return 1;
			}
		},
		methods:{
			setDirection(direction){
				this.direction = direction;
			}
		}
	}
</script>

<style lang="scss">
	@import "~@/styles/variables.scss";

	//.page in globals

	.firstepisode{
		transform: translateY(0%);
		opacity: 1;
		transition: all $transition-speed $transition-ease;
		transition-delay: .1;
	}

	.secondepisode{
		transform: translateY(0%);
		opacity: 1;
		transition: all $transition-speed+.1 $transition-ease;
	}

	.thirdepisode{
		transform: translateY(0%);
		opacity: 1;
		transition: all $transition-speed+.2 $transition-ease;
	}

	.episodes{
		&.animate-enter-active {
			transition: all $transition-speed $transition-ease;


			.firstepisode, .secondepisode, .thirdepisode{
				transform: translateY(100%);
				opacity: 0;
			}
		}

		&.animate-enter {
			opacity: 0;
		}
	}



	.episodes{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		position: absolute;
		overflow: hidden !important;

		&>div{
			position: relative;
			z-index: 10;
			width: 100%;
			display: flex;
			align-items: center;
			padding: 0 15px;

			.slider{
					flex-grow: 1;
					height: auto;
					position: relative;
			}
		}
	}
</style>
