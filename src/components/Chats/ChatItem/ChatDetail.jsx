/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import withAuthRedirect from '../../../hoc/WithAuthRedirect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMessages, editMessageRequest, deleteMessageRequest, getCurrentChatData,
        clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal,
        toogleMemberStatus, removeMemberMsgs, removeOneMemberMsg, removeMember,
        setChatPhotoRequest, addMember, renameChatRequest,
        setReadFromIndexMsgs, getFile
        // , downloadFile
        // , requestUsersForChat
     } from '../../../redux/chats-reducer';
import Preloader from '../../common/Preloader/Preloader';
import { selectChatMessages, selectCIPS, selectCTIPS, selectCurrentChat, selectFocusedWindowAddUserForChat, selectFocusedWindowMembersForChat, selectFocusedWindowMemberOperationsForChat } from '../../../redux/chats-selector';
import Message from '../Message/Message';


import styleMessages from '../Message/Message.module.css';
import styleChats from '../Chats.module.css';
import CreateMessage from '../Message/CreateMessage';
import { useForbidUnsafeMethods } from '../../../customHooks/reduceUnsafeMethods';
import { ChangeChatPhoto, RenameChat, Member, Members, SelectMemberToChat } from './ChatItem';
import { addFocusedWindow, clearCurrentFocusedWindow } from '../../../redux/app-reducer';


import InfiniteScroll from "react-infinite-scroll-component";

// const style = {
//   height: 30,
//   border: "1px solid green",
//   margin: 6,
//   padding: 8
// };

// class App extends React.Component {
//   state = {
//     items: Array.from({ length: 20 })
//   };

//   fetchMoreData = () => {
//     // a fake async api call like which sends
//     // 20 more records in 1.5 secs
//     setTimeout(() => {
//       this.setState({
//         items: this.state.items.concat(Array.from({ length: 20 }))
//       });
//     }, 1500);
//   };

//   render() {
//     return (
//       <div>
//         <h1>demo: react-infinite-scroll-component</h1>
//         <hr />
//         <InfiniteScroll
//           dataLength={this.state.items.length}
//           next={this.fetchMoreData}
//           hasMore={true}
//           loader={<h4>Loading...</h4>}
//         >
//           {this.state.items.map((i, index) => (
//             <div style={style} key={index}>
//               div - #{index}
//             </div>
//           ))}
//         </InfiniteScroll>
//       </div>
//     );
//   }
// }





