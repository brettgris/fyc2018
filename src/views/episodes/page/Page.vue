<template>
  <ul :class="{ reverse: direction==='reverse' }">
    <Episode :id="ids[0]" :className="'firstepisode'" :itemsPerPage="itemsPerPage"/>
    <Episode :id="ids[1]" :className="'secondepisode'" :itemsPerPage="itemsPerPage" v-if="itemsPerPage>1"/>
    <Episode :id="ids[2]" :className="'thirdepisode'" :itemsPerPage="itemsPerPage" v-if="itemsPerPage>2"/>
  </ul>
</template>

<script>
  import Episode from './episode/Episode';

  export default {
    name: 'Page',
    components: {
      'Episode': Episode
    },
    props:['direction','itemsPerPage'],
    computed:{
      page(){
        return this.$store.state.page;
      },
      ids(){
        return [ this.itemsPerPage*this.page + 0, this.itemsPerPage*this.page + 1, this.itemsPerPage*this.page + 2 ];
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  ul{
    width: 100%;
  	display: flex;
    // height: 475px;
    position: absolute;
    transform: translateX(0%) translateY(-50%);
    top: 0;
    opacity: 1;

    &.animate-enter-active, &.animate-leave-active {
      pointer-events: none;
      transition: all $transition-speed $transition-ease;
    }

    &.animate-enter /* .fade-leave-active below version 2.1.8 */ {
      transform: translateX(100%) translateY(-50%);
      opacity: 0;
    }

    &.animate-leave-to{
      transform: translateX(-100%) translateY(-50%);
      opacity: 0;
    }

    &.animate-enter.reverse{
      transform: translateX(-100%) translateY(-50%);
    }

    &.animate-leave-to.reverse{
      transform: translateX(100%) translateY(-50%);
      opacity: 0;
    }
  }
</style>
