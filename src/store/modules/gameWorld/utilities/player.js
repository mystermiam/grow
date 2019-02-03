// Try to put movement keys here
import { Grow } from './../index'

import Phaser from 'phaser'

export default {
	namespaced: true,
	state : {
		userName: 'You',
		sceneActive: 0,
		stats: {
			level: 1,
			experience: 0,
			gold: 0,
		},
		experienceNeeded: [50,60,70,80,90,100],
		scenesToBeShown: ['BeginningScene'],
	},
	getters: {

	},
	actions: {
		removeSceneFromList({state, commit}, nameOfScene) {
			let index = 0;

			for(let i = 0; i < state.scenesToBeShown.length; i++){
			  if (state.scenesToBeShown === nameOfScene){
			    index = i;
			  }
			}

			commit('removeSceneFromList', index)
		}, 

		changeActiveScene({commit}, number){
			commit('changeActiveScene', number)
		},

		enableKeyboardKeys({state, commit, rootState}){
			commit('loadInterface/enableVueKeys', '', {root:true})
		},

		disableKeyboardKeys({state, commit, rootState}, whichKeys){
			let scene = Grow.scene.scenes[state.sceneActive];
			
			// I will need to remove event listener for spaceBar


			if(whichKeys == 'all'){
				scene.player.characterInteraction[0] = 'userInput';
				
				// Why does this one not work?
				//scene.player.cursors.removeAllListeners();

				commit('loadInterface/disableVueKeys', '', {root:true})
			} else if (whichKeys == 'vue') {
				commit('loadInterface/disableVueKeys', '', {root:true})
			} else if (whichKeys == 'phaser'){
				scene.player.characterInteraction[0] = 'userInput';

			} else {
				console.log("Error: You didn't define which keys you want to disable, add 'Phaser', 'Vue' or 'all' as a parameter")
			}
			

			// Maybe make it eventually with specific keys
		},

	},
	mutations: {
		changeUserName(state, userInput){ state.userName = userInput }, 

		changeActiveScene(state, number){ state.sceneActive = number },

		removeSceneFromList(state, index) { state.scenesToBeShown.splice(index, 1); },

		addSceneToList(state, name) { state.scenesToBeShown.push(name) },
	}
}