<template>
  <li v-if="episode" class="episode" :class="[className]" :style="{width:size}">
    <router-link :to="{path:`/show/${show.safename}/episode/${episode.number}`}" class="link">
      <div class="image">
        <div :style="{backgroundImage:`url(${episode.image})`}">
          <span class="playicon"><FontAwesomeIcon :icon="['fas','play-circle']" /></span>
        </div>
      </div>
      <div class="copy">
        <h4>{{episode.number}} - {{episode.title}}</h4>
        <p>{{episode.description}}</p>
      </div>
    </router-link>
  </li>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

  export default {
    name: 'Episode',
    components: {
      'FontAwesomeIcon': FontAwesomeIcon
    },
    props:['id','className','itemsPerPage'],
    computed:{
      show(){
        return this.$store.state.show;
      },
      episode(){
        return this.show.episodes[this.id]
      },
      size(){
        const p = 1/this.itemsPerPage * 100;
        return p + '%';
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  li{
    padding: 0 15px;

    .image{
      position: relative;
      overflow: hidden;

      &>div{
        padding-top: 766/1362 * 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        box-shadow: $box-shadow;
        border: 2px solid $black;


        span{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity $transition-speed $transition-ease;
          color: $white;

          font-size: 48px;
        }
      }
    }

    .copy{
      h4{
        color: $white;
        text-align: left;
        font-size: 24px;
        margin-bottom: 10px;
        margin-top: 15px;

        @include mobile(){
          font-size: 18px;
        }
      }


      p{
        color: $light-grey;
        text-align: left;
        font-size: 14px;
        line-height: 18px;
      }
    }

    @media (pointer: fine) {
      &:hover{
        .image{
          span{
            opacity: $episode-play-opacity;
          }
        }
      }
    }
  }
</style>
