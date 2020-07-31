import { chatsAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import replaceQuotes from "../components/common/utils/quotes";

const SET_CHATS = 'SET_CHATS';
const SET_CHATS_ALIAS_MAP = 'SET_CHATS_ALIAS_MAP';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_CURRENT_CHAT_DATA = 'SET_CURRENT_CHAT_DATA';
const EDIT_MESSAGE = 'EDIT_MESSAGE';

const CURRENT_CHAT_DATA_FETCHING = 'CURRENT_CHAT_DATA_FETCHING';
const TOOGLE_IS_UNMOUNT = 'TOOGLE_IS_UNMOUNT';

const ADD_USERS_TO_SELECT = 'ADD_USERS_TO_SELECT'

let initialState = {
    chatId: null,
    chatTypeId: null,
    chatsAliases: [],
    messages: [],
    chats: [], //  "dialogs": [{"id": 1,"name": "Mexus_1"}],"conversations": [{ "id": 1,"name": "HERE WE GO AGAIN" }]
    // messages: [], 
    // newMessageBody: ""
    currentChat: null,
    isFetching: false,
    isUnmount: false,

    usersToSelect: []
};


const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS: {
            return {...state, chats: action.chats} //
        }
        case SET_CHATS_ALIAS_MAP: {
            return {...state, chatsAliases: action.chatsAliases}
        }
        case SET_MESSAGES: {
            return {...state, messages: action.messages}
        }
        case SET_CURRENT_CHAT_DATA: {
            return {...state, chatId: action.chatId, chatTypeId: action.chatTypeId, currentChat: action.currentChat}
        }
        case TOOGLE_IS_UNMOUNT: {
            return {...state, isUnmount: action.isUnmount}
        }

        case CURRENT_CHAT_DATA_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }


        case ADD_USERS_TO_SELECT: {
            return {...state, usersToSelect: action.usersToSelect}
        }


        case EDIT_MESSAGE: {
            return {...state, messages: state.messages.map(msg => (msg.id === action.messageId ? { ...msg, body: action.newMessageBody} : msg) ) }
        }
        default:
            return state;
    }
}


export const setCurrentChatIdsToStore = (chatTypeId, chatId, currentChat) => ({type: SET_CURRENT_CHAT_DATA, chatId, chatTypeId, currentChat})

export const currentChatDataFetching = (isFetching) => ({type: CURRENT_CHAT_DATA_FETCHING, isFetching})

export const toogleIsUnmount = (isUnmount) => ({type: TOOGLE_IS_UNMOUNT, isUnmount})



export const addUsersToSelect = (usersToSelect) => ({type: ADD_USERS_TO_SELECT, usersToSelect})



export const requestUsersForChat = () => async(dispatch) => {
    // let result = []
    // let error = false//{data:{resultCode:0}}
    // let page = 1 
    // debugger
    // do
    // {
    //     let response = await usersAPI.getUsers(page);
    //     debugger
    //     console.log(response)
    //     if(response.data.resultCode!==0){
    //         debugger
    //         // result.push({'photos': (replaceQuotes(response.data.data.photos)).small,  "userId": response.data.data.userId,  'name': response.data.data.name})
    //         result.push({"userId": response.data.data.userId,  'name': response.data.data.name})
    //         page++;
    //     } else {
    //         error = true;
    //     }
    // } while(!error)
    // debugger
    let response = await usersAPI.getUsers(1);
    let result = []
    // debugger
    if(response.data.users.error===null){
        // debugger
        // result.push({'photos': (replaceQuotes(response.data.data.photos)).small,  "userId": response.data.data.userId,  'name': response.data.data.name})
        result = response.data.users.items.map(user => ({"userId": user.userId,  'name': user.name}))
        // page++;
    }
    dispatch(addUsersToSelect(result))
}





export const setCurrentChatData = (chatTypeId, chatId) => (dispatch) =>{
    dispatch(currentChatDataFetching(true))
    localStorage.setItem('chatTypeId', chatTypeId)
    localStorage.setItem('chatId', chatId)
    dispatch(currentChatDataFetching(false))
}



export const unSetCurrentChatData = () => (dispatch) =>{
    delete localStorage['chatId']
    delete localStorage['chatTypeId']
    dispatch(setCurrentChatIdsToStore(null, null, null))
}


