import React, { useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import withAuthRedirect from '../../../hoc/WithAuthRedirect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMessages, editMessageRequest, deleteMessageRequest, getCurrentChatData,
        clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal,
        toogleMemberStatus, removeMemberMsgs, removeOneMemberMsg, removeMember,
        setChatPhotoRequest, addMember, renameChatRequest, requestUsersForChat } from '../../../redux/chats-reducer';
import Preloader from '../../common/Preloader/Preloader';
import { selectChatMessages, selectCIPS, selectCTIPS, selectCurrentChat } from '../../../redux/chats-selector';
import Message from '../Message/Message';


import styleMessages from '../Message/Message.module.css';
import styleChats from '../Chats.module.css';
import CreateMessage from '../Message/CreateMessage';
import { useForbidUnsafeMethods } from '../../../customHooks/reduceUnsafeMethods';
import { ChangeChatPhoto, AddChatMember, RenameChat, Member, Members } from './ChatItem';



const ChatDetail = ({toogleFocuseElem, setMembersShow, membersShow, setMemberOperShow, memberOperShow, ...props}) => {
    const [ensm, setEnsm, shown, setShown, reduceMethods] = useForbidUnsafeMethods()
    const [preFetch, setPreFetch] = useState(false);
    const fetchData = async () => {
            if (!shown) {
                await props.getMessages(props.chatTypeId, props.chatId)
                await props.requestUsersForChat()
                setShown(true)
            }
    }


// for members
    // const [membersShow, setMembersShow]  = useState(false);

    // const toogleMembersShow = () => {
    //     // console.log(membersShow)
    //     if(membersShow) {
    //         setMembersShow(false)
    //         // toggleEditing()
    //     } else{
    //         setMembersShow(true)
    //     }
    //     // toggleEditing()
    // }

    // const MembersHide = () => {
    //     if(membersShow) {
    //         setMembersShow(false)
    //     }
    // }
    // const [isEditing, setEditing] = useState(false);
    // const toggleEditing = () => {
    //     // if(isEditing){ toogleMembersShow();} // если перед туглом был тру - знач ща будет расфокус и надо убирать с показа мемберов
    //     setEditing(!isEditing);
    // };

    // const membersRef = useRef(null);

    // useEffect(() => {
    //     if (isEditing) {
    //         membersRef.current.focus();
    //     } 
        
    // }, [isEditing]);
// for members
    const [selectedMember, setSelectedMember] = useState(null) // member.id


    const refreshData = () => {
        if (shown) {
            setTimeout(async() =>{await props.getMessages(props.chatTypeId, props.chatId)}, 1000)
        }
    }
    // after each member remove - member add
    const populatePreFetchData = async() => {
            props.getCurrentChatData();
            setPreFetch(true);
    }
    useEffect(() => {
        // debugger
        if(!preFetch){
            populatePreFetchData();
        } else {
            fetchData();
        }
    }, [props])
    useEffect(() => {
        refreshData();
    }, [props.messages])



    if (!shown) return <Preloader />
    let messages = props.messages.map(msg => <Message message={msg} deleteMessageRequest={props.deleteMessageRequest} editMessageRequest={props.editMessageRequest} ENSM={!msg.local} chatTypeId={props.chatTypeId} chatId={props.chatId} />)


    const prefetchOper = (method, chatTypeId, chatId) => (selectedMemberId)  => () => method(chatTypeId, chatId, selectedMemberId)
    
    let memberOpers = [{method: props.toogleMemberStatus, name: 'Toogle Member'}, {method: props.removeMemberMsgs, name: 'Remove All Member Messages'}, {method: props.removeMember, name: 'Remove Member'}]
                        // .map(memberOper =>({method: prefetchOper(memberOper.method, props.chatTypeId, props.chatId), name: memberOper.name}))  // chatTypeId // chatId
    
    let chatUsersIds = props.currentChat.members.map(member => member.id)
    let members = props.currentChat.members.map(member => <Member member={member} key={member.id} memberStyle={`${styleMessages.chatMember}`} 
                        chatMemberSettings={`${styleMessages.chatMemberSettings}`} 
                        setMemberOperShow={toogleFocuseElem(setMemberOperShow, memberOperShow)}
                        setMembersShow={toogleFocuseElem(setMembersShow, membersShow)}
                        setSelectedMember={setSelectedMember}/>)

                        // chatsSettingsItem // chatsSettingsItemH / chatsSettingsItemForm
    return (
        <div className={styleMessages.currentChat}>
 {/* memberOperShow= memberOpers= */}
            
            
                <Members members={members} membersShow={membersShow} 
                memberOperShow={memberOperShow} selectedMember={selectedMember}
                memberOpers={memberOpers
                    .map(memberOper => ({...memberOper, 
                        method: prefetchOper(memberOper.method, props.chatTypeId, props.chatId) }))}/>
            


            <div className={styleMessages.chatsHeader}>
                <div className={styleMessages.chatsHeaderPhoto}> {props.currentChat.chatPhoto.small !== null ? <img src={props.currentChat.chatPhoto.small} /> : <div className={styleMessages.chatsHeaderPhotoAlt}>chatPhotoSmall</div>}</div>
                <div className={styleMessages.chatsHeaderName}>{props.currentChat.name}</div>
                <div className={styleMessages.chatsHeaderSettings}>
                    Settings
                    <div className={styleMessages.chatsSettings}>
                    { props.chatTypeId === 1 &&
                        <>
                            <div className={styleMessages.chatsSettingsItem}>
                                <div className={styleMessages.chatsSettingsItemH}>Add Member</div>
                                <AddChatMember msgStyle={styleMessages.chatsSettingsItemForm} addMember={props.addMember} snusers={props.snusers} chatUsersIds={chatUsersIds} chatTypeId={props.chatTypeId} chatId={props.chatId}/>
                            </div>
                            <div className={styleMessages.chatsSettingsItem}>
                                <div className={styleMessages.chatsSettingsItemH}>Change Photo</div>
                                <ChangeChatPhoto msgStyle={styleMessages.chatsSettingsItemForm} setChatPhotoRequest={props.setChatPhotoRequest} chatTypeId={props.chatTypeId} chatId={props.chatId} />
                            </div> 
                            <div className={styleMessages.chatsSettingsItem}>
                            <div className={styleMessages.chatsSettingsItemH}>Rename Chat</div>
                                <RenameChat msgStyle={styleMessages.chatsSettingsItemForm} renameChatRequest={props.renameChatRequest} chatTypeId={props.chatTypeId} chatId={props.chatId}/>
                            </div> 
                             </>
                    }
                        <div className={styleMessages.chatsSettingsItem}>
                            <div className={styleMessages.chatsMembersHeader}>
                                <a onClick={toogleFocuseElem(setMembersShow, membersShow)}>
                                    Chat Members
                                </a>
                            </div>
                        </div>

                    </div> 
                    {/* memberOper ={method:"", name:""} */}
                     {/* // userId = snuser.id // chatTypeId // chatId */}
                        {/* <div className={styleMessages.chatsSettingsItem}><button onClick={setChatPhotoRequest}>setChatPhotoRequest</button></div>
                        <div className={styleMessages.chatsSettingsItem}><button onClick={addMember}>addMember</button></div>
                        <div className={styleMessages.chatsSettingsItem}><button onClick={renameChatRequest}>renameChatRequest</button></div> */}
                        {/* <div className={styleMessages.chatsSettingsItem}><button onClick={toogleMemberStatus}>toogleMemberStatus</button></div>
                        <div className={styleMessages.chatsSettingsItem}><button onClick={removeMemberMsgs}>removeMemberMsgs</button></div>
                        <div className={styleMessages.chatsSettingsItem}><button onClick={removeOneMemberMsg}>removeOneMemberMsg</button></div>
                        <div className={styleMessages.chatsSettingsItem}><button onClick={removeMember}>removeMember</button></div> */}
                    
                </div>
            </div>
            <div className={styleMessages.messages}>
                {messages}
            </div>
            <div className={styleMessages.createMessageForm}><CreateMessage chatTypeId={props.chatTypeId} chatId={props.chatId} isAuth={props.isAuth}/></div>


            
        </div>
    )
}


let mapStateToProps = (state) => ({
    messages: selectChatMessages(state),
    isAuth: state.auth.isAuth,
    chatTypeId: selectCTIPS(state),
    chatId: selectCIPS(state),
    currentChat: selectCurrentChat(state),
    snusers: state.chatsPage.usersToSelect,
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { getMessages, editMessageRequest, deleteMessageRequest,
                                getCurrentChatData,
                                clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal,
                                requestUsersForChat,
                                // update chat after below
                                toogleMemberStatus, removeMemberMsgs, removeOneMemberMsg, removeMember,
                                setChatPhotoRequest, addMember, renameChatRequest }),
    withRouter
)(ChatDetail)

