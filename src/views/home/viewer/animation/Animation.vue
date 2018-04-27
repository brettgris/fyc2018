<template>
  <router-link class="stage" ref="stage" v-if="show" :to="{ path:`/show/${show.safename}` }"
    :style="{backgroundImage:`url(${backgroundImage})`}"
  >
    <div class="scene overlay"
      ref="overlay"
    >
      <div>

        <div class="content">
          <div
            class="intro"
            ref="intro"
          >
            <div class="fyc" ref="fyc"></div>
            <div class="title-art"
              ref="titleart"
              :style="{backgroundImage:`url(${show.titleartwhite})`}"
            ></div>
          </div>
          <ul class="image-list"
            ref="imagelist"
          >
            <li v-for="item in show.intro">
              <div :style="{backgroundImage:`url(${item}`}"></div>
            </li>
          </ul>

          <div class="quotes">
            <ul class="quote-list"
              ref="quotelist"
            >
              <li class="title-art" :style="{backgroundImage:`url(${show.titleartwhite})`}">
              </li>
              <li v-for="quote in show.acclaim" class="quote" >
                <h3 v-html=" `${quote.quote}` " :style="quote.style">

      					</h3>
      					<h6 v-if="quote.by">{{quote.by}}</h6>
                <h5 v-else></h5>
              </li>
              <li class="quote">
                <router-link class="button" content="Learn More" :to="{ path:`/show/${show.safename}`}">Learn More</router-link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
  import {TweenLite, TimelineLite} from 'gsap';

  export default {
    name: 'Animation',
    props: ['show', 'complete'],
    data(){
      return {
        timeline: null,
        currentshow: null
      }
    },
    computed:{
      backgroundImage(){
        if (this.$store.state.size.ratio<1) return this.show.backgrounds.vertical;
        else return this.show.backgrounds.key;
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
        if (this.show.safename != this.currentshow){
          this.currentshow = this.show.safename;

          this.timeline.clear();

          this.timeline

            .fromTo( this.$refs.overlay, .5, {opacity: 0}, {opacity:1,delay:.5})
            .fromTo( this.$refs.fyc, .5, {opacity: 0}, {opacity:1})
            .fromTo( this.$refs.titleart, .5, {opacity:0, marginTop:0},{ opacity:1, marginTop:20, delay:.5 } )
            .fromTo( this.$refs.intro, .5, {opacity:1}, {opacity:0,delay:3})

            .staggerFromTo( this.$refs.imagelist.children, .5, { opacity: 0}, {opacity:1}, .25 )
            .from(  this.$refs.imagelist, .5, { borderColor:'rgba(0,0,0,0)', boxShadow:'0px 0px 0px rgba(0,0,0,0)' } )
            .fromTo(  this.$refs.imagelist, .5, {opacity:1},{opacity: 0, delay: 3})

            .staggerFromTo( this.$refs.quotelist.children, .5, { opacity: 0}, {opacity:1}, .35 )
            .call(this.complete, [], this, "+=5");

          this.timeline.play();
        }
      },
      clearHeight(){
        this.$refs.imagelist.style.height = 'auto';
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  $scene-width: 65%;

  .stage{
    //background: rgba(yellow, .1);
    width: 100%;
    height: 100%;
    top:0;
    position: absolute;
    display: block;
    z-index: 10;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    .scene{
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;


      &>div{
        width: 100%;
        position: relative;
        z-index: 10;
      }
    }

    .intro {
      position: absolute;
      width: 100%;
      height: 100%;
      top:0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 5;
    }

    .fyc{
      width: 100%;
      background-image: url(~@/assets/images/fyc.svg);
      height: 35px;
      background-repeat: no-repeat;
      background-position: center center;

      @include portait(){
        height: 25px;
      }

      @include laptop(){
        height: 25px;
      }


      @include mobile(){
        height: 20px;
      }
    }

    .title-art{
      text-align: center;
      width: 65%;
      margin: auto;
      height: 75px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      margin-bottom: 15px;
      margin-top: 15px;

      @include portait(){
        height: 50px;
        width: 80%;
      }

      @include laptop(){
        height: 40px;
      }

      @include mobile(){
        height: 40px;
        width: 100%;
        margin-bottom: 10px;
      }
    }

    .content{
      position: relative;
      width: $scene-width;
      margin: auto;

      @include laptop(){
        width: 50%;
      }

      @include mobile(){
        width: 70%;
      }
    }

    .image-list{
      display: flex;
      flex-wrap: wrap;
      position: relative;
      overflow: hidden;
      border: 1px solid $black;
      box-shadow: $box-shadow;

      @include mobile(){
        margin-top: 10px;
      }

      li{
        width: 1/3 * 100%;
        position: relative;

        @include portait(){
          width: 1/2 * 100%;
        }

        @include mobile(){
          width: 1/2 * 100%;
        }

        &>div{
          padding-top: 316/442 * 100%;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        }
      }
    }


    .quotes{
      position: absolute;
      width: 100%;
      height: 100%;
      top:0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .quote-list{
      width: 90%;
      position: relative;
      z-index: 10;

      a{
        display: inline-block;
      }
    }
  }
</style>
