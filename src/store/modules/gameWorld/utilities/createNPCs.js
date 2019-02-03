import { Grow } from '../index'

import Character from './../phaserUtilities/character'


import Star from './../assets/star.png'

// Battle plan
// save to server 
// let image follow mouse  update() {  sprite.position.set(game.input.mousePointer.worldX, game.input.mousePointer.worldY);}
// create edit function and pick character up function
// move objectcontainer into right position
// make it open on keypress


// added in character.js

// needs to play cracking sound @ attack is very effective
// MYSTERIOUS note:  -> arya this is interesting, I should do the same thing for my mom
// Add quest that tells you to write a note
// Deliver note to someone in the town / Maria, husband recently died

let dialogueBottle = [
['Arya', 'Hmm, this is weird. It seems like there is something inside the bottle'],
['option',
	['Open bottle', [2]],
	['Smash bottle on the floor', [3]],
	['Leave', [100]],
],
['An unknown voice', "Arya tries to open bottle. Arya's attack is not very effective.", [1]],
['An unknown voice', "Arya's Attack is devastating. The bottle cracks and bursts into a thousand pieces"],
['Arya', "A note fell down."],
['', "| Arya starts reading the note |"],
['Mysterious Note', "Dear Maria, I wanted to thank you for all the time that you spent with me. You are more fun than anyone or anything I know"],
['Mysterious Note', "I hope that you will never lose this beautiful smile! Warmly, Kennen"],
['Arya', "It must be beautiful receiving such a letter..."],
['Arya', "Wait... This message must be adressed to our Maria. Her husband Kennen died a few months ago."],
['Arya', "We should bring her this letter. She hasn't been the same since then."],
['option', 
  ['Accept Quest', [12, "commit('quests/acceptQuest', 'letterToMaria', {root:true})"]],
  ["Leave", [100]]
],
['Arya', "Okay, great. The quest was added to our questlog."],
['Arya', "Maria's home is to the South East of here. Let's go!", ['endConversation',"vueStore.dispatch('loadInterface/openQuestContainer', 'writeNote', {root:true})"]],
];


let starDialogue = [
['Arya', 'Items are places for you to store and share with me inspirations that are important to you'],
['Arya', 'This one is already linked up! In the near future you are going to be able to share yours with me'],
['option',
	['Discover the link', [3, "https://www.ted.com/talks/jane_mcgonigal_gaming_can_make_a_better_world"]],
],
['Memory Star', 'Visit me anytime'],
['Arya', "Let's get down. I want to show you the city!"],
];

let dialogue1 = [
['Your NPC', 'Hey there my friend!'],
['option',
	['You can add a link here', [1, "commit('setCurrentMessageType', 'addLink')"]],
	['further options', [2, "commit('setCurrentMessageType', 'option')"]],
	['go away', [10]],
],
['option',
	['change Link', [2, "commit('setCurrentMessageType', 'addLink')"]],
	['go back', [1]],
],
];

//['follow me', [10, 'console.log("follow function should be called here")']], ['pick Item up', [2, "dispatch('createNPCs/pickYourItemUp', '', {root:true})"]],
// If I add a third option it doesn't work anymore

let dialogue2 = [
['A random item', 'Please connect me'],
['option',
	['You can add a link here', ["commit('setCurrentMessageType', 'addLink')"]],
	['go away', [10]],
],
];


