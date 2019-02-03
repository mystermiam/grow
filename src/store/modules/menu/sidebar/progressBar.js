export default {
	namespaced: true,
	state : {
		dustProgressBar: [[1,5]],
		dustOverAllProgress: [],
	},
	getters: {
		percentageOfDustTotal(){
			
		}
	},
	actions: {
	
	},
	mutations: {
		progressBarMovesOn(state, obj){
			//Resetted after level up
			state.dustProgressBar.push([obj[0], obj[1]]);

			// Saved forever
			state.dustOverAllProgress.push([obj[0], obj[1]]);
		},

		emptyProgressBar(state){
			state.dustProgressBar.length = 0;
		},
	}
}