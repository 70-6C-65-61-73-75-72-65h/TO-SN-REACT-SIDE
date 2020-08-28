/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import s from './../Chats.module.css';
import styleMessages from './../Message/Message.module.css';
import { NavLink } from "react-router-dom";
import { convertTime } from '../../common/utils/convertTime';
import Preloader from '../../common/Preloader/Preloader';
import { ReduxFormSnippet, createField, Input, DropDownSelect } from '../../common/FormsControls/FormsControls';
import { maxLength200, maxLength1000 } from '../../../utils/validators/validators';
import { reduxForm } from 'redux-form';
import backupQuotes from '../../common/utils/backupQuotes';
import { useState } from 'react';
import UsersContainer from '../../Users/UsersContainer';
// import { useUserSelector } from '../ChatsContainer';


////////////////////
// const AddChatMemberForm = (props) => {
//     const { handleSubmit, pristine, reset, submitting, error, snusers, chatUsersIds, msgStyle } = props // chatUsersIds - list of ids from chat members
//     // console.log(props)
//     return (
//         <form onSubmit={handleSubmit} className={`${msgStyle} ${s.addBorder}`}>
//         {createField('DropDownSelect', 'dropDownSelect', DropDownSelect, null, {people:  snusers.filter(snuser => !chatUsersIds.includes(snuser.userId))})}
//         <ReduxFormSnippet  pristine={pristine} reset={reset} submitting={submitting} error={error} sumbitButtonName={'Add Member'}/>
//         </form>
//     )
// }

// const AddChatMemberFormRedux = reduxForm({form: 'addChatMember'})(AddChatMemberForm)

// export const AddChatMember = ({addMember, chatTypeId, chatId, snusers, chatUsersIds, msgStyle=''}) => {
//     const onSubmit = (formData) => {
//         addMember(chatTypeId, chatId, formData['dropDownSelect'])
//     }
//     return  <AddChatMemberFormRedux onSubmit={onSubmit} snusers={snusers} chatUsersIds={chatUsersIds} msgStyle={msgStyle}/>
// }
////////////////////

//////////////////// styleMessages.chatsSettingsItemForm

const ChangeChatPhotoForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, error, msgStyle } = props
    return ( // className={s.changeChatPhotoForm} chatsSettingsItem
        <form onSubmit={handleSubmit} className={`${msgStyle} ${s.addBorder}`}>
            {createField('Photo', 'photo', Input, [maxLength1000])}
            <ReduxFormSnippet  pristine={pristine} reset={reset} submitting={submitting} error={error} sumbitButtonName={'Change Photo'}/>
        </form>
    )
}

const ChangeChatPhotoFormRedux = reduxForm({form: 'chageChatPhoto'})(ChangeChatPhotoForm)


export const ChangeChatPhoto = ({setChatPhotoRequest, chatTypeId, chatId, msgStyle=''}) => {
    const onSubmit = (formData) => { // or JSON.stringify
        let newPhotoObject = backupQuotes({'large': null, 'small': formData['photo']})
        setChatPhotoRequest(chatTypeId, chatId, newPhotoObject)
    }
    return  <ChangeChatPhotoFormRedux onSubmit={onSubmit} msgStyle={msgStyle}/>
}
////////////////////

//////////////////// {styleMessages.chatsSettingsItem}
const RenameChatForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, error, msgStyle } = props
    // let msgStyle = styleMessageClass ? styleMessages.chatsSettingsItemForm : ''
    return ( // className={s.renameChatForm}
        <form onSubmit={handleSubmit} className={`${msgStyle} ${s.addBorder}`}>
            {createField('Name', 'name', Input, [maxLength200])}
            <ReduxFormSnippet  pristine={pristine} reset={reset} submitting={submitting} error={error} sumbitButtonName={'Rename Chat'}/>
        </form>
    )
}

const RenameChatFormRedux = reduxForm({form: 'renameChat'})(RenameChatForm)

export const RenameChat = ({renameChatRequest, chatTypeId, chatId, msgStyle=''}) => {
    const onSubmit = (formData) => {
        renameChatRequest(chatTypeId, chatId, formData['name'])
    }
    return  <RenameChatFormRedux onSubmit={onSubmit} msgStyle={msgStyle}/>
}
////////////////////

