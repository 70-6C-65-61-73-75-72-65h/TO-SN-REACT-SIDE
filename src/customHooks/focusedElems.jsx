import { useState } from "react";

export const useMembersShow = () => {
    const [membersShow, setMembersShow] = useState(false);
    return [membersShow, setMembersShow]
}

export const useUsersForChatShow = () => {
    const [usersForChatShow, setUsersForChatShow] = useState(false);
    return [usersForChatShow, setUsersForChatShow]
}

export const useMemberOperShow = () => {
    const [memberOperShow, setMemberOperShow] = useState(false);
    return [memberOperShow, setMemberOperShow]
}
// ....

export const useAllFocusedElems = () => {
    const [membersShow, setMembersShow] = useMembersShow()
    const [memberOperShow, setMemberOperShow] = useMemberOperShow()
    const [usersForChatShow, setUsersForChatShow] = useUsersForChatShow()
    return [membersShow, setMembersShow, memberOperShow, setMemberOperShow, usersForChatShow, setUsersForChatShow]
}
