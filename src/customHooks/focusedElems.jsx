// import { useState } from "react";

// export const useMembersShow = () => {
//     const [membersShow, setMembersShow] = useState(false);
//     return [membersShow, setMembersShow]
// }

// export const useUsersForChatShow = () => {
//     const [usersForChatShow, setUsersForChatShow] = useState(false);
//     return [usersForChatShow, setUsersForChatShow]
// }

// export const useUserForChatShow = () => {
//     const [userForChatShow, setUserForChatShow] = useState([]);
//     return [userForChatShow, setUserForChatShow]
// }


// export const useMemberOperShow = () => {
//     const [memberOperShow, setMemberOperShow] = useState(false);
//     return [memberOperShow, setMemberOperShow]
// }
// // ....

// export const useAllFocusedElems = () => {
//     const [membersShow, setMembersShow] = useMembersShow()
//     const [memberOperShow, setMemberOperShow] = useMemberOperShow()
//     const [usersForChatShow, setUsersForChatShow] = useUsersForChatShow()
//     const [userForChatShow, setUserForChatShow] = useUserForChatShow()
//     return [membersShow, setMembersShow, memberOperShow, setMemberOperShow, usersForChatShow, setUsersForChatShow, userForChatShow, setUserForChatShow]
// }


// export const useRefactorPopUp = (id=null) => {
//     // id, data
//     const [popUpLevel, setPopUpLevel] = useState([id, null]); // id of pop-up block -> [data, id] can be [[chatTypeId, chatId], id] or [true, id]
//     const setData = (data) => {console.log('id' + id); setPopUpLevel([id, data])} // true or array
//     const unSetData = () => setPopUpLevel([id, null])
//     return [popUpLevel, setData, unSetData]
// }