// Battle plan: 

// If link is incorrect, player is locked

import { Grow } from './../index'

export default {
	namespaced: true,
	state : {
        currentMessage: {
        	'kindOfMessage': 'normal',
        	'number': 0,
        	'person': '',
        	'message': '',
        	'options': [],
        	'optionSelected': 0,
        },
        dialogues: {},
        functionToBeCalled: [],

	},
	getters: {

	},
	actions: {
		//Called in dialogue.vue --> userInput

		// Unfinished: State.functionToBeCalled updates after pressing space (functionToBeCalled)
		userInput({state, commit, dispatch, rootState}){
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let userInput = document.getElementById('dialogueUserInput').value;

			commit(state.functionToBeCalled, userInput, {root:true})
			
			commit('emptyDialogueFunction')
			
			setTimeout(function(){

			scene.player.characterInteraction[0] = 'dialogue';

		    commit('changeMessageNumber', state.currentMessage.number)

		    dispatch('loadDialogue')

			}, 100);
		},

		//Called in dialogue.vue --> userInput
		userInputQuestion({dispatch, rootState}){
			dispatch('endConversation')
			alert("You have completed this quest successfully!")

			// Unfinished: Get QuestName somehow // and go to second question if there is one? reset textfield and change dialogue.question
			dispatch('quests/removeActiveQuest', 'test', {root:true})

			dispatch('quests/questAccomplished', [2, 5], {root:true})
		},
		// Called in dialogue function of person / Object [SceneActive, Name, newStartingPoint]
		changeDialogueStartsAt({commit, rootState}, obj){ 
			if (obj.length == 4){
				// The fourth argument is time, so the dialogue start will be changed after a timeout
				setTimeout(function(){commit('changeDialogueStartsAt', obj), '', {root:true}}, obj[3]);
			} 

			else {
				commit('changeDialogueStartsAt', obj)
			}
		},

		// Called in character.js from this[characterName].dialogue
        addDialogue({commit}, obj){
        	commit('addDialogue', obj)
        },

        setCurrentMessageType({commit, dispatch, rootState}, type){
        	// Call scene to not update dialogue function for now
        	if(type == 'userInput'){
        		// Stop user input (should be an external function in player)
	            dispatch('player/disableKeyboardKeys', 'all', {root:true})
        	}

        	commit('setCurrentMessageType', type)
        },

        // Called from createNPCs dialogue1 OR Dialogue.vue
		addLinkToCharacter({commit, dispatch, rootState}){
			let link = document.getElementById('inputToAddLink').value;
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let characterNumber = scene.player.characterInteraction[1]

			commit('addLinkToCharacter', [link, characterNumber])
			commit('changeMessageNumber', 1)
			commit('setCurrentMessageType', 'option')
			dispatch('loadDialogue')
		},

		createCharacterWithLink({commit}, obj){
			//Eventually should be united with addLinkToCharacter
			commit('createCharacterWithLink', obj)
		},

		loadDialogue({state,commit,dispatch,rootState}, dialogueName){
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let player = scene.player;

			// Does this line cause problems?!
			scene.player.characterInteraction[0] = 'dialogue';

			if (dialogueName) {player.characterInteraction[1] = dialogueName};
			let nameOfCharacter = player.characterInteraction[1];

			let messageNumber = state.currentMessage.number;
			let dialogue = state.dialogues[nameOfCharacter][messageNumber];
            
			
			// If messageNumber > length then endConversation
			if(messageNumber >= state.dialogues[nameOfCharacter].length){
			// no option
			dispatch('endConversation')

			return
       	    } 

			// Else If dialoguebox is not shown --> show dialoguebox
			else if(!rootState.loadInterface.showDialogueBox){

			
				commit('loadInterface/hideVueInterface', '', {root:true})
			


	            // Set idle frame // currently not possible, because prevVelocity is already at 0
	          /*if      (player.prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
    			else if (player.prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
    			else if (player.prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
    			else if (player.prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
			  */
    			// Make player unable to move 
	            player.isAllowedToMove = false;

	            // Stop player's movement
	            player.body.setVelocity(0);

	            dispatch('player/disableKeyboardKeys', 'vue', {root:true})
	            

	            //Stop movement animation (improve it with putting it into resting position)
	            player.anims.stop();
	            // Prev velocity

	            // DialogueStartsAt is currently linked 
	            let dialogueStartsAt = 0
	            
	            if (player.scene[nameOfCharacter]){ 
	            	dialogueStartsAt = player.scene[nameOfCharacter].dialogueStartsAt;
	            }

	            // Update message number
	            commit('changeMessageNumber', dialogueStartsAt)
	    		messageNumber = state.currentMessage.number;

				dispatch('loadInterface/getPosition', '', {root:true})

	            setTimeout(function(){dispatch('loadInterface/toggleDialogueBox', '', {root:true}); player.inAction = false;}, 100);
			
			} 

			// Dialogue is the first option, so it is either the name or option or userinput
			//console.log('dialogue is currently: ', dialogue[0])

			// If messagetype is option --> loadOption
			if(dialogue[0] === 'option'){ 
	
            	commit('setCurrentMessageType', 'option')

            	dispatch('loadOption', nameOfCharacter)




            // If messagetype is userInput --> change to userInput
            } else if (dialogue[0] === 'userInput'){ 
	
            	commit('setCurrentMessageType', 'userInput')

            	// Disable keys like spacebar etc.
            	scene.player.characterInteraction[0] = 'userInput';

            	// 2nd argument is the question itself
            	// 3rd argument is variable, where the userinput should be saved
                commit('callFunctionAfterThisMessage', dialogue[2])




            // otherwise load a normal message
        	} else {
            // If dialogue message has 3 arguments --> save it into a variable that is evaluated on the next tick
              if(dialogue.length === 3){
                   
                   // So that it updates after the dialogue has been called
                   setTimeout(function(){ commit('callFunctionAfterThisMessage', dialogue[2]) }, 300);
	
              }

			commit('setCurrentMessageType', 'normal')
			}


            // General functions on each click
	        commit('setMessage', [messageNumber, nameOfCharacter]) 

	   	    //Increase the currentMessage number by one
	   	    commit('incrementMessageNumber')



		},

		endConversation({commit, dispatch, rootState}){
			let player = Grow.scene.scenes[rootState.player.sceneActive].player;
			// End conversation
			// Reset message if currentMessage is equal to message length
			commit('resetMessageNumber')
			
			// Make player move again 
            player.isAllowedToMove = true;
            
            // Enable keys again
            player.characterInteraction = [];

            //remove options

            commit('loadInterface/showVueInterface', '', {root:true})

            dispatch('player/enableKeyboardKeys', '', {root:true})

			// Toggle dialoguebox
            setTimeout(function(){dispatch('loadInterface/toggleDialogueBox', '', {root:true}); player.inAction = false; }, 0);
		},

		loadOption({state, commit, rootState}, characterName){
			// If there are still options in the array, remove options
			if(state.currentMessage.options.length > 0) { commit('emptyCurrentOptionArray') }
            if(state.currentMessage.optionSelected !== 0) { commit('resetOptionSelected') }
			

			// Load available options
			for (let i=1; i<state.dialogues[characterName][state.currentMessage.number].length; i++){
				commit('setOption', [characterName, i])
			}

			// ToDo: If there is more than three options, reload the list with the now active three numbers!


			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			scene.player.characterInteraction[0] = 'option'	
		},	

		selectDifferentOption({commit}, number){
			if(number === 0){
				commit('selectFirstOption')
			} else if (number === 1){
				commit('selectDifferentOption', 1)
			} else if (number === -1){
				commit('selectDifferentOption', -1)
			} else {
				commit('selectLastOption', number)
			}
		},





		// Called in updateOptions in phaserUtilities/phaserDialogue
		takeOption({state, commit, dispatch, rootState}){
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let optionSelected = state.currentMessage.options[state.currentMessage.optionSelected][1];
  
            console.log('Option taken in dialogue.js', optionSelected)
            // go through optionSelected one by one and execute its functions
            for(let i=0;i<optionSelected.length;i++){

				// if optionSelected is a number set message type back to normal and set currentMessage.number to that number
				if(typeof optionSelected[i] === 'number'){
	              
                    let number = optionSelected[i];
                    
                    // change to dialogue, so that it updates in scene
                    scene.player.characterInteraction[0] = 'dialogue';

		            commit('resetOptionSelected') 

	                // Changes message to number in option [Number needs to be in first place!!]
					commit('changeMessageNumber', number)
                     
					dispatch('loadDialogue')
					

			      // if optionSelected is a string call that action
				} else if (typeof optionSelected[i] === 'string') {
					// If it is music open new tab to play music 
					let musicReg = new RegExp("^(http|https)://", "i");
					let matchingLinks = optionSelected[i].match(musicReg);
			
					if (matchingLinks){
						window.open(optionSelected[i])
					} else {

						// Call function, etc. (Could be a huge security risk)
						eval(optionSelected[i])


					}
				} 

			} // End of for loop    		

			commit('setCurrentMessageType', 'normal')
		},

		



	},
	mutations: {
		emptyDialogue(state){ state.dialogues = []; },

		emptyDialogueFunction(state){ state.functionToBeCalled = false },

		//Called from userInput in this file and from loadDialogue
        callFunctionAfterThisMessage(state, functionToBeCalled){ 
        	state.functionToBeCalled = functionToBeCalled
        },

		emptyCurrentOptionArray(state){ state.currentMessage.options = []; },

		// called in dialogue function of character / obj = sceneActive, name, number
		changeDialogueStartsAt(state, obj){ Grow.scene.scenes[obj[0]][obj[1]].dialogueStartsAt = obj[2] }, 

		addDialogue(state, obj){
			// 0: name, 1: dialogue
			state.dialogues[obj[0]] = obj[1]
		},

		addLinkToCharacter(state, obj){
			// object: link, characterNumber  // should have position that is changed too 
			// here dialogues.characterNumber / 1st position of dialogue / option 1 is changed
			state.dialogues[obj[1]][1][1] = ['go to link', [10, obj[0]]]
		},

		createCharacterWithLink(state, obj){
			// needs: Character Number for state.dialogues,position inside individual dialogue that should be changed,
			// and link 
			state.dialogues[obj[0]][obj[1][0]][obj[1][1]] = ['go to link', [10, obj[2]]]
		},

		setCurrentMessageType(state, type){
        	state.currentMessage.kindOfMessage = type
        },

        // Is called in dialogue
		setMessage(state, obj){ 
		 // Obj 0: messageNumber, could be removed I guess / obj 1: characterName
         state.currentMessage.person = state.dialogues[obj[1]][state.currentMessage.number][0];
         state.currentMessage.message = state.dialogues[obj[1]][state.currentMessage.number][1];
		},

		incrementMessageNumber(state){
			state.currentMessage.number++;
		},

		resetMessageNumber(state){
			state.currentMessage.number = 0;
		},

		setOption(state, obj){ 
            state.currentMessage.options.push(state.dialogues[obj[0]][state.currentMessage.number][obj[1]])
		},

		selectDifferentOption(state, number){
            state.currentMessage.optionSelected += number
		},

		selectFirstOption(state){
			state.currentMessage.optionSelected = 0
		},

		selectLastOption(state, number){
			state.currentMessage.optionSelected = number
		},

		resetOptionSelected(state){
			state.currentMessage.optionSelected = 0
		},

		changeMessageNumber(state, number){
			state.currentMessage.number = number
		},
	}
}










// Graveyard: 

/*


			else if(Array.isArray(optionSelected[i])){

				let vueOrScene = optionSelected[i][0];
				let location = optionSelected[i][1];
				let nameOfFunction = optionSelected[i][2];
				let functionParameter = [];
                
                if(optionSelected[i].length > 3){
                	for (let j=0; j < optionSelected[i][3].length; j++){
						functionParameter.push(optionSelected[i][2][j])
					}
                }

				//Have some standard vue functions in the dialogue
                if(location === 'dialogue'){
                	dispatch(nameOfFunction, functionParameter)
                } else if (vueOrScene === 'vue'){
                	// Add function here

                } else if (vueOrScene === 'scene'){
				//Have custom functions within the scene! (well organized)
	
                	// Add function in scene here
                }

			}

*/