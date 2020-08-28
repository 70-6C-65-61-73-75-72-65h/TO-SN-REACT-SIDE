import { chatsAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import replaceQuotes from "../components/common/utils/quotes";
import { idbKeyval } from "../components/common/utils/indexedDB";

const SET_CHATS = 'SET_CHATS';
const SET_CHATS_ALIAS_MAP = 'SET_CHATS_ALIAS_MAP';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_CURRENT_CHAT_DATA = 'SET_CURRENT_CHAT_DATA';
const EDIT_MESSAGE = 'EDIT_MESSAGE';

const CURRENT_CHAT_DATA_FETCHING = 'CURRENT_CHAT_DATA_FETCHING';
const TOOGLE_IS_UNMOUNT = 'TOOGLE_IS_UNMOUNT';

// const ADD_USERS_TO_SELECT = 'ADD_USERS_TO_SELECT'
const SET_CURRENT_CHAT_MEMBERS ='SET_CURRENT_CHAT_MEMBERS'
const SET_CURRENT_CHAT_PHOTO = 'SET_CURRENT_CHAT_PHOTO'
const SET_CURRENT_CHAT_NAME = 'SET_CURRENT_CHAT_NAME'


const SET_READ_FROM_INDEX = 'SET_READ_FROM_INDEX'

// const ADD_FILE_AS_LOADING = 'ADD_FILE_AS_LOADING'
// const REMOVE_FILE_AS_LOADING = 'REMOVE_FILE_AS_LOADING'


let initialState = {
    chatId: null,
    chatTypeId: null,
    chatsAliases: [],
    messages: [],
    chats: [], //  "dialogs": [{"id": 1,"name": "Mexus_1"}],"conversations": [{ "id": 1,"name": "HERE WE GO AGAIN" }]
    // messages: [], 
    // newMessageBody: ""
    currentChat: null, // + 'readFromIndex'
    isFetching: false,
    isUnmount: false,

    // usersToSelect: [],

    membersToSelect: [],

    readFromIndex: null,
    loadingFilesIds: [],
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

        case SET_CURRENT_CHAT_MEMBERS: {
            return {...state, currentChat: {...state.currentChat, members: action.members}}
        }
        case SET_CURRENT_CHAT_NAME: {
            return {...state, currentChat: {...state.currentChat, name: action.name}}
        }
        case SET_CURRENT_CHAT_PHOTO: {
            return {...state, currentChat: {...state.currentChat, chatPhoto: action.chatPhoto}}
        }

        case SET_READ_FROM_INDEX: {
            return {...state, readFromIndex: action.readFromIndex}
        }
        // case ADD_USERS_TO_SELECT: {
        //     return {...state, usersToSelect: action.usersToSelect}
        // }

        // case ADD_FILE_AS_LOADING: {
        //     return {...state, loadingFilesIds: action.fileId}
        // }
        // case REMOVE_FILE_AS_LOADING: {
        //     return {...state, loadingFilesIds: action.fileId} // delete from list of loading and then add url of file to download ( if photo to <img src='api/file/{fileId}'> else only url <a href='api/file/{fileId}')
        // }

        case EDIT_MESSAGE: {
            return {...state, messages: state.messages.map(msg => (msg.id === action.messageId ? { ...msg, body: action.newMessageBody} : msg) ) }
        }
        default:
            return state;
    }
}



export const setCurrentChatMembers = (members) => ({type: SET_CURRENT_CHAT_MEMBERS, members})
export const setCurrentChatName = (name) => ({type: SET_CURRENT_CHAT_NAME, name})
export const setCurrentChatPhoto = (chatPhoto) => ({type: SET_CURRENT_CHAT_PHOTO, chatPhoto})



export const setCurrentChatIdsToStore = (chatTypeId, chatId, currentChat) => ({type: SET_CURRENT_CHAT_DATA, chatId, chatTypeId, currentChat})

export const currentChatDataFetching = (isFetching) => ({type: CURRENT_CHAT_DATA_FETCHING, isFetching})

export const toogleIsUnmount = (isUnmount) => ({type: TOOGLE_IS_UNMOUNT, isUnmount})



// export const addUsersToSelect = (usersToSelect) => ({type: ADD_USERS_TO_SELECT, usersToSelect})



