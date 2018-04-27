<template>
	<div class="home">
		<Viewer />
		<Panel />
	</div>
</template>

<script>
	import Viewer from './viewer/Viewer';
	import Panel from './panel/Panel';

	export default {
		name: 'Home',
		components: {
			'Viewer': Viewer,
			'Panel': Panel
		},
		created(){
			this.$store.dispatch('clearShow');

			if ( !this.$route.params.page ) this.$store.dispatch("setPage", 0 );
		}
	}
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";

	.home{

	}
</style>
