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

// eslint-disable react/jsx-no-duplicate-props
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import withAuthRedirect from '../../hoc/WithAuthRedirect';
import { connect } from 'react-redux';
import { setCurrentChatData, unSetCurrentChatData, getChats, 
        clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal, createConversation, createDialog, 
        // requestUsersForChat, 
        renameChatRequest, setChatPhotoRequest, addMember, deleteChatRequest } from '../../redux/chats-reducer';
import Preloader from '../common/Preloader/Preloader';
import ChatItem from './ChatItem/ChatItem';
import chatsStyles from './Chats.module.scss';
import { selectChats, selectFocusedWindowUsersForChat, selectFocusedWindowAddUserForChat, selectFocusedWindowMembersForChat, selectFocusedWindowMemberOperationsForChat } from '../../redux/chats-selector';

import { withRouter } from 'react-router-dom';
import { reduxForm, formValues } from 'redux-form';
import { createField, Input, ReduxFormSnippet } from '../common/FormsControls/FormsControls';
import { maxLength200 } from '../../utils/validators/validators';
 
import styleMessages from './Message/Message.module.scss';
import UsersContainer from '../Users/UsersContainer';
import { useRefactorPopUp } from '../../customHooks/focusedElems';
import { clearCurrentFocusedWindow, addFocusedWindow } from '../../redux/app-reducer';


const CreateChatForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, error} = props
    // const MyItemizedList = [19, 20]
    // const ItemList = formValues('selectedMembers')(MyItemizedList)
    // const [selected, setSelected] = useState([]);
    // // snusers, myUserId
    // const options = snusers
    //                 .filter(snuser => snuser.userId !== myUserId)
    //                 .map(snuser => ({label: snuser.name, value: snuser.id}))
    return (
        <form onSubmit={handleSubmit} className={chatsStyles.createChatForm}>
            {/* {createField('DropDownSelect', 'dropDownSelect', DropDownSelect, null, {people: snusers.filter(snuser => snuser.userId !== myUserId)})} */}
            
            {/* {createField('SelectedMembers', 'selectedMembers', MultiSelectWrap, null, 
                { optionsMS: options, 
                    valueMS:selected, 
                    onChangeMS:setSelected, 
                    labelledByMS:"Select"  })} */}
            {/* {createField('SelectedMembers', 'selectedMembers', ForChatUsersListWrap, null)} */}
            
            {createField('Name', 'name', Input, [maxLength200])}
            <ReduxFormSnippet  pristine={pristine} reset={reset} submitting={submitting} error={error} sumbitButtonName={'Create Chat'}/>
        </form>
    )
}


const CreateChatReduxForm = reduxForm({form:'CreateChat'})(CreateChatForm)



 
export const useUsersSelector = (callbackMethod, keys=[]) => { // ['name'] // props.createConversation
    const [selectedForChatUsers, setSelectedForChatUsers] = useState([])

    const onSubmit = (formData) => { // keys = ['name', 'photos']
        // debugger
        // let sns = Array.isArray(formData['dropDownSelect']) ? formData['dropDownSelect']: [formData['dropDownSelect']]
        // let sns = Array.isArray(selectedForChatUsers) ? selectedForChatUsers: selectedForChatUsers
        callbackMethod(selectedForChatUsers, ...keys.map(key=>formData[key])) // if select for create chat -> keys are not null - else null (fro add member to chat)
    }
    return [selectedForChatUsers, setSelectedForChatUsers, onSubmit]

}

// export const useUserSelector = (chatTypeId, chatId, callbackMethod) => { //props.addMember
//     const [selectedForChatUser, setSelectedForChatUser] = useState(null)
//     const onSubmit = async() => {
//         console.log('pre api')
//         await callbackMethod(chatTypeId, chatId, selectedForChatUser)
//     }

//     // useEffect(() => {
//     //     if(selectedForChatUser!==null){
//     //         console.log("adding")
//     //         onSubmit()
//     //         setSelectedForChatUser(null) 
//     //     } else {
//     //         console.log(" notadding")
//     //     }
//     // }, [selectedForChatUser])
//     return [setSelectedForChatUser ]
// }



