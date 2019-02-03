const axios = require('axios');

export default {
    namespaced : true,
    state : {
        chatId: -1,
        roomId: -1,
        participants: [0,1],
        messages : [],
        users : []
    },
    actions : {
        updateUsers(context,user){
            

            context.commit('updateUsers',user);
            console.log('comm')
        },

        fetchMessages({commit}){
            axios.get('/api/fetchMessages').then(function(response){
                commit('setMessages',response.data.messages);
            });
        },

        fetchUsers({commit, rootState}){
             return new Promise((resolve,reject)=>{
                rootState.fakeBackEnd.getUsers((users)=>{
                    commit('fetchUsers',users);
                    resolve();
                });
            });
        },
        addUser(context,user){
            context.commit('addUser',user);
        },
        saveMessages(context,message){
            
           axios.post('/api/saveMessages',{newMessage:message
           }).then(function(response){
            console.log('bitch');
            console.log(response);
            //find a better solution because it's not optimal i believe, even tough client looked saved
            context.commit('concatMessages',[response.data.savedMessage]); 
           });

          
        },
        concatMessages(context,messages){
            context.commit('concatMessages',messages);
        }
    },
    getters : {

    },
    mutations : {
        updateUsers(state,user){
            let indexUser = state.users.findIndex(x=>user.id == x.id);

            state.users[indexUser] = {id:user.id,username:user.username};
        },
        addUser(state,user){
            state.users.push(user);
        },
        fetchUsers(state, users){
            state.users = users;
        },

        setMessages(state,messages){
            state.messages = messages;
        },

        concatMessages(state,messages){
            
            state.messages = state.messages.concat(messages);
        }
       
    }
};