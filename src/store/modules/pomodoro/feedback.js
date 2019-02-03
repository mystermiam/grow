export default {
	namespaced: true,
	state : {
	
	},
	getters: {

	},
	actions: {
		
	},
	mutations: {

		pomodoroBreakFeedback(){
			this._vm.$notify({
			  group: 'pomodoro',
			  title: 'BREAK',
			  text: 'Hands up!',
			  type: 'pomodoro-break'
			});
		}

	}
}