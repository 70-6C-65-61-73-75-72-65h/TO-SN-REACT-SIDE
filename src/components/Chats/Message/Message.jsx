import React, {useRef, useImperativeHandle, forwardRef } from 'react';
import styleMessages from './Message.module.scss';
import { NavLink } from 'react-router-dom';
import { convertTime } from '../../common/utils/convertTime';
import { EditMessage } from './EditMessage';


// add readed and local and functions to operate with msgs
const Message = (props, ref) => {
    const inputRef = useRef();
    useImperativeHandle(ref, (node) => {
    //   focus: () => {
    //     inputRef.current.focus();
    //   }
        // console.log('useImperativeHandle')
        // console.log(node)
        // console.log(inputRef.current)
        return inputRef.current
    });
    
    const { message, editMessageRequest, deleteMessageRequest, ENSM, chatTypeId, chatId, getFile, downloadFile} = props
    // console.log( message.fileId)
    const editMessage = (chatTypeId, chatId,  message) => (messageBody) => editMessageRequest(chatTypeId, chatId, message.id, messageBody)
    
    const onDeleteMsg = () => {
        deleteMessageRequest(chatTypeId, chatId, message.id, message.fileId)
    }

    
    // just add /br for unread msgs  
    return <div className={`${styleMessages.message}`} ref={inputRef}>
        <div className={styleMessages.messageAuthorName}>
            <NavLink to={`/profile/${message.authorId}`}>{message.authorName}</NavLink>
        </div>
        <EditMessage ENSM={ENSM} editMessage={editMessage(chatTypeId, chatId, message)} messageBody={message.body} getFile={getFile} downloadFile={downloadFile} fileId={message.fileId}
        
        // saveImageToIDB={props.saveImageToIDB}
        loadImageFromIDB={props.loadImageFromIDB}

        fileIDBKey={message.fileIDBKey}

        // messageId={message.id}
        
        />
        <div className={styleMessages.messageSendedEdited}>
            <div className={styleMessages.messageSended}>sended: {convertTime(message.sended)}</div>
            <div className={styleMessages.messageEdited}>edited: {convertTime(message.edited)}</div>
        </div>
        <div className={styleMessages.deleteMessage}>{!ENSM && <a onClick={onDeleteMsg}>Delete Message</a>}</div>
        </div>
}

export default forwardRef(Message);
