<template>
   <div>
  <div id='first-sec'>
    <div id="container-img">
      <span id="grow-img"></span>
      <div id="authentification" @click="toMenu"></div>
    </div>
    <div class="entry-footer">
      <div class="content-footer">
        <p class="sorry">Sorry, we're doing some work on the site.</p>
        <p class="thanks">If you are interested in testing the demo, click <router-link to="Game">here</router-link>.</p>
        <div><div class="networks"><span><a href="https://www.facebook.com/GrowPlayground/"><img class="fb-network" src="../../public/assets/fb.png"></a></span><span><a href="mailto:grow.playground@gmail.com"><img class="gmail-network" src="../../public/assets/gmail.png"></a></span></div></div>
      </div>
    </div>
  </div>
</div>
</template>





<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import router from 'vue-router'

export default {
  data(){
    return {
      
    };
  },
  computed: {
   ...mapState('landingPage',{
      showLogin:'showLogin',
      showSignUp: 'showSignUp',
      showSocialModal: 'showSocialModal',

      someOtherState: 'someOtherState'
    }),

  },

  methods: {
    toMenu(){
      this.$router.push({ path: 'menu' });
    }
  }


};

</script>


<style scoped>
#first-sec{
  height: 100%;
  display: flex;
  flex-direction: column;
}

.modal{
  z-index: 99;
}

#container-img{
  height: 75%;
}


#authentification{
  position: sticky;
  z-index: 10;
  left: 34vw;
  height: 75vh;
  width: 32vw;
  cursor:pointer;
}

@media only screen and (max-width: 768px) {
    /* For mobile phones: */
    #authentification {
      position: sticky;
      z-index: 9999;
      left: 20vw;
      height: 75vh;
      width: 60vw;
    }
}





#grow-img{
  position: absolute;
  background-image: url('../../public/assets/home.jpg'); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 100%;
  background-attachment: fixed;
  width : 100%;
  height : 75%;
}

.content-footer{
  display: flex;
  /*flex-wrap: wrap;*/
  flex-direction: column;
  justify-content: center;
  height: 100%;
}


.fb-network{
  align-self: center;
  max-width: 40px;
  max-height: 40px;
  margin:0 0.3em;
}

.gmail-network{
  align-self: center;
  max-width: 40px;
  max-height: 40px;
  margin:0 0.3em;
}

.entry-footer{
  display: flex;
  flex-direction: column;
  font-family : "Courier New", Courier, monospace;
  text-align: center;
  border-top:solid 0.1em black;
  background: #fff;
  max-height: 20%;
}

.sorry{
  font-size: 5vh;
  margin: 0.1em auto;
}

.thanks{
  font-size:2vh;
  margin:0.1em auto 0.1em auto;
}

body {
  margin:0;
  height: 100%;
}

#first-sec {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

</style>