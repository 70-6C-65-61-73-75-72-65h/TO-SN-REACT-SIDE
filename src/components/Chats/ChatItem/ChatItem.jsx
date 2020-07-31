import React, { useRef, useEffect, useState } from 'react';
import s from './../Chats.module.css';
import { NavLink } from "react-router-dom";
import { convertTime } from '../../common/utils/convertTime';
import Preloader from '../../common/Preloader/Preloader';

const Member = ({ member }) => {
    return (
        <div className={`${s.member} ${s.subElem}`}>
            <NavLink to={'/profile/' + member.id}>
                <div className={s.memberName}>{member.name}</div>
                <div className={s.memberPhoto}><img src={member.photos.small} alt='Ava' /></div>
            </NavLink>
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
    clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal }) => {

    const unmout = () => {
        setCurrentChatData(chatTypeId, chatId)
    }

    const clearChatByMethod = (method) => {
        // debugger
        method(chatTypeId, chatId)
    }

    let path = `/chats/${chatType}/${name}/`
    members = members.map(member => <Member member={member} key={member.id} />)
    if(isFetching) return <Preloader />
    return (
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
                    </div>
                </div>
        </div>)
}

export default ChatItem;


// chatItemMemberList - всплывающий список ( при нажатии с прокруткой ( или при наведении))