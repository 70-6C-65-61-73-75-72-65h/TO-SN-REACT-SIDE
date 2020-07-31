import React from 'react';
import styleMessages from './Message.module.css';
import { NavLink } from 'react-router-dom';
import { convertTime } from '../../common/utils/convertTime';
import { EditMessage } from './EditMessage';


// add readed and local and functions to operate with msgs
const Message = ({ message, editMessageRequest, deleteMessageRequest, ENSM, chatTypeId, chatId}) => {

    const editMessage = (chatTypeId, chatId, messageId) => (messageBody) => editMessageRequest(chatTypeId, chatId, messageId, messageBody)
    
    const onDeleteMsg = () => {
        deleteMessageRequest(chatTypeId, chatId, message.id)
    }
    return <div className={`${styleMessages.message}`}>
        <div className={styleMessages.messageAuthorName}>
            <NavLink to={`/profile/${message.authorId}`}>{message.authorName}</NavLink>
        </div>
        <EditMessage ENSM={ENSM} editMessage={editMessage(chatTypeId, chatId, message.id)} messageBody={message.body}/>
        <div className={styleMessages.messageSendedEdited}>
            <div className={styleMessages.messageSended}>sended: {convertTime(message.sended)}</div>
            <div className={styleMessages.messageEdited}>edited: {convertTime(message.edited)}</div>
        </div>
        <div className={styleMessages.deleteMessage}>{!ENSM && <a onClick={onDeleteMsg}>Delete Message</a>}</div>
        </div>
}

export default Message;