export default {
	namespaced: true,
	state : {
		objectsInInventory: [],
		objects: {
			'star':
			{
			'name': 'star',
			'image': '../assets/star.png',
			'dialogue': starDialogue,
			'objectClicked': false,
			'link': '',
			'quantity': 1,
			'size': [25,25],
			'offSet': [0,0],
            },
            'bottle':
			{
			'name': 'bottle',
			'image': '../assets/sprites/halfbottle.png',
			'dialogue': dialogueBottle,
			'objectClicked': false,
			'link': '',
			'quantity': 0,
			'size': [22,22],
			'offSet': [0,0],
            },
            'bomb':
			{
			'name': 'bomb',
			'image': '../assets/bomb.png',	
			'dialogue': dialogueBottle,
			'objectClicked': false,
			'link': '',
			'quantity': 0,
			'size': [30,30],
			'offSet': [0,0],
			// ref1 Add other variables if necessary, first here then to gameContainerClicked
            },
		},
		itemCurrentlySelected: false,
		makeGameScreenClickable: false,
	},
	getters: {

	},
	actions: {
		pickYourItemUp({dispatch, rootState}){
			// Find item --> look at characterInteraction
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let name = scene.characterInteraction[0];
			alert("!")
			console.log(name)
			dispatch('findItem', name)

		},


		gameContainerClicked({state, commit, dispatch, rootState}){
			 if(state.itemCurrentlySelected){
			 	console.log('implement ' + state.itemCurrentlySelected + ' in map')

				let scene = Grow.scene.scenes[rootState.player.sceneActive];
				let map = scene.map;
				let pointer = scene.input.activePointer;
    			let worldPoint = pointer.positionToCamera(scene.cameras.main);
    			let pointerTileXY = map.worldToTileXY(worldPoint.x, worldPoint.y);
    			let snappedWorldPoint = map.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
    			let name = 'item_' + snappedWorldPoint.x + '_'  + snappedWorldPoint.y + '_in_scene_' + rootState.player.sceneActive;
        	    
        	    // Get position of item based on the key of itemCurrentlySelected; won't work with 2 items of the same kind?
        	    let positionOfItem = 0;
        	    for(let i=0;i<state.objectsInInventory.length;i++){
        	    	if(state.objectsInInventory[1] === state.itemCurrentlySelected){
        	    		return positionOfItem = i;
        	    	}
        	    } 

        	    
        	    
    			// phaserUtilities character.js
    			scene[name] = new Character({
		            scene: scene,
		            key: state.itemCurrentlySelected, 
		            x: snappedWorldPoint.x,
		            y: snappedWorldPoint.y,
		            furtherVar: [
		              ['name', name],
		              ['interaction', 'dialogue'],
		              ['dialogue', state.objects[state.itemCurrentlySelected].dialogue],
		              ['dialogueStartsAt', 0],
		              ['size', [25,25]],
		              ['offSet', [0,0]],
		              ['createdCharacter', true],
		              ['link', state.objectsInInventory[positionOfItem][2]],
		              ['size', state.objects[state.itemCurrentlySelected].size],
		              ['offSet', state.objects[state.itemCurrentlySelected].offSet],
		              // ref1 Add other variables if necessary, first to state.objects then here
		            ]
        		});
         	
        	// remove item
        	commit('removeItemFromItemList', positionOfItem)
        	
        	//UNFINISHED: Close url input field, use when working with quantities
        	//dispatch('showUrlInputField', state.itemCurrentlySelected)
        	
        	// Unselect items
        	commit('unselectItem')

        }
    },


		findItem({commit}, item){
			commit('findItem', item)
		},

		objectClicked({state, commit, dispatch}, name){
			commit('objectClicked', name)

			if(!state.itemCurrentlySelected){
				commit('itemCurrentlySelected', name)
				setTimeout(function(){dispatch('addIntoGame')}, 0);
			} else {
				commit('unselectItem')
			}
		},

    	addIntoGame({state, commit, rootState}){
            
            //Click on place to get coordinates
            commit('loadInterface/makeGameScreenClickable', '', {root:true})
        

            if(rootState.loadInterface.makeGameScreenClickable){
				// Change cursor (later copy of item should be attached to cursor)
			    document.getElementById("game-screen").style.cursor = "pointer";
			} else {
				document.getElementById("game-screen").style.cursor = "default";
			}
		},

	},
	mutations: {
		findItem(state, item){
			state.objectsInInventory.push(item)
			console.log(state.objectsInInventory)
		},

		objectClicked(state, name){
			state.objects[name].objectClicked = !state.objects[name].objectClicked
		},

		getCoordinates(state){
			state.getCoordinates = !state.getCoordinates
		},

		itemCurrentlySelected(state, name){
			state.itemCurrentlySelected = name;
		},

		unselectItem(state){
			state.itemCurrentlySelected = false;
		},

		removeItemFromItemList(state, positionOfItem){
			//UNFINISHED: Should work with quantity later on
			state.objectsInInventory.splice(positionOfItem, 1);
		}
	}

}


























/*

Actions 

	saveInput({commit, state}, index){
			// Get text of input
			let newInput = event.target.previousElementSibling.value;
			// save it to variable
			commit('saveInput', [newInput, index]);

			// close input field
			commit('showUrlInputField', state.objectsInInventory[index]);
	},

Mutations

	saveInput(state, obj){
			state.objects[state.objectsInInventory[obj[1]]].link = obj[0]
		},


*/