<template>
  <div class="documentaries">
    <ul ref="doclist">
      <li v-for="show in shows" >
        <router-link class="key ":to="{path:`/show/${show.safename}`}" :style="{backgroundImage:`url(${show.key.vertical})`}">
          <div>
            <a class="button" content="Learn More">Learn More</a>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    import _ from 'lodash';
    import {TweenLite, TimelineLite} from 'gsap';

    export default {
      name: 'Documentaries',
      props: ['complete'],
      computed:{
        shows(){
          const shows = _.filter( this.$store.state.shows, (show)=>show.documentary===true );
          return shows;
        }
      },
      mounted(){
        this.timeline = new TimelineLite();

        this.changeShow();
      },
      updated(){
        this.changeShow();
      },
      destroyed(){
        this.timeline.kill();
      },
      methods:{
        changeShow(){
          this.timeline.clear();

          this.timeline
            .staggerFromTo( this.$refs.doclist.children, .5, { opacity: 0}, {opacity:1}, .35 )
            .call(this.complete, [], this, "+=8");

          this.timeline.play();
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .documentaries{
    width: 100%;
    height: 100%;
    position: absolute;
    background: $black;
    background-image: url(~@/assets/images/background.jpg);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
  }

  ul{
    width: 65%;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    li{
      flex-grow: 1;
      margin-right: 15px;
      position: relative;
      opacity: 0;
      transition: all $transition-speed $transition-ease;

      @include small(){
        width: 100%;
      }

      &:last-child{
        margin-right: 0;
      }

      &:hover{
        flex-grow: 1.1;
      }

      .key{
        display: block;
        padding-top: 1500/1007 * 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        position: relative;

        &>div{
          position: absolute;
          z-index: 2;
          width: 101%;
          height: 101%;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba($black,.65);
          opacity: 0;
          transition: opacity $transition-speed $transition-ease;

          a{
            color: $white;
            opacity: 0;
            transition: opacity $transition-speed $transition-ease;
          }
        }

        @media (pointer: fine) {
          &:hover{
            &>div{
              opacity: 1;

              a{
                opacity: 1;
                transition: opacity $transition-speed $transition-ease $transition-speed;
              }
            }
          }
        }
      }
    }
  }
</style>
