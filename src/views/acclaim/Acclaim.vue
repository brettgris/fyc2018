<template>
	<div class="acclaim" v-if="show" :style="{backgroundImage:`url(${backgroundImage})`}">
		<div class="copy diagonal left reverse">
			<div>
				<div class="fyc"></div>
				<div v-for="quote in show.acclaim" class="quote reverse">
					<h3 v-html=" `${quote.quote}`">

					</h3>
					<h6 v-if="quote.by">{{quote.by}}</h6>
					<h5 v-else></h5>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Acclaim',
		computed:{
			show(){
				return this.$store.state.show;
			},
			backgroundImage(){
				if (this.$store.state.size.width<900&&this.$store.state.size.height>800) return this.show.backgrounds.acclaimtab;
				else return this.show.backgrounds.acclaim;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.acclaim{
		.diagonal{
			opacity: 1;
			transform: translateX(0%);
			transition: all $transition-speed $transition-ease;
		}

		&.animate-enter-active, &.animate-leave-active {
			transition: all $transition-speed $transition-ease;

			.diagonal{
				opacity: 0;
  			transform: translateX(-150%);
			}
		}

		&.animate-enter, &.animate-leave-to {
			opacity: 0;
		}
	}

	.acclaim{

		.diagonal{
			display: flex;
			align-items: center;
			justify-content: center;

			@include mobile(){
				display: block;
			}
		}

		.fyc{
      width: 100%;
      background-image: url(~@/assets/images/fyc.svg);
      height: 35px;
      background-repeat: no-repeat;
      background-position: center center;
			margin-bottom: 25px;

      @include portait(){
        height: 25px;
      }

      @include laptop(){
        height: 25px;
      }


      @include mobile(){
        height: 15px;
      }
    }

		.quote{
			width: 90%;
			margin-left: auto;
			margin-right: auto;

			@include portait(){
				width: 70%;
			}
		}
	}
</style>
