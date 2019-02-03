export default {
	namespaced: true,
	state : {
		showSettings: false,
		automaticPause: false,
        automaticWork: false,
        displaySessionTitle: false,
        beepEveryXMinutes: 5,
	},

	getters: {

	},

	actions: {

		  addEventListener({commit}){
	          /*window.addEventListener('keyup', function(e) {
	          	$(document).keyup(function(e){	 
				    // On escape press, show or hide setting page

				    if(e.keyCode==27){
				    	 alert("!")
				        commit('toggleSettings')
				    }
				});
	          

	          });*/
          },

          // Change settings depending on which element is calling!
          toggleSettings({commit,  state, rootState}, setting){
          	if(setting === 'automaticPause'){
          		commit('togglePause')
          	} else if(setting === 'automaticWork'){
          		commit('toggleWork')
          	} else if(setting === 'displaySessionTitle'){
          		commit('displaySessionTitle')
          	} else if(setting === 'beepEveryXMinutes'){
          		let newValue = $('#beepEveryXMinutes').val(),
                    workTime = Math.floor(rootState.timer.timeWork / 60);

                rootState.timer.beepTimes.length = 0;

                for(let i = workTime - newValue; i >= newValue; i -= newValue){
              	  rootState.timer.beepTimes.push(i * 60);
              	}
          		commit('beepEveryXMinutes', newValue)

          	} else {
          		alert('Did not find setting')
          	}
          }

	},

	mutations: {
		toggleSettings(state){
			state.showSettings = !state.showSettings
		},

		togglePause(state){
			state.automaticPause = !state.automaticPause
		},

		toggleWork(state){
			state.automaticWork = !state.automaticWork
		},

		displaySessionTitle(state){
			state.displaySessionTitle = !state.displaySessionTitle
		},

		beepEveryXMinutes(state, newValue){
			state.beepEveryXMinutes = newValue
		},


	}
}