// export const requestUsersForChat = () => async(dispatch) => {
//     // let result = []
//     // let error = false//{data:{resultCode:0}}
//     // let page = 1 
//     // debugger
//     // do
//     // {
//     //     let response = await usersAPI.getUsers(page);
//     //     debugger
//     //     console.log(response)
//     //     if(response.data.resultCode!==0){
//     //         debugger
//     //         // result.push({'photos': (replaceQuotes(response.data.data.photos)).small,  "userId": response.data.data.userId,  'name': response.data.data.name})
//     //         result.push({"userId": response.data.data.userId,  'name': response.data.data.name})
//     //         page++;
//     //     } else {
//     //         error = true;
//     //     }
//     // } while(!error)
//     // debugger
//     let response = await usersAPI.getUsers(1);
//     let result = []
//     // debugger
//     if(response.data.users.error===null){
//         // debugger
//         // result.push({'photos': (replaceQuotes(response.data.data.photos)).small,  "userId": response.data.data.userId,  'name': response.data.data.name})
//         result = response.data.users.items.map(user => ({"userId": user.userId,  'name': user.name}))
//         // page++;
//     }
//     dispatch(addUsersToSelect(result))
// }

export const setChats = (chats) => ({type: SET_CHATS, chats})
export const setMessages = (messages) => ({type: SET_MESSAGES, messages})
export const editMessage = (messageId, newMessageBody) => ({type: EDIT_MESSAGE, messageId, newMessageBody})


export const setChatsAliasMap = (chatsAliases) => ({type: SET_CHATS_ALIAS_MAP, chatsAliases})


export const setReadFromIndexMsgs = (readFromIndex) => ({type: SET_READ_FROM_INDEX, readFromIndex}) 


// export const addFileAsLoading = (fileId) => ({type: ADD_FILE_AS_LOADING, fileId}) 
// export const removeFileAsLoading = (fileId) => ({type: REMOVE_FILE_AS_LOADING, fileId}) 



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