// setMembersShow(event);
export const Member = ({ member, memberStyle, chatMemberSettings=null, setMemberOperShow=null, setSelectedMember=null }) => {
    return (
        <>
        <div className={memberStyle}>
            <NavLink to={'/profile/' + member.id}>
                <div className={s.memberName}>{member.name}</div>
                <div className={s.memberPhoto}><img src={member.photos.small} alt='Ava' /></div>
            </NavLink>
            {chatMemberSettings ? <a className={chatMemberSettings} onClick={(event) => {setSelectedMember(member.id); setMemberOperShow(event)}}>Operations</a>: null}
        </div>
        {/* <br/> */}
        </>
    )
}



export const Members = ({members, membersShow, memberOperShow, selectedMember, memberOpers}) => { // <Member />
    
    return(
        <>

        <div className={membersShow ? styleMessages.chatsMembersActive : styleMessages.chatsMembers}>
            <div className={membersShow ? styleMessages.chatsMembersActive : styleMessages.chatsMembers}>{members}</div>
        </div>
        
        <div className={memberOperShow ? `${styleMessages.smthElseListActive}`: `${s.smthElseList}`}>
            
            {memberOpers.map(memberOper => 
                <div className={`${styleMessages.subElemMSBs} ${styleMessages.infoItemMSBs}`}>
                    <a className={`${styleMessages.membOperLink}`} onClick={memberOper.method(selectedMember)}>{memberOper.name}</a>
                </div>
            )}
        </div>
        </>
    )
}


export const SelectMemberToChat = (props) => {

    const onSubmit = (selectedForChatUser) => {
        console.log('pre api')
        props.addMember(props.chatTypeId, props.chatId, selectedForChatUser)
    }

    return (
        <div  className={s.getMemberList} onClick={(event)=>{event.stopPropagation();}}>
        <UsersContainer
        setSelectedForChatUser = {onSubmit} 
        forChat={true} 
        styleForUsers={styleMessages.usersForChatActive} 
        styleForUser={styleMessages.userForChat}
        fWAUFC={props.fWAUFC}
        clearCurrentFocusedWindow={props.clearCurrentFocusedWindow}
        // setUsersForChatShow={setUserForChatShow}
        // toogleFocuseElemArr={toogleFocuseElemArr} // при выборе юзер - закрываем окно
        chatUsersIds={props.chatUsersIds}  
        />
      </div>
    )
}


const LastMessage = ({ sended, body, authorName }) => {
    return (
        <>
            <div className={s.chatLMAuthorName}>{authorName} </div>
            <div className={s.chatLMAuthorNameDotted}>:</div>
            {/* <div className={s.chatLMBody}>{body.length > 30 ? `${ body.slice(0,27)}...`: body}</div>
             */}
                <div className={s.chatLMBody}>{body}</div>
            <div className={s.chatLMSended}>{convertTime(sended)}</div>
        </>
    )
}


