import { Grow } from './../index'

import store from '../../../index'

export function updateDialogue(){
       let scene = Grow.scene.scenes[store.state.player.sceneActive];
       let vueStore = store;
       let endConversation = false;
        // Updating different kind of actions - in this case 'Dialogue' -- move to character
        if(scene.player.cursors.space.isDown && scene.player.actionCounter === 0){
          // Variable is set to 'string (function in string form) that can be evaluated'
          if (store.state.dialogue.functionToBeCalled){
            
            let functionToBeCalled = store.state.dialogue.functionToBeCalled
            
            for(let i = 0; i < functionToBeCalled.length; i++){
              if(typeof functionToBeCalled[i]  === 'number'){

                    if (functionToBeCalled[i] > store.state.dialogue.dialogues[scene.player.characterInteraction[1]].length){
                      store.dispatch('dialogue/endConversation')
                      endConversation = true;
                    } else {

                    let nextDialogue = store.state.dialogue.dialogues[scene.player.characterInteraction[1]][functionToBeCalled[i]][0];
                    
                    // Check what type of dialogue it is
                    if(nextDialogue == 'option'){
                      store.commit('dialogue/setCurrentMessageType', 'option')
                    } else if (nextDialogue == 'userInput') {
                      store.commit('dialogue/setCurrentMessageType', 'userInput')
                    } else {
                      store.commit('dialogue/setCurrentMessageType', 'normal')
                    }

                    
                    store.commit('dialogue/changeMessageNumber', functionToBeCalled[i]); 
                    }
              } else {
            
            console.log(functionToBeCalled[i])
            if(functionToBeCalled[i] === 'endConversation' || functionToBeCalled[i] === "vueStore.dispatch('dialogue/endConversation')"){
              store.dispatch('dialogue/endConversation')
              endConversation = true;
            } else {
              // TO USE VUE FUNCTIONS USE vueStore instead of store: E.g. vueStore.commit('dialogue/endConversation')
              // USE Phaser functions with scene.something
              eval (
                functionToBeCalled[i]
                )
            }

          } 
        } // End for loop
            
          // No need to call function 10 times
          store.commit('dialogue/emptyDialogueFunction');
          
        }
        if(!endConversation){
          store.dispatch('dialogue/loadDialogue', scene.player.characterLastContacted)
        }

          scene.player.actionCounter++
          scene.player.cursors.space.isDown = false;

          // Time until people can continue the dialogue 350ms
          setTimeout(function(){ scene.player.actionCounter = 0}, 500);
        } 
      
}

    // Called in scene
export function updateOptions(){
       let scene = Grow.scene.scenes[store.state.player.sceneActive];

        if(scene.player.cursors.down.isDown && scene.player.actionCounter === 0){
          
      
          //if currentOption selected > length select 0;  
          if(store.state.dialogue.currentMessage.optionSelected === store.state.dialogue.currentMessage.options.length - 1){
            store.dispatch('dialogue/selectDifferentOption', 0);
          } else {
          //else currentOption++
            store.dispatch('dialogue/selectDifferentOption', 1)
          }

          scene.player.actionCounter++
          scene.player.cursors.down.isDown = false;

          // Time until people can continue the dialogue 350ms
          setTimeout(function(){ scene.player.actionCounter = 0}, 100);
        } else if(scene.player.cursors.up.isDown && scene.player.actionCounter === 0){
       
          //if currentOption selected > length select 0;  
          if(store.state.dialogue.currentMessage.optionSelected === 0){
            store.dispatch('dialogue/selectDifferentOption', store.state.dialogue.currentMessage.options.length - 1);
          } else {
          //else currentOption++
            store.dispatch('dialogue/selectDifferentOption', -1)
          }
           
          scene.player.actionCounter++
          scene.player.cursors.up.isDown = false;

          // Time until people can continue the dialogue 350ms
          setTimeout(function(){ scene.player.actionCounter = 0}, 100);
        } else if(scene.player.cursors.space.isDown && scene.player.actionCounter === 0){

          store.dispatch('dialogue/takeOption')

          scene.player.actionCounter++
          scene.player.cursors.space.isDown = false;

          // Time until people can continue the dialogue 350ms
          setTimeout(function(){ scene.player.actionCounter = 0}, 350);
        }
}

export function updateUserInput(){
       let scene = Grow.scene.scenes[store.state.player.sceneActive];

        if(scene.player.cursors.space.isDown && scene.player.actionCounter === 0){
           
           scene.player.actionCounter++
           scene.player.cursors.space.isDown = false;

           document.getElementById('dialogueUserInput').value = document.getElementById('dialogueUserInput').value + ' ';

           setTimeout(function(){ scene.player.actionCounter = 0 }, 10);
}

}
