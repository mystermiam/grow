export default {
	namespaced: true,
	state : {
		room1: [1500,300,900],
		room2: [1500,300,900],
		room3: [2400, 420,1260],
	},
	getters: {

	},
	actions: {
		flipCard() {
			this.classList.toggle('flip');
		},

		
	},
	mutations: {
		
	}
}