export const getCurrentChatData = () => async(dispatch) => {
    // debugger
    let chatId = parseInt(localStorage.getItem('chatId') )
    let chatTypeId = parseInt(localStorage.getItem('chatTypeId') )
    

    let response = await chatsAPI.getChat(chatTypeId, chatId)
    if(response.data.resultCode === 0){
        // debugger
        let isUpdated = 'local';
        console.log(response.data.data)
        if(!('local' in response.data.data.lastMessage)){
            console.log('pizdez no local in lastMessage in getCurrentChatData')
        }
        else if (!response.data.data.lastMessage.local){
            console.log('not here')
            isUpdated = await dispatch(updateUnreadMsgs(chatTypeId, chatId, response.data.data.lastMessage.id))
        }
        // debugger
        if(isUpdated==='local' || isUpdated.data.resultCode === 0){
            let chatType = chatTypeId===0? 'dialog': 'conversation'
            response.data.data["chatTypeId"]=chatTypeId
            response.data.data["chatType"]=chatType
            response.data.data["chatId"]=chatId
            dispatch(setCurrentChatIdsToStore(chatTypeId, chatId, response.data.data))
            // response.data.data + ['readFromIndex'] // 
            // console.log('checcc')
            // console.log(response.data)
            dispatch(setReadFromIndexMsgs(response.data.data.readFromIndex))

            // let msgsResponse = 
            await dispatch(getMessages(chatTypeId, chatId, response.data.data.readFromIndex)) // first readFromIndex === len(lastMsg) - 10 ( if exist 10 else then -num ( but anyway it less then we need) )
            // should send 'readFromIndex'
            // console.log('\n\n\n')
            // console.log(msgsResponse)
            // if(msgsResponse.data.resultCode === 0){
            //     let readFromIndex = msgsResponse.data.data['readFromIndexNext']
            //     dispatch(setReadFromIndexMsgs(readFromIndex))
            // } else{
            //     console.log('msgsResponse error in getCurrentChatData\n\npizdez\n\n')
            // }


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


// setCurrentChatMembers

export const refreshCurrentChatData = (method, requiredDataKey) => async(dispatch) => {
    let chatId = parseInt(localStorage.getItem('chatId') )
    let chatTypeId = parseInt(localStorage.getItem('chatTypeId') )
    let response = await chatsAPI.getChat(chatTypeId, chatId)
    if(response.data.resultCode === 0){
        dispatch(method(response.data.data[requiredDataKey]))
    } else {
        console.log('refreshCurrentChatData Error in getChat'+ response.data.messages[0])
    }
}






// const getChatHelper = async(chatType, chatTypeId, chatArray) => {
//     let unfilteredArray = await Promise.all(chatArray
//         .map(async (chat) => {
//         let response = await chatsAPI.getChat(chatTypeId, chat.id)
//         if(response.data.resultCode === 0){
//             response.data.data["chatTypeId"]=chatTypeId
//             response.data.data["chatType"]=chatType
//             response.data.data["chatId"]=chat.id
//             return response.data.data
//         } else {
//             console.log('getChat Error '+ response.data.messages[0])
//             return null
//         }
//         } ))
//     return unfilteredArray.filter(chat => chat!==null)
//     }
        


const getChatHelper = async(chatArray) => {
    let unfilteredArray = await Promise.all(chatArray
        .map(async (chat) => {
        let response = await chatsAPI.getChat(chat.chatTypeId, chat.id)
        if(response.data.resultCode === 0){
            response.data.data["chatTypeId"] = chat.chatTypeId
            response.data.data["chatId"]=chat.id
            response.data.data["chatTimeStamp"]=chat.chatTimeStamp
            if(chat.chatTypeId===0){
                response.data.data["chatType"]='dialog'
            } else{
                response.data.data["chatType"]='conversation'
            }
            return response.data.data
        } else {
            console.log('getChat Error '+ response.data.messages[0])
            return null
        }
        } ))
    // return unfilteredArray.filter(chat => chat!==null)
    return unfilteredArray.sort((chat1,chat2)=>chat2.chatTimeStamp - chat1.chatTimeStamp)
    }

export const getChats = (page=1, query=null) => async(dispatch) => {
    // debugger
    let response = await chatsAPI.getChats(page, query); // chatTypeId, chatId// =>
    if(response.data.resultCode === 0){
        // let dialogs = await getChatHelper('dialog', 0, response.data.data.dialogs)
        // let conversations = await getChatHelper('conversation', 1, response.data.data.conversations)
        // let chats = [...dialogs, ...conversations]
        // console.log(chats)
        let chats = await getChatHelper(response.data.data.chats.items)
        dispatch(setChats(chats))
    } else {
        console.log('getChats error '+ response.data.messages[0])
    }
}

// чтобы не хранить кучу данных мы не дописываем в свойства сообщений чат к которому они относятся
const getMessagesHelper = (array, chatTypeId, chatId) => array.map(msg => (msg[chatTypeId]=chatTypeId, msg[chatId]=chatId, msg))


// TODO c set start position of view messages on last readed and then after scroll setting 1 by 1 msgs as viewed
export const getMessages = (chatTypeId, chatId, readFromIndex, query=null) =>  async(dispatch) => {
    let response = await chatsAPI.getMessages(chatTypeId, chatId, readFromIndex, query);
    if(response.data.resultCode === 0){
        // console.log(`getMessages.response.data.data`);
        // console.log(response.data)
        // TODO move to chats-selector
        // let allMsgs = [...getMessagesHelper(response.data.data.oldMsgs, true, chatTypeId, chatId), ...getMessagesHelper(response.data.data.newMsgs, false)].sort((msg1, msg2) => msg1.sended - msg2.sended)
        let allMsgs = getMessagesHelper(response.data.data.items, chatTypeId, chatId) // readed changed to msgViewed
        dispatch(setMessages(allMsgs))
        dispatch(setReadFromIndexMsgs(response.data.data['readFromIndexNext']))
    } else {
        console.log('getMessages error '+ response.data.messages[0])
    }
}



export const getFile = (fileId) => async(dispatch) => {
    let downloadedFile = await chatsAPI.getFile(fileId)
    console.log("downloadedFile")
    console.log(downloadedFile)
    return downloadedFile.data
    // return downloadedFile
}

// export const downloadFile = (filePath) => async(dispatch) => {
//     let file = await chatsAPI.downloadFile(filePath)
//     // return file
// }

// then TODO download files to idb to use after from idb not from server!!!!!!
// export const downloadFilesToContent = (fileId) => async(dispatch)  => {
//     // dispatch(addFileAsLoading(fileId))
//     let downloadedFile = await chatsAPI.getFile(fileId)
//     console.log("downloadedFile")
//     console.log(downloadedFile)
//     if(downloadedFile.data.resultCode === 0){
//         idbKeyval.set(`fileId_${fileId}`, downloadedFile.data.file) // may use `fileId_${fileId}` ,
//         // dispatch(downloadedFile.data.file) // fileId
//     }
//     // dispatch(removeFileAsLoading(fileId))
// }

const createMessageSnippent = async(chatTypeId, chatId, messageBody, fileId, dispatch) => {
    let response = await chatsAPI.createMessage(chatTypeId, chatId, messageBody, fileId);
    if(response.data.resultCode === 0){
        // dispatch(getMessages(chatTypeId, chatId))
    } else {
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("CreateMessage", {_error: message}));
    }
}

export const createMessageRequest = (chatTypeId, chatId, messageBody, file=null) => async(dispatch) => {
    console.log('in createMessageRequest')
    console.log(file)
    if (file!==null){
        // let fileUploadResponse = await chatsAPI.uploadFile(file) // TIP there is problems
        let fileUploadResponse = await chatsAPI.uploadFile(file['fileURL'], file['fileName'])
        console.log(`fileUploadResponse.data`);
        console.log(fileUploadResponse.data.data)
        if(fileUploadResponse.data.data['fileId']){
            // console.log(fileUploadResponse.data.data['fileId'])
            createMessageSnippent(chatTypeId, chatId, messageBody, fileUploadResponse.data.data['fileId'], dispatch)
        } else {
            console.log('fileUploadResponse error')
            console.log(Object.keys(fileUploadResponse.data.data))
        }
    } else {
        createMessageSnippent(chatTypeId, chatId, messageBody, null, dispatch)
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
    console.log('updateUnreadMsgs')
    console.log(chatTypeId, chatId, lastGlobalReadMsgId, putType='updateUnreadMsgs')
    let response = await chatsAPI.updateUnreadMsgs(chatTypeId, chatId, putType, lastGlobalReadMsgId)
    console.log(response.data)
    // debugger
    if(response.data.resultCode === 0){
        console.log('updateUnreadMsgs updated')
    } else {
        console.log('updateUnreadMsgs error')
    }
    return response
}


export const createChatRequest = (snusers, name) => async(dispatch) => {
    debugger
    let response = await chatsAPI.createChat(snusers, name)
    debugger
    if(response.data.resultCode === 0){
        console.log('createChatRequest created: ' + response.data.data.created)
    } else {
        console.log('createChatRequest error')
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("CreateChat", {_error: message}));
    }
}

export const createConversation = (snusers, name) => createChatRequest(snusers, name)
export const createDialog = (snusers) => createChatRequest(snusers, null)



export const deleteChatRequest = (chatTypeId, chatId) => async(dispatch) => {
    let response = await chatsAPI.deleteChat(chatTypeId, chatId)
    // debugger
    if(response.data === ''){
        console.log('chat succ deleted')
    } else {
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        console.log('deleteChatRequest error: ' + message)
    }
}

export const renameChatRequest = (chatTypeId, chatId, newChatName, putType='rename') => async(dispatch) => {
    // debugger
    let response = await chatsAPI.renameChat(chatTypeId, chatId, putType, newChatName)
    // debugger
    if(response.data.resultCode === 0){
        console.log('chat renamed:'+ response.data.data.renamed)
        dispatch(refreshCurrentChatData(setCurrentChatName, 'name'))
    } else {
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('renameChat', {_error: message}));
    }
}



// athunku // thunku // athunkrf


// all the same
export const toogleMemberStatus = (chatTypeId, chatId, userId, putType='toogleMemberStatus') => async(dispatch) => {
    // let response = await chatsAPI.toogleMemberStatusForConversation(chatTypeId, chatId, putType, userId)
    // if(response.data.resultCode === 0){
    //     console.log('member status toggled: ' + response.data.data.toggled)
    // } else {
    //     let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
    //     console.log('toogleMemberStatusForConversation error: '+ message)
    // }
    await chatPutParts(chatTypeId, chatId, userId, putType, chatsAPI.toogleMemberStatusForConversation.bind(chatsAPI), 'member status toggled: ', 'toggled', 'toogleMemberStatusForConversation error: ', dispatch, setCurrentChatMembers, 'members')
}

export const addMember = (chatTypeId, chatId, userId, putType='addMember') => async(dispatch) => {
    console.log('adding member')
    console.log(chatTypeId, chatId, userId)
    // let response = await chatsAPI.addMemberForConversation(chatTypeId, chatId, putType, userId)
    // if(response.data.resultCode === 0){
    //     console.log('member added: ' + response.data.data.memberAdded)
    // } else {
    //     let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
    //     console.log('addMember error: '+ message)
    // }
    await chatPutParts(chatTypeId, chatId, userId, putType, chatsAPI.addMemberForConversation.bind(chatsAPI), 'member added: ', 'memberAdded', 'addMember error: ', dispatch, setCurrentChatMembers, 'members')
}

// после удаления мембера у которого были сообзения Bad Request: /api/chats/1/23/messages/
export const removeMember = (chatTypeId, chatId, userId, putType='removeMember') => async(dispatch) => {
    // let response = await chatsAPI.removeMemberFromConversation(chatTypeId, chatId, putType, userId)
    // if(response.data.resultCode === 0){
    //     console.log('member removed: ' + response.data.data.memberRemoved)
    // } else {
    //     let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
    //     console.log('removeMember error: '+ message)
    // }
    // debugger 
    // if(response.data.resultCode === 0){ storeDispatchMethod
    //     storeDispatchMethod && dispatch(refreshCurrentChatData(storeDispatchMethod)) // chatTypeId, chatId
    // } 
    let response = await chatPutParts(chatTypeId, chatId, userId, putType, chatsAPI.removeMemberFromConversation.bind(chatsAPI), 'member removed: ', 'memberRemoved', 'removeMember error: ', dispatch, setCurrentChatMembers, 'members')

}


export const removeMemberMsgs = (chatTypeId, chatId, userId, putType='removeMemberMsgs') => async(dispatch) => {
    // let response = await chatsAPI.removeMemberMsgsForConversation(chatTypeId, chatId, putType, userId)
    // if(response.data.resultCode === 0){
    //     console.log('member msgs removed: ' + response.data.data.memberMsgsRemoved)
    // } else {
    //     let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
    //     console.log('removeMemberMsgs error: '+ message)
    // }
    await chatPutParts(chatTypeId, chatId, userId, putType, chatsAPI.removeMemberMsgsForConversation.bind(chatsAPI), 'member msgs removed: ', 'memberMsgsRemoved', 'removeMemberMsgs error: ')
}

export const removeOneMemberMsg = (chatTypeId, chatId, userId, putType='removeOneMemberMsg') => async(dispatch) => {
    // let response = await chatsAPI.removeOneMemberMsgForConversation(chatTypeId, chatId, putType, userId)
    // if(response.data.resultCode === 0){
    //     console.log('member msg removed: ' + response.data.data.memberMsgRemoved)
    // } else {
    //     let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
    //     console.log('removeOneMemberMsg error: '+ message)
    // }
    await chatPutParts(chatTypeId, chatId, userId, putType, chatsAPI.removeOneMemberMsgForConversation.bind(chatsAPI), 'member msg removed: ', 'memberMsgRemoved', 'removeOneMemberMsg error: ')
}


export const setChatPhotoRequest = (chatTypeId, chatId, newChatPhoto, putType='setChatPhoto') => async(dispatch) => {
    await chatPutParts(chatTypeId, chatId, newChatPhoto, putType, chatsAPI.setChatPhoto.bind(chatsAPI), 'chat photo changed: ', 'isChatPhotoChanged', 'setChatPhotoRequest error: ', dispatch, setCurrentChatPhoto, 'chatPhoto')
}
// all the same

const chatPutParts = async(chatTypeId, chatId, putData, putType, apiMethod, onSuccStr, onSuccDataKey, onErrorStr, dispatch=null, storeDispatchMethod=null, requiredDataKey=null) => {
    // debugger
    let response = await apiMethod(chatTypeId, chatId, putType, putData)
    // debugger
    if(response.data.resultCode === 0){
        console.log(onSuccStr + response.data.data[onSuccDataKey])
        storeDispatchMethod && dispatch(refreshCurrentChatData(storeDispatchMethod, requiredDataKey))
    } else {
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        console.log(onErrorStr + message)
    }
    return response;
}
export default chatsReducer;



// export const getChat = (chatTypeId, chatId) => async(dispatch) => {
//     let response = await chatsAPI.getChat(asyncAPIMethodParams)
//     if(response.data.resultCode === 0){
        
//     } else {
        
//     }
// }




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