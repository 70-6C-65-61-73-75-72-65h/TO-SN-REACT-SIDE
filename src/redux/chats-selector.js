import { createSelector } from "reselect";
import replaceQuotes from "../components/common/utils/quotes";


export const selectChatsPrimitiveSelector = state => {
    return  state.chatsPage.chats;//.filter(u => true);
}
export const selectChats = createSelector( selectChatsPrimitiveSelector, (chats) => {
        return chats.map(chat => ({...chat, members: chat.members.map(member => ({...member, photos: replaceQuotes(member.photos)})), chatPhoto: replaceQuotes(chat.chatPhoto)}))
})


export const selectChatMessages = state => {
    return  state.chatsPage.messages;//.filter(u => true);
}


export const selectCTIPS = state => {
    return state.chatsPage.chatTypeId;
}
export const selectCIPS = state => {
    return state.chatsPage.chatId;
}

export const selectCurrentChatPS = state => {
    return  state.chatsPage.currentChat
}

export const selectCurrentChat = createSelector( selectCurrentChatPS, (chat) => {
    return chat!==null ? {...chat, members: chat.members.map(member => ({...member, photos: replaceQuotes(member.photos)})), chatPhoto: replaceQuotes(chat.chatPhoto)} : null
})

