// import React from 'react';
// import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
// import Dialogs from "./Dialogs";
// import {connect} from "react-redux";
// import { Redirect, withRouter } from 'react-router-dom';

// class DialogsContainer extends React.Component {
//     componentDidMount() {
//         console.log('Im inside the DOM');
//         console.log(`${this.props.token}`);
//     }
//     render() {
//         if(this.props.token === null){
//             return <Redirect to='/login'/>
//         }
//         return (
//             <Dialogs {...this.props}/>
//         )
//     }
// }

// let mapStateToProps = (state) => {
//     return {
//         dialogsPage: state.dialogsPage,
//         token: state.auth.token
//     }
// }
// let mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessage: () => {
//             dispatch(sendMessageCreator());
//         },
//         updateNewMessageBody: (body) => {
//             dispatch(updateNewMessageBodyCreator(body));
//         }
//     }
// }

// let WithURLDialogsContainer = withRouter(DialogsContainer);
// // const DialogsContainer = 
// export default connect(mapStateToProps, mapDispatchToProps)(WithURLDialogsContainer);

// // export default DialogsContainer;


import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import withAuthRedirect from '../../hoc/WithAuthRedirect';
import { connect } from 'react-redux';
import { setCurrentChatData, unSetCurrentChatData, getChats, 
        clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal, createConversation, createDialog, requestUsersForChat } from '../../redux/chats-reducer';
import Preloader from '../common/Preloader/Preloader';
import ChatItem from './ChatItem/ChatItem';
import chatsStyles from './Chats.module.css';
import { selectChats } from '../../redux/chats-selector';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import DropDownSelect, { createField, Input } from '../common/FormsControls/FormsControls';
import styles from '../common/FormsControls/FormsControls.module.css'
import { maxLength200 } from '../../utils/validators/validators';


const CreateChatForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, error, snusers, myUserId } = props
    return (
        <form onSubmit={handleSubmit} className={chatsStyles.createChatForm}>
            {createField('DropDownSelect', 'dropDownSelect', DropDownSelect, null, {people: snusers.filter(snuser => snuser.userId !== myUserId)})}
            {createField('Name', 'name', Input, [maxLength200])}
            {
            error && 
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div className=''>
                <button type='submit' disabled={pristine || submitting} >Create Chat</button>
            </div>
            <div className=''>
                <button type='button' disabled={pristine || submitting} onClick={reset}>Clear</button>
            </div>
        </form>
    )
}


const CreateChatReduxForm = reduxForm({form:'CreateChat'})(CreateChatForm)



const ChatsContainer = (props) => {
    const [iF, setIF]= useState(true) // isFetching
    const [iF2, setIF2]= useState(true) // isFetching
    // debugger
    useEffect(() => {
        const fetchData = async() => {
            if(iF){
                props.unSetCurrentChatData()
                await props.getChats()
                setIF(false)
            }
            if(iF2){
                await props.requestUsersForChat()
                setIF2(false)
            }
        }
        // // const fetchUsersToChat = async() => {
        // //     if(iF2){
        // //         await props.requestUsersForChat()
        // //         setIF2(false)
        // //     }
        // // }
        fetchData();
        // fetchUsersToChat();
    }, [props, iF, iF2])

    if(iF || iF2) return <Preloader/>
    // key `${chat.chatType}_${chat.name}`
    let chatsElements = [...props.chats.filter(chat => !('sended' in chat.lastMessage)), ...props.chats
            .filter(chat => 'sended' in chat.lastMessage) // if this is the chat with existing msgs within
            .sort((chat1, chat2)=> (chat2.lastMessage.sended - chat1.lastMessage.sended))]
            .map(chat => <ChatItem lastMessage={chat.lastMessage} 
                getCountOfNewGlobalMsgs={chat.getCountOfNewGlobalMsgs} 
                members={chat.members} name={chat.name} 
                chatType={chat.chatType} chatId={chat.chatId} 
                chatTypeId={chat.chatTypeId} key={chat.id}
                setCurrentChatData={props.setCurrentChatData}
                chatPhotoSmall = {chat.chatPhoto.small} 
                isFetching={props.isFetching} 
                // currentChatDataFetching={props.currentChatDataFetching} 
                clearChatMyLocal={props.clearChatMyLocal} clearChatMyGlobal={props.clearChatMyGlobal} clearChatAllLocal={props.clearChatAllLocal} clearChatAllGlobal={props.clearChatAllGlobal}
                // history={props.history}
                // isUnmount={props.isUnmount}
                />);
    console.log(chatsElements)


    const onSubmit = (formData) => {
        // debugger
        let sns = Array.isArray(formData['dropDownSelect']) ? formData['dropDownSelect']: [formData['dropDownSelect']]
        props.createConversation(sns, formData['name'])
    }

    return(
        <div className={chatsStyles.chats}>
            <div className={chatsStyles.chats_header}>Chats</div>
            <div className={chatsStyles.createChat}>
            <div className={chatsStyles.createChatHeader}>Create Conversation</div>
            <CreateChatReduxForm onSubmit={onSubmit} snusers={props.snusers} myUserId={props.myUserId} />
            </div>
                <div className={chatsStyles.chatsItems}>
                    {chatsElements}
                </div>
        </div>
    )
}
// can be lastMessage ={} if no msgs yet, 

let mapStateToProps = (state) => ({
    chats: selectChats(state),
    isAuth: state.auth.isAuth,
    isFetching: state.chatsPage.isFetching,
    isUnmount: state.chatsPage.isUnmount,
    myUserId: state.auth.userId,
    snusers: state.chatsPage.usersToSelect
    // chatPhotoSmall: selectChatPhotoSmall(state)
    // userId: state.auth.userId,
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getChats, setCurrentChatData, unSetCurrentChatData,
        clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal,
        createDialog, createConversation, requestUsersForChat}),
    withRouter
)(ChatsContainer);


//currentChatDataFetching