const ChatItem = ({ lastMessage, getCountOfNewGlobalMsgs, members, chatType, name, setCurrentChatData, chatTypeId, chatId, chatPhotoSmall, isFetching, 
                    clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal,
                    renameChatRequest, deleteChatRequest, addMember, setChatPhotoRequest,
                    ...props  
                }) => {


    const unmout = () => {
        setCurrentChatData(chatTypeId, chatId)
    }

    const clearChatByMethod = (method) => {
        // debugger
        method(chatTypeId, chatId)
    }

    // const putChatByMethod = (method, putData) => {
    //     method(chatTypeId, chatId, putData)
    // }

    let path = `/chats/${chatType}/${name}/`
    let chatUsersIds = members.map(member => member.id)
    members = members.map(member => <Member member={member} key={member.id} memberStyle={`${s.member} ${s.subElem2}`} />)
    if(isFetching) return <Preloader />
    // console.log(userForChatShow)
    
    return (
        <>
        {
        // add member
        props.fWAUFC.data !== null && props.fWAUFC.data[1] === chatId && props.fWAUFC.data[0] === chatTypeId  &&
            <div className={s.addMember}>
                <div className={s.addMemberHeader}>
                <SelectMemberToChat addMember={addMember} chatTypeId={chatTypeId} chatId={chatId} chatUsersIds={chatUsersIds}
                    clearCurrentFocusedWindow={props.clearCurrentFocusedWindow} 
                    fWAUFC={props.fWAUFC}/>
                 </div>
            </div>
                }




        <div className={s.chatItem}>
            <NavLink to={path} className={s.chatItemData} onClick={unmout}>
                <div className={s.chatItemPhoto}>
                    {/* <img src={(chatPhoto==='') ? (chatTypeId===0) ? members.find(member=>userId!==member.id).photos.small : 'chatPhoto' : chatPhoto} alt='chatPhoto'/> */}
                    {chatPhotoSmall !== null ? <img src={chatPhotoSmall} /> : <div className=''>chatPhotoSmall</div>}
                </div>
                    {/* lastMessage: */}
                    {Object.keys(lastMessage).length > 0 ? <LastMessage sended={lastMessage.sended} body={lastMessage.body} key={lastMessage.id} authorName={lastMessage.authorName} /> : null}
                <div className={s.chatItemNewMsgsNum}>{getCountOfNewGlobalMsgs}</div>

                <div className={s.chatItemName}>
                    {name}
                </div>
            </NavLink>
                <div className={s.chatSettings}>
                Settings:
                    <div className={s.chatSettingsHeader}>
                        <div className={s.chatSettingsMembersListHeader}>
                            members:
                            <div className={s.chatSettingsMembersList}>
                                {members}
                            </div>
                        </div>
                        <div className={s.smthElseHeader} >
                                clear chat:
                                <div className={s.smthElseList}>
                                        <div className={`${s.subElem} ${s.infoItem}`}><button onClick={() => clearChatByMethod(clearChatMyLocal)}>Clear My Messages Locally</button></div>
                                        <div className={`${s.subElem} ${s.infoItem}`}><button onClick={() => clearChatByMethod(clearChatMyGlobal)}>Clear My Messages Globally</button></div>
                                        <div className={`${s.subElem} ${s.infoItem}`}><button onClick={() => clearChatByMethod(clearChatAllLocal)}>Clear All Messages Locally</button></div>
                                        <div className={`${s.subElem} ${s.infoItem}`}><button onClick={() => clearChatByMethod(clearChatAllGlobal)}>Clear All Messages Globally</button></div>
                                </div>
                        </div>
                        <div className={s.renameChatHeader}>
                            rename
                            { chatTypeId === 1 && <div className={s.renameChatItem}>
                                <RenameChat renameChatRequest={renameChatRequest} chatTypeId={chatTypeId} chatId={chatId}/>
                            </div>}
                            
                        </div>
                        <div className={s.smthElseHeader}>
                            other operations
                            <div className={s.smthElseList}>
                                    <div className={`${s.subElem} ${s.infoItem}`}>
                                        set photo
                                        { chatTypeId === 1 && <div className={s.changePhotoChat}>
                                            <ChangeChatPhoto setChatPhotoRequest={setChatPhotoRequest} chatTypeId={chatTypeId} chatId={chatId}/>
                                        </div>}
                                    </div>

                                    <div className={`${s.subElem} ${s.infoItem}`}>
                                        

                                        
                                    { chatTypeId === 1 &&
                                    <div className={s.addMemberItem}>
                                    { props.fWAUFC.data === null  && // make true from false to open element ( but i should push here userId and after by userId show itself user list)
                                        <a 
                                        onClick={
                                            (event) => (event.stopPropagation(), props.addFocusedWindow(props.fWAUFC.id, [chatTypeId, chatId]))
                                         }> 
                                            Add Member
                                        </a>
                                    }
                                    </div>
                                    }
                                    </div>

                                    <div className={`${s.deleteChat} ${s.subElem} ${s.infoItem}`}><button onClick={() => clearChatByMethod(deleteChatRequest)}>DELETE CHAT</button></div>
                            </div>
                        </div>
                    </div>
                </div>
        </div> 
        </>)
}

export default ChatItem;


// chatItemMemberList - всплывающий список ( при нажатии с прокруткой ( или при наведении))