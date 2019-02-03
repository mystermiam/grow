


export default {
	namespaced: true,
	state : {
		dailies: [{
			name: 'Meditation',
			category: 'Air',
			timesCompleted: 0,
			level: 'Novice',
			doneToday: false,
			rewardNextTime: [5,3],  // Dust, Gold
		}],
		dailyParameters: [1,2], //first is current dailies, second is max dailies
		// Migrate values eventually, good for testing
		levelBoundaries: [0,20,50,70], //matches Level, that's why first is 0 // it's not necessary to be dynamic

		user: {
			dustTotal: 0,
			dust: [0,0,0,0,0],  // Water, Fire, Earth, Air, Steel
			gold: 0,
			health: 50,
			level: 1,
		}
	},

	actions: {
		increaseDust({commit, state, dispatch, rootState}, object){

			commit('increaseDust', object)
			commit('progressBar/progressBarMovesOn', object, { root: true })  

			//Level up 
			if(state.user.dustTotal >= state.levelBoundaries[state.user.level]){
				commit('progressBar/emptyProgressBar', object, { root: true })  
				commit('incrementLevel')
				// if increaseDust is bigger than levelBoundary then increase dust afterwards // Problem
				commit('progressBar/progressBarMovesOn', [object[0], state.user.dustTotal - state.levelBoundaries[state.user.level]], { root: true })  
				
				
			}

			
		},

		addDaily({commit, state}){
			if(state.dailyParameters[0] < state.dailyParameters[1] && document.getElementById('dailyTitle').value.length > 4){

				let newDaily = {
					name: document.getElementById('dailyTitle').value,
					category: document.getElementById('categoryName').value
				}

				commit('addDaily', newDaily)

				document.getElementById('dailyTitle').value = '';
				document.getElementById('categoryName').value = '';


			} else {
				alert('You have already enough dailies for now or what you entered was too short ;)')
			}
		},

		dailyDone({state, commit, dispatch}, index){
			
			// Which kind of dust is increased + amount of dust that is acquired (difficulty)
			switch(state.dailies[index].category){
				case 'Water':  dispatch('increaseDust', [0, state.dailies[index].rewardNextTime[0]]); break;
				case 'Fire':   dispatch('increaseDust', [1, state.dailies[index].rewardNextTime[0]]); break;
				case 'Earth':  dispatch('increaseDust', [2, state.dailies[index].rewardNextTime[0]]); break;
				case 'Air':    dispatch('increaseDust', [3, state.dailies[index].rewardNextTime[0]]); break;
				case 'Steel':  dispatch('increaseDust', [4, state.dailies[index].rewardNextTime[0]]); break;
				default:                                                                              break;
			};

			commit('dailyDone', index)


			// Check if the player's skill has reached a certain level
			switch(state.dailies[index].timesCompleted){
				case 5: commit('changeDailyLevel', [index,  'Beginner']);     break;
				case 10: commit('changeDailyLevel', [index, 'Intermediate']); break;
				case 15: commit('changeDailyLevel', [index, 'Experienced']);  break;
				case 20: commit('changeDailyLevel', [index, 'Expert']);       break;
				case 25: commit('changeDailyLevel', [index, 'Master']);       break;
				default :                                                     break;
			};
		},

		resetDay({state, commit}){
			for(let i=0;i<state.dailies.length;i++){
				if(state.dailies[i].doneToday){	
					commit('resetDay', i)
				} else {
					commit('dailyUndone', i)
				}
			}
		}

	},
	mutations: {

		addDaily(state, newDaily){
			state.dailies.push({
				name: newDaily.name,
				category: newDaily.category,
				timesCompleted: 1,
				level: 'Novice',
				doneToday: false,
				rewardNextTime: [5,3],
			})

			//Increase DailyCounter
			state.dailyParameters[0]++

		},

		dailyDone(state, index){
			state.dailies[index].timesCompleted++
			//let Daily fade out and make it disabled
			state.dailies[index].doneToday = true
			state.user.dustTotal += state.dailies[index].rewardNextTime[0]
			state.user.gold += state.dailies[index].rewardNextTime[1]
		},

		increaseDust(state, obj){
			// 0: category of Dust, 1: dust increase
			state.user.dust[obj[0]] += obj[1]
		},

		incrementLevel(state){
			state.user.dustTotal -= state.levelBoundaries[state.user.level]
			state.user.level++
		},

		changeDailyLevel(state, payload){
			state.dailies[payload[0]].level = payload[1]
		},

		resetDay(state, i){
			state.dailies[i].doneToday = false
		},

		dailyUndone(state, i){
			state.user.health -= 2
		}
	}
}