// Current problem: fake api is only there for the test, should be imported, not rootStated
import fakeBackEndGrow from './../../../../api/fakeBackEndGrow'

export default {
  namespaced: true,
  state : {
      pet: [],
      petSelected: 1,
      showPet: true,
  },

  getters: {

  },
  actions: {

    fetchPet({commit, rootState}){
      return new Promise((resolve,reject)=>{
        fakeBackEndGrow.fetchPet((server)=>{
          commit('setState', server);
          resolve();
        });
      });
    },

    loadPetFunctions({dispatch}){
      dispatch('loadPet')
    },

    loadPet({state, rootState}){
      if(state.petSelected !== 0 && state.showPet){
        let currentPet = state.pet[state.petSelected];

        /*$('#avatarContainer').append(
          `<img 
            src="${currentPet.source}" 
            alt="${currentPet.name}" 
            style='
            width:${150 * currentPet.size}px;  
            height:${150 * currentPet.size}px; 
            position:absolute; 
            top:${(50 + rootState.avatar.avatarCoordinates[1])}px; 
            left:${( 100 + rootState.avatar.avatarCoordinates[0])}px; 
            z-index:10;
          '>`
         );*/

      }
    },


  },
  mutations: {
    setState(state, server){
      state.pet = server.pet
    }
  }
}