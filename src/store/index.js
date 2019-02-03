import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

//Pomodoro Modules

import timer from './modules/pomodoro/timer'
import chat from './modules/pomodoro/chat'
import session from './modules/pomodoro/session'
import distractionList from './modules/pomodoro/distractionList'
import sessionTitleList from './modules/pomodoro/sessionTitleList'
import pomodoroSettings from './modules/pomodoro/pomodoroSettings'

//Landing Page Modules
import landingPage from './modules/homepage/landingPage'


import axios from 'axios'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
    namespaced : true,
    modules : {
        timer,
        chat,
        distractionList,
        sessionTitleList,
        landingPage,
        session,
       /* avatar,
        pets,
        dailies,
        toDo,
        progressBar,
        pomodoroSettings,
        game,
        player,
        dialogue,
        createNPCs,
        loadInterface,
        quests,*/
    },
    state : {

    },
    actions : {
  
    },
    getters : {

    },
    mutations : {
      
    }
});

export default store