export const getCurrentChatData = () => async(dispatch) =>{
    // debugger
    let chatId = parseInt(localStorage.getItem('chatId') )
    let chatTypeId = parseInt(localStorage.getItem('chatTypeId') )
    

    let response = await chatsAPI.getChat(chatTypeId, chatId)
    if(response.data.resultCode === 0){
        // debugger
        let isUpdated = 'local';
        if(!('local' in response.data.data.lastMessage)){
            console.log('pizdez no local in lastMessage in getCurrentChatData')
        }
        else if (!response.data.data.lastMessage.local){
            isUpdated = await dispatch(updateUnreadMsgs(chatTypeId, chatId, response.data.data.lastMessage.id))
        }
        // debugger
        if(isUpdated==='local' || isUpdated.data.resultCode === 0){
            let chatType = chatTypeId===0? 'dialog': 'conversation'
            response.data.data["chatTypeId"]=chatTypeId
            response.data.data["chatType"]=chatType
            response.data.data["chatId"]=chatId
            dispatch(setCurrentChatIdsToStore(chatTypeId, chatId, response.data.data))
            await dispatch(getMessages(chatTypeId, chatId))
            // let gettedMessages = await dispatch(getMessages(chatTypeId, chatId)) // repopulate store
            // if(gettedMessages.data.resultCode === 0){
            //     console.log('messages getted')
            // } else {
            //     console.log('getCurrentChatData Error in getMessages'+ gettedMessages.data.messages[0])
            // }
        }  else {
            console.log('getCurrentChatData Error in updateUnreadMsgs'+ isUpdated.data.messages[0])
        }
    } else {
        console.log('getCurrentChatData Error in getChat'+ response.data.messages[0])
    }
}



export const setChats = (chats) => ({type: SET_CHATS, chats})
export const setMessages = (messages) => ({type: SET_MESSAGES, messages})
export const editMessage = (messageId, newMessageBody) => ({type: EDIT_MESSAGE, messageId, newMessageBody})


export const setChatsAliasMap = (chatsAliases) => ({type: SET_CHATS_ALIAS_MAP, chatsAliases})

const getChatHelper = async(chatType, chatTypeId, chatArray) => {
    let unfilteredArray = await Promise.all(chatArray
        .map(async (chat) => {
        let response = await chatsAPI.getChat(chatTypeId, chat.id)
        if(response.data.resultCode === 0){
            response.data.data["chatTypeId"]=chatTypeId
            response.data.data["chatType"]=chatType
            response.data.data["chatId"]=chat.id
            return response.data.data
        } else {
            console.log('getChat Error '+ response.data.messages[0])
            return null
        }
        } ))
    return unfilteredArray.filter(chat => chat!==null)
    }
        



export const getChats = () => async(dispatch) => {
    let response = await chatsAPI.getChats(); // chatTypeId, chatId// =>
    if(response.data.resultCode === 0){
        let dialogs = await getChatHelper('dialog', 0, response.data.data.dialogs)
        let conversations = await getChatHelper('conversation', 1, response.data.data.conversations)
        let chats = [...dialogs, ...conversations]
        console.log(chats)
        dispatch(setChats(chats))

    } else {
        console.log('getChats error '+ response.data.messages[0])
    }
}

// чтобы не хранить кучу данных мы не дописываем в свойства сообщений чат к которому они относятся
const getMessagesHelper = (array, readed, chatTypeId, chatId) => array.map(msg => (msg[readed]=readed, msg[chatTypeId]=chatTypeId, msg[chatId]=chatId, msg))

export const getMessages = (chatTypeId, chatId) =>  async(dispatch) => {
    let response = await chatsAPI.getMessages(chatTypeId, chatId);
    if(response.data.resultCode === 0){
        // TODO move to chats-selector
        let allMsgs = [...getMessagesHelper(response.data.data.oldMsgs, true, chatTypeId, chatId), ...getMessagesHelper(response.data.data.newMsgs, false)].sort((msg1, msg2) => msg1.sended - msg2.sended)
        dispatch(setMessages(allMsgs))
    } else {
        console.log('getMessages error '+ response.data.messages[0])
    }
}



export const createMessageRequest = (chatTypeId, chatId, messageBody) => async(dispatch) => {

    let response = await chatsAPI.createMessage(chatTypeId, chatId, messageBody);
    if(response.data.resultCode === 0){
        // dispatch(getMessages(chatTypeId, chatId))
    } else {
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("CreateMessage", {_error: message}));
    }
}