const ChatsContainer = (props) => {
    const [iF, setIF]= useState(true) // isFetching
    // const [iF2, setIF2]= useState(true) // isFetching
    const [selectedForChatUsers, setSelectedForChatUsers, onSubmit] = useUsersSelector(props.createConversation, ['name'])

    const refreshData = () => {
        // if (!iF2) {
        console.log('start refresh')
        setTimeout(async() =>{await props.getChats()}, 5000) // так как обновелния в чатах могут быть и не только с моей стороны но и с чужой
        console.log('end refresh')
        // }
    }

    useEffect(() => {
        const fetchData = async() => {
            if(iF){
                props.unSetCurrentChatData()
                await props.getChats()
                setIF(false)
            }
            // if(iF2){
            //     await props.requestUsersForChat()
            //     setIF2(false)
            // }
        }
        fetchData();
    }, [props, iF])//, iF2])

    useEffect(() => {
        refreshData();
        console.log('effect refresh used by changing: ')
    }, [props])


    // if(iF || iF2) return <Preloader/>
    if(iF) return <Preloader/>
    // key `${chat.chatType}_${chat.name}`
    // let chatsElements = [...(props.chats.filter(chat => !('sended' in chat.lastMessage))).sort((a,b)=>b.chatId - a.chatId), ...props.chats
    //         .filter(chat => 'sended' in chat.lastMessage) // if this is the chat with existing msgs within
    //         .sort((chat1, chat2)=> (chat2.lastMessage.sended - chat1.lastMessage.sended))]
    let chatsElements = props.chats
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
                renameChatRequest={props.renameChatRequest}
                setChatPhotoRequest={props.setChatPhotoRequest}
                addMember={props.addMember}
                // snusers={props.OLDsnusers}
                deleteChatRequest={props.deleteChatRequest}

                fWAUFC={props.fWAUFC}
                clearCurrentFocusedWindow={props.clearCurrentFocusedWindow}
                addFocusedWindow={props.addFocusedWindow}

                />);
 

    return(
        <>
        <div className={chatsStyles.chats}>
            <div className={chatsStyles.chats_header}>Chats</div>
            <div className={chatsStyles.createChat}>
            <div className={chatsStyles.createChatHeader}>Create Conversation
                {selectedForChatUsers.length > 1 && <CreateChatReduxForm onSubmit={onSubmit} snusers={props.snusers} myUserId={props.myUserId} /> }

                {props.fWUFC.data !== null ?
                    
                    <div  className={chatsStyles.getMemberList} onClick={(event)=>{event.stopPropagation();}}>
                        <UsersContainer

                        setSelectedForChatUsers={setSelectedForChatUsers} forChat={true} 
                        selectedForChatUsers={selectedForChatUsers} 
                        styleForUsers={styleMessages.usersForChatActive} styleForUser={styleMessages.userForChat}
                        clearCurrentFocusedWindow={props.clearCurrentFocusedWindow}
                        fWUFCID = {props.fWUFC.id}
                        toogleFocuseElem={props.toogleFocuseElem}

                        />

                        {selectedForChatUsers.length === 1 &&  
                            <a onClick={() => {props.createDialog(selectedForChatUsers[0]); props.clearCurrentFocusedWindow(props.fWUFC.id); }}>Create Dialog</a>}
                    </div>

                :
                 
                    <a className={chatsStyles.getMemberList}  
                    onClick={
                        (event)=>{event.stopPropagation();
                        props.addFocusedWindow(props.fWUFC.id, true);
                    }}>
                            Choose Users for Chat
                    </a>

                }

                {/* {props.usersForChatShow ? 
                <div  className={chatsStyles.getMemberList} onClick={(event)=>{event.stopPropagation();}}>
                    <UsersContainer

                    setSelectedForChatUsers={setSelectedForChatUsers} forChat={true} 
                    selectedForChatUsers={selectedForChatUsers} 
                    styleForUsers={styleMessages.usersForChatActive} styleForUser={styleMessages.userForChat}

                    usersForChatShow={props.usersForChatShow}
                    setUsersForChatShow={props.setUsersForChatShow}
                    toogleFocuseElem={props.toogleFocuseElem}/>

                    {selectedForChatUsers.length === 1 && <a onClick={() => {props.createDialog(selectedForChatUsers[0])}}>Create Dialog</a>}
                    </div>
                    // <div className={styleMessages.usersForChatActive}>
                    :
                    <a className={chatsStyles.getMemberList} 
                        onClick={props.toogleFocuseElem(props.setUsersForChatShow, props.usersForChatShow)}>
                            Choose Users for Chat
                    </a>
                } */}



            </div>
            </div>
                <div className={chatsStyles.chatsItems}>
                    {chatsElements}
                </div>
        </div>
        
        </>
    )
}
// can be lastMessage ={} if no msgs yet, 


let mapStateToProps = (state) => ({
    chats: selectChats(state),
    isAuth: state.auth.isAuth,
    isFetching: state.chatsPage.isFetching,
    isUnmount: state.chatsPage.isUnmount,
    myUserId: state.auth.userId,
    OLDsnusers: state.chatsPage.usersToSelect, // по-сути должны быть все)))))))) TODO но асинхронно подгружатся
    // state.chatsPage.membersToSelect <- getUsers(page) (subs requestUsersForChat) TODO
    // chatPhotoSmall: selectChatPhotoSmall(state)
    // userId: state.auth.userId,
    // id - data
    fWUFC: selectFocusedWindowUsersForChat(state),
    fWAUFC: selectFocusedWindowAddUserForChat(state),
    fWMFC: selectFocusedWindowMembersForChat(state),
    fWMOFC: selectFocusedWindowMemberOperationsForChat(state),


})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getChats, setCurrentChatData, unSetCurrentChatData,
        clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal,
        createDialog, createConversation, 
        // requestUsersForChat,
        renameChatRequest, addMember, setChatPhotoRequest, deleteChatRequest,

        addFocusedWindow, clearCurrentFocusedWindow,
    }),
    withRouter
)(ChatsContainer);


//currentChatDataFetching
