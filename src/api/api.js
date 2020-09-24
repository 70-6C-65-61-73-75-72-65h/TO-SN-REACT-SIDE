import * as axios from 'axios'
import { idbKeyval } from '../components/common/utils/indexedDB';


const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-type": "application/json"
      }
})

instance.interceptors.request.use(
    async (config) => {
        // Do something before request is sent
        let token = await idbKeyval.get('token')
        // let token = localStorage.getItem('token') // if expired -> delete too
        if (token){
            config.headers["Authorization"] = "Bearer " + token;
        } else {
            delete config.headers["Authorization"]
            // debugger
        }
        // console.log(config)
        // debugger
        return config;
    },
    error => {
        Promise.reject(error);
    }
);


export const authAPI = {
    me(){
        return instance.get('api/auth/me/')
    },
    login(login, password){
        console.log(login, '    ' , password)
        return instance.post('api/auth/login/', {"username": login, "password": password})
    },
    signup(login, email, email2, password){
        return instance.post('api/auth/register/', {
        "username": login,
        "email": email,
        "email2": email2,
        "password": password
    })
    }
} 


export const profileAPI = {
    getProfile(userId){
        return instance.get(`api/profile/${userId}/`)
    },
    // проверка на то что имена переменных будут заданы соответственно с АПИ
    updateProfile(profileData){ // send here an object ( auto-sized update )
        // let {name=null, slug=null, status=null, photos=null, lookingForAJob=null, lookingForAJobDescription=null, fullname=null, contacts=null} = profileData
        return instance.put('api/profile/', profileData)
    },
    deleteProfile(){ // delete self profile -> so user too
        return instance.delete('api/profile/')
    },
    // getStatus(userId){
    //     return instance.get(`api/profile/status/${userId}`)
    // },
    updateStatus(status){
        return instance.put('api/profile/status/', {'status': status}) // like {status:status}
    },
    // getPhoto(userId){
    //     return instance.get(`api/profile/photo/${userId}`)
    // },
    updatePhoto(photo){
        // getHeaders()
        return instance.put('api/profile/photo/', {"photos": photo})
    }
}


export const usersAPI = {
    getUsers(currentPage = 1, query=null){
        // debugger // i dont know why i get query str -> then query==null /??????
        console.log(`api/users?page=${currentPage}&q=${query}`) // dont use &count=${pageSize}
        return query===null ? instance.get(`api/users?page=${currentPage}`) : instance.get(`api/users?page=${currentPage}&q=${query}`) 
    },
    // getUser(userId){
    //     return instance.get(`api/users/${userId}`)
    // },
    follow(userId){
        // debugger
        return instance.post(`api/follow/${userId}/`)
    },
    unfollow(userId){
        return instance.delete(`api/follow/${userId}/`)
    },
    getfollow(userId){
        return instance.get(`api/follow/${userId}/`)
    }
}

