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




export const selectFocusedWindowsPS = state => {
    return  state.app.focusedWindows;//.filter(u => true);
}
export const selectFocusedWindowsIdsPS = state => {
    return  state.app.focusedWindowsIds;//.filter(u => true);
}

export const selectFocusedWindow = (windowIdKey) => createSelector( selectFocusedWindowsPS, selectFocusedWindowsIdsPS,  (focusedWindows, focusedWindowsIds) => {
    // debugger
    return focusedWindows.find(window => window.id === focusedWindowsIds[windowIdKey]) || {'id': focusedWindowsIds[windowIdKey], 'data': null} // {'id':, 'data'}
})

export const selectFocusedWindowUsersForChat = selectFocusedWindow("fWUsersFCId")
export const selectFocusedWindowAddUserForChat = selectFocusedWindow("fWAddUserFCId")
export const selectFocusedWindowMembersForChat = selectFocusedWindow("fWMembersId")
export const selectFocusedWindowMemberOperationsForChat = selectFocusedWindow("fWMemberOperationsId")