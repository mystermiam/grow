<template>
   <div>
  <div id='first-sec'>
    <div id="container-img">
      <span id="grow-img"></span>
      <div id="authentification" @click="METHOD_TO_CREATE"></div>
    </div>
    <!-- <a href="#second-sec" @click="enterWebsite"><img src="../../../static/images/scroll.gif" class="scrollDown"></a> -->
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
    ...mapActions('landingPage',{
         someAction: 'someAction',

    })
  }


};

</script>


<style scoped>
#first-sec{
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
  font-size: 3em;
  margin: 0.1em auto;
}

.thanks{
  font-size:1.5em;
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

.scrollDown {
  position: absolute;
  top: 80%;
  left: 42%;
  width: 16%;
  height: 25%;
}
</style>