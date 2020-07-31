// import chatsReducer, { getChats, setChats } from './chats-reducer.js'
// import { authAPI } from '../api/api.js';

// const login = async(username, password) => {
//     let response = await authAPI.login(username, password)
//     if (response.data.resultCode === 0){
//         return response.data.data.token
//     }
// }

// // const getLogin = () => new Promise(res => )

// it('len of chats shold be equals 2', async() => {
//     let state = {
//         username: 'Mexus_1',
//         password: 'hello111',
//         chats: [],
//         token: null
//         };
//     state.token = await login(state.username, state.password)
//     let action = getChats();
    
//     let expectedChats = [
//         {"dialogs": [
//         {
//             "id": 2,
//             "name": "Mexus_0"
//         }
//         ],
//         "conversations": [
//             {
//                 "id": 2,
//                 "name": "HERE WE GO AGAIN"
//             }
//         ]}]

//     let newState = profileReducer(state, action);
  
//     expect(newState.posts.length).toBe(5);
//   });