export default {
    namespaced : true,
    
    state : {
        showGoButton: false,
        sessionNumber: 0, // includes breaks


        timeWork: 1500,
        timeShortPause: 300,
        timeLongPause: 900,
        pause: false,

        timeLeft: 0,

        stateOfSession: null,
        numberOfCurrentSession: null,
        numberOfFirstSession: null,
        

        beepTimes: [],
        timerInverval: false,
        timerBlinkAnimation: false,
        bell: new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"),

        timerFullScreen: false,
    },

    actions : {

        goFullScreen({commit}){
          commit('goFullScreen')
        },


        sessionCompleted({rootState, state}){
            // for completed tasks move things up one level
            
            //document.getElementById('sessionTitle').innerHTML = rootState.sessionTitleList.sessions[state.sessionNumber + 2].name

        },


        //Example for how to fetch things from the server 
        fetchTimeLeft({commit, rootState}){
            return new Promise((resolve,reject)=>{
                rootState.fakeBackEnd.getTimeLeft(()=>{
                    commit('setTimeLeft',time);
                    resolve();
                });
            });
        },

        // Set timer in the entry screen
        setTimer({commit, state, rootState, dispatch}, room){

            if(state.timerInterval){
            commit('clearTimer');
            }

            // If you are coming from the entry screen and you clicked on a room
            if (room.length > 0){
                commit({
                  type: 'setTimer',
                  work:  room[0],
                  shortPause: room[1],
                  longPause:  room[2],
                  timeLeft: room[3],
                  stateOfSession: room[4],
                  numberOfCurrentSession: room[5],
                })


            // Incomplete: Calculate beep times (for the fun of beeps) <-- could be moved into mutation, but couldn't bother for now
              state.beepTimes.length = 0;
              let workTime = Math.floor(room[0] / 60);
      
              for(let i = workTime - rootState.pomodoroSettings.beepEveryXMinutes; i >= rootState.pomodoroSettings.beepEveryXMinutes; i -= rootState.pomodoroSettings.beepEveryXMinutes){
                state.beepTimes.push(i * 60);
              }


            // If you created your own room (imperfect)
            } else if(document.getElementById("changeWorkTime").value.length > 0){
                commit({
                  type: 'setTimer',
                  work:  document.getElementById("changeWorkTime").value *60,
                  shortPause: document.getElementById("changeShortPauseTime").value *60,
                  longPause:  document.getElementById("changeLongPauseTime").value *60
                })
            }


             // If the room's time is running continue countdown, else show button so that you can click
             if (room[4] === 'work' && room[3] < room[0] || room[4] === 'shortPause' && room[3] < room[1] || room[4] === 'longPause' && room[3] < room[2]){
               dispatch('countdown')
             } else {
                commit('showGoButton')
             }


             setTimeout(function(){
             commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })  
            },0)

 
             
        },


        countdown({commit, state, dispatch, rootState}, timeLeft){
            // Hide button on pressing start
            if(state.showGoButton){
                commit('hideGoButton')
            };

            

            // If timer is not already running --> start timer
            if(!state.timerInterval){
            
            return state.timerInterval = setInterval(() => {
                if(state.timeLeft > 0){

                    //Counts down the seconds
                    commit('updateTimeLeft');

                    //If it is a working session and timeleft is equal to time of working session - 5 - 10 - 15, etc. <-- calculate this, when you set timer
                    if(state.stateOfSession === 'work' && state.beepTimes.includes(state.timeLeft) ){
                      state.bell.play();
                    }
                  
                  //ADDRESSBAR: Show minutes left // Could specify beforehand if it's break or work, try out
                  if(!rootState.pomodoroSettings.displaySessionTitle){
                    if(state.timeLeft % 60 ===  59 && Math.floor(state.timeLeft / 60) > 1){
                        document.title = Math.floor(state.timeLeft / 60) + ' minutes left!';
                    } else if (Math.floor(state.timeLeft / 60) < 1) {
                        document.title = state.timeLeft % 60 + ' seconds left!';
                    }
                    // Else if its work show session title (updates only every minute!) , otherwise show category 
                  } else if(rootState.sessionTitleList.sessions[state.sessionNumber].category === 'work'){
                    if(state.timeLeft % 60 ===  59 && Math.floor(state.timeLeft / 60) > 1){
                        document.title = '(' + Math.floor(state.timeLeft / 60) + ') ' + rootState.sessionTitleList.sessions[state.sessionNumber].name;
                    } else if (Math.floor(state.timeLeft / 60) < 1) {
                        document.title = '(' + state.timeLeft % 60 + ') ' + rootState.sessionTitleList.sessions[state.sessionNumber].name;
                    }
                  } else {
                    if(state.timeLeft % 60 ===  59 && Math.floor(state.timeLeft / 60) > 1){
                        document.title = '(' + Math.floor(state.timeLeft / 60) + ') ' + rootState.sessionTitleList.sessions[state.sessionNumber].category;
                    } else if (Math.floor(state.timeLeft / 60) < 1) {
                        document.title = '(' + state.timeLeft % 60 + ') ' + rootState.sessionTitleList.sessions[state.sessionNumber].category;
                    }
                  }


                } else if(rootState.sessionTitleList.pomodorosDone == rootState.sessionTitleList.pomodoroGoal){
                    //PomodorosDone have reached pomodorogoal
                    alert('You have reached your daily Goal! If you want to continue increase your Pomodoro Goal ;)')

                } else if (state.timeLeft === 0) {
  
                    commit('clearTimer')
                    state.timerInterval = false // only necessary for condition

                    state.bell.play();


                    if (state.numberOfCurrentSession % 7 === 0 && state.numberOfCurrentSession !== 0){
                        // Work has passed and it's time for a pause
                        //Call for break feedback


                        commit('feedback/pomodoroBreakFeedback', null, { root: true })

                        // Incomplete: Should increment sessions <-- needs to be connected to individual user
                        commit('user/incrementSessionsCompleted', null, {root: true })

                        document.title = 'Hands up!'

                        commit('switchToLongBreak')
                        

                        setTimeout(function() {
                            if(rootState.pomodoroSettings.automaticPause){
                              dispatch('countdown')
                            } else if (!rootState.pomodoroSettings.automaticPause){
                              commit('clearTimer')
                              state.timerInterval = false;
                              commit('showGoButton')
                            }

                            //highlight current session title 
                            commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                            commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })
                        }, 3000)   
                    } else if(state.numberOfCurrentSession % 2 === 0){
                        // Work!
                        commit('switchToWork') 

                        setTimeout(function() {
                            //highlight current session title 
                            commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                            commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })

                            //Increment the amount of pomodoros done, but only if the first session isn't a break
                            if(state.sessionNumber !== 1  || ( rootState.sessionTitleList.sessions[0].category !== 'Break' && rootState.sessionTitleList.sessions[0].category !== 'Long Break'  )){
                              commit('sessionTitleList/incrementPomodorosDone', null, { root: true }) 
                            }

                            if(rootState.pomodoroSettings.automaticWork){
                              dispatch('countdown')
                              document.title = 'Back to Work!'
                            } else if (!rootState.pomodoroSettings.automaticPause){
                              commit('clearTimer')
                              state.timerInterval = false;
                              commit('showGoButton')
                              document.title = 'Press GO to continue!'
                            }

                        }, 3000)
                        } else {
                         // Work has passed and it's time for a pause

                        //Call for break feedback
                        // commit('feedback/pomodoroBreakFeedback', null, { root: true })

                        commit('switchToShortBreak')  

                        document.title = 'Hands up!'
                        
                        setTimeout(function() {
                            
                            if(rootState.pomodoroSettings.automaticPause){
                              dispatch('countdown')
                            } else if (!rootState.pomodoroSettings.automaticPause){
                              commit('clearTimer')
                              state.timerInterval = false;
                              commit('showGoButton')
                            }

                             //highlight current session title 
                            commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                            commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })
                        }, 3000)   
                    }
                     state.numberOfCurrentSession++
                    }
            },1000);
        }
        },  

    },
  

    mutations : {


       /**********************  countdown functions (in chronological order, badumm tss) *********************/
       setTimer(state, time){
            state.timeWork = time.work,
            state.timeShortPause = time.shortPause,
            state.timeLongPause = time.longPause,
            state.timeLeft = time.timeLeft,
            state.stateOfSession = time.stateOfSession,
            state.numberOfCurrentSession = time.numberOfCurrentSession
            state.numberOfFirstSession = time.numberOfCurrentSession
       },

       showGoButton(state){
            state.showGoButton = true
       },

       hideGoButton(state){
            state.showGoButton = false
       },

       updateTimeLeft(state){
            state.timeLeft--;
       },
       
       clearTimer(state){
            clearInterval(state.timerInterval)
        },

       switchToShortBreak(state){
            state.timerBlinkAnimation = true;

            //start new timer after 3 seconds 
            setTimeout(function() {
                state.stateOfSession = 'Break';
                state.timeLeft = state.timeShortPause; 
                state.timerBlinkAnimation = false;   
                state.sessionNumber++
            }, 3000)            
      },

       switchToWork(state){
            state.timerBlinkAnimation = true;

            setTimeout(function() {
                state.stateOfSession = 'work' 
                state.timeLeft = state.timeWork    
                state.timerBlinkAnimation = false
                state.sessionNumber++
            }, 3000)   
       },

      switchToLongBreak(state){
            state.timerBlinkAnimation = true;

            //start new timer after 3 seconds 
            setTimeout(function() {
                state.stateOfSession = 'Long Break'
                state.timeLeft = state.timeLongPause
                state.timerBlinkAnimation = false
                state.sessionNumber++
            }, 3000)            
      },

     

        /**********************  other functions *********************/

        //Example for how to fetch things from the server 
       setTimeLeft(state,time){
            state.timeWork = time[0]
            state.timePause = time[1]
            state.pause = time[2]
       },

       goFullScreen(state){
          state.timerFullScreen = !state.timerFullScreen
       }
    }
}