export const chatsAPI = {

    chatPut(chatTypeId, chatId, putType, secondArgName, secondArg){
        // debugger
        let putData = {"putType": putType}
        putData[secondArgName] = secondArg
        console.log(putData)
        return instance.put(`api/chats/${chatTypeId}/${chatId}/`, putData)
    },


    getChats(page, query){
        return query===null ? 
            instance.get(`api/chats/?page=${page}`) :
            instance.get(`api/chats/?page=${page}&query=${query}`)
    },
    createChat(snusers, name=null){ // snusers can be list of integers or integer
        return name!==null ? 
                            instance.post('api/chats/create/', {snusers, name}) : 
                            instance.post('api/chats/create/', {snusers})
    },
    getChat(chatTypeId, chatId){ // chatTypeId = 0 - dialogs
        return instance.get(`api/chats/${chatTypeId}/${chatId}/`)
    },
    deleteChat(chatTypeId, chatId){
        return instance.delete(`api/chats/${chatTypeId}/${chatId}/`)
    },
    // TODO try to unify all calls below
    clearChat(chatTypeId, chatId, putType, clearType){ 
        return this.chatPut(chatTypeId, chatId, putType, 'clearType', clearType) // 'clear'     clearType -> 'myLocal' 'myGlobal' 'allLocal' 'allGlobal' 
    },
    renameChat(chatTypeId, chatId, putType, newChatName){ 
        return this.chatPut(chatTypeId, chatId, putType, 'newChatName', newChatName) // 'rename'
    },
    updateUnreadMsgs(chatTypeId, chatId, putType, lastGlobalReadMsgId){ // ---------------------------------------------------------------------------------------------
        return this.chatPut(chatTypeId, chatId, putType, 'lastGlobalReadMsgId', lastGlobalReadMsgId) // 'updateUnreadMsgs'
    },
    // for conv only
    toogleMemberStatusForConversation(chatTypeId, chatId, putType, userId){  // 'toogleMemberStatus'
        return this.chatPut(chatTypeId, chatId, putType, 'userId', userId)
    },
    addMemberForConversation(chatTypeId, chatId, putType, userId){  // 'addMember' 
        return this.chatPut(chatTypeId, chatId, putType, 'userId', userId)
    },
    removeMemberFromConversation(chatTypeId, chatId, putType, userId){  // 'removeMember'
        return this.chatPut(chatTypeId, chatId, putType, 'userId', userId)
    },
    removeMemberMsgsForConversation(chatTypeId, chatId, putType, userId){  // 'removeMemberMsgs'
        return this.chatPut(chatTypeId, chatId, putType, 'userId', userId)
    },
    removeOneMemberMsgForConversation(chatTypeId, chatId, putType, userId){  // 'removeOneMemberMsg'
        return this.chatPut(chatTypeId, chatId, putType, 'userId', userId)
    },

    setChatPhoto(chatTypeId, chatId, putType, newChatPhoto){ // putType = setChatPhoto // 'setChatPhoto'
        return this.chatPut(chatTypeId, chatId, putType, 'newChatPhoto', newChatPhoto)
    },

    //messages
    getMessages(chatTypeId, chatId, readFromIndex, readFromIndexBefore, query, numOfDeletedMsgs){
        // console.log(query)
        return  numOfDeletedMsgs === null ?
            query===null ?
            instance.get(`api/chats/${chatTypeId}/${chatId}/messages/?readFromIndex=${readFromIndex}&readFromIndexBefore=${readFromIndexBefore}`) :
            instance.get(`api/chats/${chatTypeId}/${chatId}/messages/?readFromIndex=${readFromIndex}&readFromIndexBefore=${readFromIndexBefore}&query=${query}`) 
            :
            query===null ?
            instance.get(`api/chats/${chatTypeId}/${chatId}/messages/?readFromIndex=${readFromIndex}&readFromIndexBefore=${readFromIndexBefore}&numOfDeletedMsgs=${numOfDeletedMsgs}`) :
            instance.get(`api/chats/${chatTypeId}/${chatId}/messages/?readFromIndex=${readFromIndex}&readFromIndexBefore=${readFromIndexBefore}&query=${query}&numOfDeletedMsgs=${numOfDeletedMsgs}`) 
            // instance.get(`api/chats/${chatTypeId}/${chatId}/messages/?page=${page}`) :
            // instance.get(`api/chats/${chatTypeId}/${chatId}/messages/?page=${page}&query=${query}`)
    },
    createMessage(chatTypeId, chatId, messageBody, fileId=null){
        // console.log({messageBody, fileId})
        return instance.post(`api/chats/${chatTypeId}/${chatId}/messages/create/`, {messageBody, fileId})
    },


    // uploadFile(file){
    //     let formData = new FormData();
    //     formData.append("file", file);
    //     return instance.post(`api/file/`, formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //           }
    //         //   ,
    //         //   onUploadProgress,
    //     })
    // },

    // can ask for files only from current chat to load 
    getFile( fileId ) {
        return instance.get(`api/files/${fileId}`);
    },
    // downloadFile(filePath) {
    //     return instance.get(`media/${filePath}`);
    // },


    // may just change it to json file:blob
    // uploadFile( file ){
    //     let formData = new FormData();
    //     formData.append("file", file);
    //     return instance.post(`api/files/`, formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //           }
    //     })
    // },
    uploadFile( fileURL, fileName ){
        return instance.post(`api/files/`, {fileURL, fileName})
    },
    // TIP there is problems
    // uploadFile( file, onUploadProgress ){
    //         let formData = new FormData();
    //         formData.append("file", file);
    //         return instance.post(`api/files/`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //               }
    //               ,
    //               onUploadProgress,
    //         })
    //     },


    editMessage(chatTypeId, chatId, messageId, newMessageBody){
        // debugger
        console.log(`api/chats/${chatTypeId}/${chatId}/messages/${messageId}/`)
        console.log({newMessageBody})
        return instance.put(`api/chats/${chatTypeId}/${chatId}/messages/${messageId}/`, {newMessageBody})
    },
    deleteMessage(chatTypeId, chatId, messageId){
        return instance.delete(`api/chats/${chatTypeId}/${chatId}/messages/${messageId}/`)
    },
}

// if there is no yet msgs
// looks like there is no messages in chat yet
// MyConversationMessage has no globalMsg.
// looks like there is no messages in chat yet
// MyConversationMessage has no globalMsg.