const ChatDetail = (props) => {
    
    const [ensm, setEnsm, shown, setShown, reduceMethods] = useForbidUnsafeMethods()
    const [preFetch, setPreFetch] = useState(false);
    // heres
    // only for first load!!!
    // const [readFromIndex, setReadFromIndex] = useState(props.readFromIndexNext) // we should get oldest msg to get minimum index from wich we would run down

    const fetchData = async () => {
            if (!shown && props.readFromIndexNext!==null) {
                await props.getMessages(props.chatTypeId, props.chatId, props.readFromIndexNext)
                // await props.requestUsersForChat()
                setShown(true)
            }
    }

    const [selectedMember, setSelectedMember] = useState(null) // member.id


    const refreshData = () => {
        if (shown && props.readFromIndexNext!==null) {
            setTimeout(async() =>{
                await props.getMessages(props.chatTypeId, props.chatId, props.readFromIndexNext)
            }, 1000)
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


    const fetchMoreMsgs = async() => {
        if ( props.readFromIndexNext!==null) {
            await props.getMessages(props.chatTypeId, props.chatId, props.readFromIndexNext)
        }
        // setReadFromIndex()
        // props.setReadFromIndexMsgs()
    }

    if (!shown) return <Preloader />
    let messages = props.messages.map(msg => <Message message={msg} deleteMessageRequest={props.deleteMessageRequest} editMessageRequest={props.editMessageRequest} ENSM={!msg.local} chatTypeId={props.chatTypeId} chatId={props.chatId} getFile={props.getFile}/>)


    const prefetchOper = (method, chatTypeId, chatId) => (selectedMemberId)  => () => method(chatTypeId, chatId, selectedMemberId)
    
    let memberOpers = [{method: props.toogleMemberStatus, name: 'Toogle Member'}, {method: props.removeMemberMsgs, name: 'Remove All Member Messages'}, {method: props.removeMember, name: 'Remove Member'}]
                        // .map(memberOper =>({method: prefetchOper(memberOper.method, props.chatTypeId, props.chatId), name: memberOper.name}))  // chatTypeId // chatId
    
    let chatUsersIds = props.currentChat.members.map(member => member.id)


    let members = props.chatTypeId === 1 
                    ? 
                    props.currentChat.members.map(member => <Member member={member} key={member.id} memberStyle={`${styleMessages.chatMember}`} 
                        chatMemberSettings={`${styleMessages.chatMemberSettings}`}
                        setMemberOperShow={(event) => (event.stopPropagation(), props.addFocusedWindow(props.fWMOFC.id, true))}
                        addFocusedWindow={props.addFocusedWindow}
                        fWMOFC={props.fWMOFC}
                        setSelectedMember={setSelectedMember}/>)
                    :
                    props.currentChat.members.map(member => <Member member={member} key={member.id}/>)
    return (
        <>
        {
        // add member to chat
                props.fWAUFC.data !== null  && 
                <div className={styleChats.addMember}>
                        <SelectMemberToChat addMember={props.addMember} chatTypeId={props.chatTypeId} chatId={props.chatId} chatUsersIds={chatUsersIds} 
                        fWAUFC={props.fWAUFC} clearCurrentFocusedWindow={props.clearCurrentFocusedWindow}
                        />
                        </div>
        }

        <div className={styleMessages.currentChat}>
            
                <Members members={members} 
                membersShow={props.fWMFC.data} 
                memberOperShow={props.fWMOFC.data} 
                selectedMember={selectedMember}
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
                                {props.fWAUFC.data === null  &&
                                    <a className={styleChats.getMemberList}
                                        onClick={
                                            (event) => (event.stopPropagation(), props.addFocusedWindow(props.fWAUFC.id, [props.chatTypeId, props.chatId]))
                                         }
                                        > 
                                            Add Member
                                        </a>
                                }

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
                                {
                                props.fWMFC.data === null &&
                                <a onClick={(event)=>(event.stopPropagation(), props.addFocusedWindow(props.fWMFC.id, true))}>
                                    Chat Members
                                </a>
                                }
                            </div>
                        </div>
                    

                    </div>
                </div>
            </div>







            {/* <div className={styleMessages.messages}>  
                {messages}
            </div> */}


        <InfiniteScroll
            className={styleMessages.messages}
            dataLength={messages.length}
            next={()=>fetchMoreMsgs()}
            hasMore={true}
            loader={<h4>Loading...</h4>} >

            {/* {this.state.items.map((i, index) => (
                <div style={style} key={index}>
                div - #{index}
                </div>
            ))} */}
            
            {messages}

        </InfiniteScroll>





            <div className={styleMessages.createMessageForm}><CreateMessage chatTypeId={props.chatTypeId} chatId={props.chatId} isAuth={props.isAuth}/></div>


            
        </div>
</>
    )
}


let mapStateToProps = (state) => ({
    messages: selectChatMessages(state),
    isAuth: state.auth.isAuth,
    chatTypeId: selectCTIPS(state),
    chatId: selectCIPS(state),
    currentChat: selectCurrentChat(state),
    // snusers: state.chatsPage.usersToSelect,

    fWAUFC: selectFocusedWindowAddUserForChat(state),
    fWMFC: selectFocusedWindowMembersForChat(state),
    fWMOFC: selectFocusedWindowMemberOperationsForChat(state),


    readFromIndexNext: state.chatsPage.readFromIndex,
})

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, { getMessages, editMessageRequest, deleteMessageRequest,
                                getCurrentChatData,
                                clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal,
                                // requestUsersForChat,
                                // update chat after below
                                toogleMemberStatus, removeMemberMsgs, removeOneMemberMsg, removeMember,
                                setChatPhotoRequest, addMember, renameChatRequest,

                                addFocusedWindow, clearCurrentFocusedWindow,

                                setReadFromIndexMsgs,
                                getFile, 
                                // downloadFile,
                            }),
    withRouter
)(ChatDetail)



