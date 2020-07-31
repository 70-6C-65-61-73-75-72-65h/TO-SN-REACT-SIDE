import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import withAuthRedirect from '../../../hoc/WithAuthRedirect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMessages, editMessageRequest, deleteMessageRequest, getCurrentChatData } from '../../../redux/chats-reducer';
import Preloader from '../../common/Preloader/Preloader';
import { selectChatMessages, selectCIPS, selectCTIPS, selectCurrentChat } from '../../../redux/chats-selector';
import Message from '../Message/Message';


import styleMessages from '../Message/Message.module.css';
import CreateMessage from '../Message/CreateMessage';
import { useForbidUnsafeMethods } from '../../../customHooks/reduceUnsafeMethods';



const ChatDetail = (props) => {
    const [ensm, setEnsm, shown, setShown, reduceMethods] = useForbidUnsafeMethods()

    const [preFetch, setPreFetch] = useState(false);

    const fetchData = async () => {
            if (!shown) {
                await props.getMessages(props.chatTypeId, props.chatId)
                setShown(true)
            }
        }

    const refreshData = () => {
        if (shown) {
            setTimeout(async() =>{await props.getMessages(props.chatTypeId, props.chatId)}, 1000)
        }
    }

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

    return (
        <div className={styleMessages.currentChat}>
            <div className={styleMessages.chatsHeader}>
                <div className={styleMessages.chatsHeaderPhoto}> {props.currentChat.chatPhoto.small !== null ? <img src={props.currentChat.chatPhoto.small} /> : <div className={styleMessages.chatsHeaderPhotoAlt}>chatPhotoSmall</div>}</div>
                <div className={styleMessages.chatsHeaderName}>{props.currentChat.name}</div>
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
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { getMessages, editMessageRequest, deleteMessageRequest,
                                getCurrentChatData }),
    withRouter
)(ChatDetail)


