// Current problem: fake api is only there for the test, should be imported, not rootStated
import fakeBackEndGrow from './../../../../api/fakeBackEndGrow'

export default {
	namespaced: true,
	
state : {
  avatar: [],
  body: [],
  items: [],
  avatarCoordinates: [55,110],
  sizeMultiplier: 0.8
},

getters: {

	},
	

actions: {

fetchState({commit, rootState}){
	return new Promise((resolve,reject)=>{
		fakeBackEndGrow.fetchState((payload)=>{
			commit('setState', payload);
			resolve();
		});
	});
},

loadAvatarFunctions({dispatch}){
	dispatch('avatarBodyLoad')
	dispatch('avatarEquipmentLoad')
},

/****************************************************** BODY FUNCTIONS ***************************************************/

avatarBodyLoad({state, commit}){
// skin selected is avatar.body[0], replace all the variables  
// creating character out of several pieces 
let bodyPartCategory = ["hair","beard","shirt","skin"],
	bodyPartCurrent = state.avatar.body;



for (let i=0; i< 4; i++){
 if (bodyPartCurrent[i] !== 0) {
 	let bodyPart = state.body[bodyPartCategory[i]][bodyPartCurrent[i]];


/* $('#avatarContainer').append(
 	`<img 
 		src="${bodyPart.source}" 
 		alt="${bodyPart.name}" 
 		value="${bodyPartCategory[i]}Equipped" 
 	    style='
 	    width:${150 * state.sizeMultiplier}px;  
		height:${150 * state.sizeMultiplier}px; 
 		position:absolute; 
 		top:${(state.avatarCoordinates[1])}px; 
 		left:${(state.avatarCoordinates[0])}px; 
 		z-index:${bodyPart.layer}
 	;'>`
 );*/

 };
}
},



/*********************************************************** EQUIPMENT FUNCTION *************************************************/



avatarEquipmentLoad({state}){

let itemCategory = ['helmet','armor','weapon','shield','shoes'],
	equipped = state.avatar.equipped;
	

for(let i=0; i<5; i++){
	if(equipped[i] !== 0){

		let item = state.items[itemCategory[i]][equipped[i]];
		/*$("#avatarContainer").append(
			`<img 
				src='${item.source}' 
				alt='${item.name}' 
				style=' 
				position:absolute;
				width:${150 * state.sizeMultiplier}px;  
				height:${150 * state.sizeMultiplier}px; 
				top:${  state.avatarCoordinates[1]}px; 
				left:${ state.avatarCoordinates[0]}px;
				z-index:${item.layer};
			'>`
		);*/

		
  	}
}
},

},


mutations: {
setState(state, payload){
	state.avatar = payload.avatar;
	state.body = payload.body;
	state.items = payload.items
},
},

}






// not needed for now? width:${item[equipped[i]].size[0]}px;  height:${item[equipped[i]].size[1]}px;   		width:${bodyParts[bodyPartCurrent[i]].size[0]}px;   height:${bodyParts[bodyPartCurrent[i]].size[1]}px; 
