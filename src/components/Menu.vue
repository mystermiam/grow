<template>
  <div id="carrousel">

        <carousel-3d style="height: 500px;">

      <!--   <slide v-for="(slide, i) in slides" :index="i">
          <span class="title">You know</span>
          <p>You know, being a test pilot isn't always the healthiest business in the world.</p>
        </slide> -->

          <slide id="firstSlide" :index="0" style="height:400px; width:500px;">
            <h1 @click="goTaverne()"> Tavern </h1>
          </slide>

          <slide id="secondSlide" :index="1" style="height:400px; width:500px;">
            <h1> Our Vision </h1>
          </slide>

          <slide id="thirdSlide" :index="2" style="height:400px; width:500px;">
            <h1 @click="goGame()"> Game Land  </h1>
          </slide>
        </carousel-3d>


          <img id="imgsrc" src="../../public/assets/homePage/logo.png" alt="grow logo" />
  </div>
</template>


<script>


//import { Carousel3d, Slide } from 'vue-carousel-3d'
import router from 'vue-router'

export default {
  name : 'App',
  components: {
    Carousel3d :  () => import("../../node_modules/vue-carousel-3d/src/Carousel3d.vue"),
    Slide : () => import('../../node_modules/vue-carousel-3d/src/Slide.vue')
  },
  methods: {
    goTaverne() {
      this.$router.push({
        name:'taverne'
      });
    },
    goGame() {
      this.$router.push({
        name: 'auth'
      });
    }
  }
};

</script>



<style>
#carrousel {
    background: url("../../public/assets/homePage/main2.jpg");
        background-size: auto auto;
    width: 100%;
    height: 100%;
    background-size: cover;
    overflow : hidden;
}

#firstSlide{
  cursor : pointer;
  background: url('../../public/assets/homePage/taverne.jpg');
  background-size : 100% 100%;
}


#secondSlide{
  cursor : pointer;
  background: url('../../public/assets/homePage/game.jpg');
  background-size : 100% 100%;
}

#thirdSlide{
  cursor : pointer;
  background: url('../../public/assets/homePage/gam.jpg');
  background-size : 100% 100%;
}

.carousel-3d-container[data-v-c06c963c]{
  height: 500px;
  margin : 60px 0px;
}
.carousel-3d-slider[data-v-c06c963c]{
  margin: auto 520px;
}


h1{
  position: absolute;
  left: 40%;
  top: 0%;
  color: #ce21d3;
  text-shadow: 3px 1px 5px cornsilk;
}


#imgsrc{
  position: absolute;
  left: 35%;
  width: 30%;
  top: 69%;
}
</style>
