export default {
	namespaced: true,
	state : {
		toDos: [
		{
			name: 'First To Do',
			number: 0,
			category: 'not distributed',
			displayed: false,
		},
		{
			name: 'Second To Do',
			number: 1,
			category: 'IU',
			displayed: false,
		},
		{
			name: 'Third To Do',
			number: 2,
			category: 'I',
			displayed: false,
		},
		{
			name: 'Fourth To Do',
			number: 3,
			category: 'U',
			displayed: false,
		},
		{
			name: 'Fifth To Do',
			number: 4,
			category: 'NINU',
			displayed: true,
		},
		],
	},
	getters: {

	},
	actions: {
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
		addToDo({commit}){
			commit('addToDo', document.getElementById('toDoInput').value);

			document.getElementById('toDoInput').value = '';
		}

	},
	mutations: {
		addToDo(state, input){
			state.toDos.push({
				name: input,
				category: 'not distributed'
			})
		}
	}
}