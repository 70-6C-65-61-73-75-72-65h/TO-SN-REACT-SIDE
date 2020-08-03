import { useState } from "react";

export const useMembersShow = () => {
    const [membersShow, setMembersShow] = useState(false);
    return [membersShow, setMembersShow]
}
export const useMemberOperShow = () => {
    const [memberOperShow, setMemberOperShow] = useState(false);
    return [memberOperShow, setMemberOperShow]
}
// ....

export const useAllFocusedElems = () => {
    const [membersShow, setMembersShow] = useMembersShow()
    const [memberOperShow, setMemberOperShow] = useMemberOperShow()
    return [membersShow, setMembersShow, memberOperShow, setMemberOperShow]
}