export const editMessageRequest = (chatTypeId, chatId, messageId, newMessageBody) => async(dispatch) =>{

    let response = await chatsAPI.editMessage(chatTypeId, chatId, messageId, newMessageBody);
    if(response.data.resultCode === 0){
        console.log('succs edited')
    } else {
        console.log('editMessageRequest error '+ response.data.messages[0])
    }
}


export const deleteMessageRequest = (chatTypeId, chatId, messageId) =>  async(dispatch) =>{
    let response = await chatsAPI.deleteMessage(chatTypeId, chatId, messageId);
    if(response.data === ''){
        console.log('succs deleted')
    } else {
        console.log('deleteMessageRequest deleted '+ response.data.messages[0])
    }
}



const clearChatTypes = ['myLocal', 'myGlobal', 'allLocal', 'allGlobal'];
export const clearChat = (chatTypeId, chatId, putType, clearType) => async(dispatch) => {
    // if (!['myLocal', 'myGlobal', 'allLocal', 'allGlobal'].includes(clearType)){
    //     console.log('unsupported clearType')
    //     return null
    // }
    // debugger
    let response = await chatsAPI.clearChat(chatTypeId, chatId,  putType, clearType);
    // debugger
    if(response.data.resultCode === 0){
        return response.data.data.cleared
    } else {
        console.log('clearLocalChat deleted '+ response.data.messages[0])
    }
}
export const clearChatMyLocal = (chatTypeId, chatId, putType='clear', clearType=clearChatTypes[0])   => clearChat(chatTypeId, chatId, putType, clearType)
export const clearChatMyGlobal = (chatTypeId, chatId, putType='clear', clearType=clearChatTypes[1])  => clearChat(chatTypeId, chatId, putType, clearType)
export const clearChatAllLocal = (chatTypeId, chatId, putType='clear', clearType=clearChatTypes[2]) =>  clearChat(chatTypeId, chatId, putType, clearType)
export const clearChatAllGlobal = (chatTypeId, chatId, putType='clear', clearType=clearChatTypes[3]) =>  clearChat(chatTypeId, chatId, putType, clearType)



export const updateUnreadMsgs = (chatTypeId, chatId, lastGlobalReadMsgId, putType='updateUnreadMsgs') => async(dispatch) => {
    let response = await chatsAPI.updateUnreadMsgs(chatTypeId, chatId, putType, lastGlobalReadMsgId)
    if(response.data.resultCode === 0){
        console.log('updateUnreadMsgs updated')
    } else {
        console.log('updateUnreadMsgs error')
    }
    return response
}


export const createChatRequest = (snusers, name) => async(dispatch) => {
    let response = await chatsAPI.createChat(snusers, name)
    if(response.data.resultCode === 0){
        console.log('createChatRequest created: ' + response.data.data.created)
    } else {
        console.log('createChatRequest error')
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("CreateChat", {_error: message}));
    }
}

export const createConversation = (snusers, name) => createChatRequest(snusers, name)
export const createDialog = (snusers, name=null) => createChatRequest(snusers, name)

export default chatsReducer;



// startMsgId // lastReadMessageId // msgsType
// 0
// 8
// old
// <QuerySet []>
// <QuerySet []>
// listOfLocalSubs
// []
// returnList
// [<QuerySet []>, <QuerySet [<ConversationMessage: ConversationMessage object (8)>]>]
// <QuerySet []>
// listOfLocalSubs
// []
// returnList
// [[], <QuerySet [<ConversationMessage: ConversationMessage object (8)>]>]
// lastReadMessageId // msgsType
// 8
// new
// [31/Jul/2020 17:50:08] "GET /api/chats/1/6/messages/ HTTP/1.1" 200 291
// startMsgId // lastReadMessageId // msgsType
// 0
// 7
// old
// <QuerySet [<MyConversationMessage: MyConversationMessage object (8)>]>
// <QuerySet [<MyConversationMessage: MyConversationMessage object (8)>]>
// listOfLocalSubs
// [8]
// returnList
// [<QuerySet [<MyConversationMessage: MyConversationMessage object (8)>]>, <QuerySet []>]
// <QuerySet [<MyConversationMessage: MyConversationMessage object (8)>]>
// listOfLocalSubs
// [8]
// returnList
// [[], <QuerySet []>]
// lastReadMessageId // msgsType
// 7
// new

// [local, global]