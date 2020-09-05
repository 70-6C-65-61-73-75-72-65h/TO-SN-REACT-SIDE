class App extends Component {
    // ...
    render() {
      return (
        <div>
          
          {/* 1. встроенный обработчик событий "компонента DOM" */}
          <button onClick={() => { this.setState({ clicked: true }) }}> Click! </button>
          
          {/* 2. "Кастомное событие" или "действие" */}
          <Sidebar onToggle={(isOpen) => {
            this.setState({ sidebarIsOpen: isOpen })
          }}/>
          
          {/* 3. Коллбэк свойства render */}
          <Route path="/topic/:id" render={({ match }) => ( <div> <h1>{match.params.id}</h1> </div> )} />
        </div>
      )
    }
  }


}












let reducers: Reducer<CombinedState<{
  profilePage: {
      newPostText: any;
      posts: {
          id: number;
          message: string;
          likesCount: number;
      }[];
  };
  dialogsPage: {
      newMessageBody: any;
      dialogs: {
          id: number;
          name: string;
      }[];
      messages: {
          id: number;
          message: string;
      }[];
  };
  sidebar: {};
  usersPage: {
      ...;
  } | {
      ...;
  };
}>, AnyAction>












curl --header "Content-Type: application/json" --request PUT --data "{ \"user_data\": { \"photos\": {\"large\": \"https://image.freepik.com/free-vector/_79416-76.jpg\", \"small\": \"https://pm1.narvii.com/6913/9af1b041b94fa4f6a3dc638243fff7d5d3f83b72r1-600-594v2_00.jpg\"}} }" "http://127.0.0.1:4000/users/42"





nice try to perform concurenlty responsible operations
// setTimeout ------ stick this function at the end of the current event loop queue
/// pattern now-later
// var res = [];

// // `response(..)` receives array of results from the Ajax call
// function response(data) {
// 	// let's just do 1000 at a time
// 	var chunk = data.splice( 0, 1000 );

// 	// add onto existing `res` array
// 	res = res.concat(
// 		// make a new transformed array with all `chunk` values doubled
// 		chunk.map( function(val){
// 			return val * 2;
// 		} )
// 	);

// 	// anything left to process?
// 	if (data.length > 0) {
// 		// async schedule next batch
// 		setTimeout( function(){
// 			response( data );
// 		}, 0 );
// 	}
// }

// // ajax(..) is some arbitrary Ajax function given by a library
// ajax( "http://some.url.1", response );
// ajax( "http://some.url.2", response );














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
        // setReadFromIndexMsgs, 
        getFile
        // , downloadFile
        // , requestUsersForChat
     } from '../../../redux/chats-reducer';
import Preloader from '../../common/Preloader/Preloader';
import { selectChatMessages, selectCIPS, selectCTIPS, selectCurrentChat, selectFocusedWindowAddUserForChat, selectFocusedWindowMembersForChat, selectFocusedWindowMemberOperationsForChat } from '../../../redux/chats-selector';
import Message from '../Message/Message';


import styleMessages from '../Message/Message.module.css';
import styleChats from '../Chats.module.css';
import CreateMessage from '../Message/CreateMessage';
// import { useForbidUnsafeMethods } from '../../../customHooks/reduceUnsafeMethods';
import { ChangeChatPhoto, RenameChat, Member, Members, SelectMemberToChat } from './ChatItem';
import { addFocusedWindow, clearCurrentFocusedWindow } from '../../../redux/app-reducer';


import InfiniteScroll from "react-infinite-scroll-up-n-down";

// useFull only for posts (cause scrolling only down ( not top((())))) InfiniteScroll  from "react-infinite-scroll-component";
// try another InfiniteScroll
// npm install react-infinite-scroll-up-n-down --save



// useEffect(()=>{
//     if( hasMore ){
//         setHasMore(false)
//     }
// },[props.readFromIndexNext])


// import React from "react";
// import { render } from "react-dom";
// import InfiniteScroll from "react-infinite-scroll-component";

// const style = {
//   height: 30,
//   border: "1px solid green",
//   margin: 6,
//   padding: 8
// };

// class App extends React.Component {
//   state = {
//     items: Array.from({ length: 20 }),
//     hasMore: true
//   };

//   fetchMoreData = () => {
//     if (this.state.items.length >= 500) {
//       this.setState({ hasMore: false });
//       return;
//     }
//     // a fake async api call like which sends
//     // 20 more records in .5 secs
//     setTimeout(() => {
//       this.setState({
//         items: this.state.items.concat(Array.from({ length: 20 }))
//       });
//     }, 500);
//   };

//   render() {
//     return (
//       <div>
//         <h1>demo: react-infinite-scroll-component</h1>
//         <hr />
//         <InfiniteScroll
//           dataLength={this.state.items.length} // сколько уже прогрузилось // props.messages.length
//           next={this.fetchMoreData} // 
//           hasMore={this.state.hasMore} // if( props.readFromIndexNext === 0) return false
//           loader={<h4>Loading...</h4>}
//           endMessage={
//             <p style={{ textAlign: "center" }}>
//               <b>Yay! You have seen it all</b>
//             </p>
//           }
//         >
//           >
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

// render(<App />, document.getElementById("root"));


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



// import useScrollBottom from 'react-scroll-bottom-hook'

// const useScrollBottom = () => {

//     const [isBottom, setIsBottom] = useState(false)
  
//     const scrollRef = useRef(null) 
  
//     const onScroll = () => {
//       if(scrollRef.current){
//         setIsBottom(
//           scrollRef.current.scrollTop >= scrollRef.current.scrollHeight - scrollRef.current.clientHeight
//         )
//       }
//     }
  
//     useEffect(() => {
//       scrollRef.current.addEventListener('scroll', onScroll)
//       return () => {
//         if(scrollRef && scrollRef.current) {
//           scrollRef.current.removeEventListener('scroll', onScroll)
//         }
//       }
//     }, [scrollRef.current])
  
//     return [isBottom, scrollRef]
//   };


const ChatDetail = (props) => {






    // const [localMsgs, setLocalMsgs] = useState(props.messages)
    const refToTop = useRef(null)

    // useEffect(()=>{
    //     setLocalMsgs(props.messages)
    // },[props.messages])




    // refToTop.current.scrollTop = Number.MAX_SAFE_INTEGER


    // const scrollParentRef = useRef(null)
    // const [isBottom, scrollRef ] = useScrollBottom()

    // const refToTop = useRef(null)
    const [refToTopAtStart, setRTTAS] = useState(true)

    useEffect(() => {
        // console.log('refToTop')
        // console.log(refToTop.current)
        // console.log(refToTopAtStart)
        if(refToTop.current && refToTopAtStart){
            console.log('refToTop2')
            console.log(refToTop)
            refToTop.current.scrollTop = refToTop.current.scrollHeight;
            setRTTAS(false)
        }
    },[refToTop.current, refToTopAtStart])

    // const [hasMore, setHasMore] = useState(true)
    // useEffect(()=>{
    //     if( props.readFromIndexNext === 0){
    //         setHasMore(false)
    //     }
    // },[props.readFromIndexNext])


    // const [ensm, setEnsm, shown, setShown, reduceMethods] = useForbidUnsafeMethods()
    const [preFetch, setPreFetch] = useState(false);
    // heres
    // only for first load!!!
    // const [readFromIndex, setReadFromIndex] = useState(props.readFromIndexNext) // we should get oldest msg to get minimum index from wich we would run down

    // const fetchData = async () => {
    //         if (!shown && props.readFromIndex!==null && !props.IsFetchingMsgs) {
    //             await props.getMessages(props.chatTypeId, props.chatId, props.readFromIndex)
    //             // await props.requestUsersForChat()
    //             setShown(true)
    //         }
    // }

    const [selectedMember, setSelectedMember] = useState(null) // member.id


    const refreshData = async() => { 
        console.log('try refresh function') 
        await props.getMessages(props.chatTypeId, props.chatId, props.readFromIndex) 
    }
        // debugger
        // console.log('try refresh')
        // if (preFetch && props.readFromIndex!==null && !props.IsFetchingMsgs && !refToTopAtStart) { // data fetched + got readFromIndex
            // console.log('refreshData')
            // setTimeout(async() =>{
            //     console.log('try refresh function')
            //     // if(!props.IsFetchingMsgs && !refToTopAtStart){
            //         // always call this func but it will run only if all clauses are correct
            //     // console.log(preFetch && props.readFromIndex!==null && !props.IsFetchingMsgs && !refToTopAtStart)
            //     if(!props.IsFetchingMsgs){
            //         debugger
            //     }
            //     console.log(preFetch);
            //     console.log(props.readFromIndex );
            //     console.log(!props.IsFetchingMsgs);
            //     console.log(!refToTopAtStart);
            //     if (preFetch && props.readFromIndex!==null && !props.IsFetchingMsgs && !refToTopAtStart) { 
            //         await props.getMessages(props.chatTypeId, props.chatId, props.readFromIndex)
            //     } 
            //     // else {
            //     //     setTimeout(refreshData, 1000)
            //     // }
            // // }
            // }, 1000)
        // }

        
    // after each member remove - member add
    const populatePreFetchData = async() => {
            await props.getCurrentChatData();
            setPreFetch(true);
    }
    useEffect(() => {
        if(!preFetch && !props.IsFetchingMsgs){
            populatePreFetchData();
        }
    }, [props])
    useEffect(() => {
        if(preFetch && !props.IsFetchingMsgs && props.readFromIndex!==null && !refToTopAtStart){
            refreshData();
        }
    }, [props.messages, preFetch, props.IsFetchingMsgs, props.readFromIndex,refToTopAtStart ])



    useEffect(() => {
        if(!preFetch && !props.IsFetchingMsgs){
            populatePreFetchData();
        }
    }, [props])
    
    const fetchMoreOldMsgs = async() => {
        if(!props.IsFetchingMsgs && !refToTopAtStart){
            await props.getMessages(props.chatTypeId, props.chatId, props.readFromIndexNext)
        }
    }

    const updateUnreadMsgs = async(lastGlobalReadMsgId) => { // msg.id thet was intersected 
        await props.updateUnreadMsgs(props.chatTypeId, props.chatId, lastGlobalReadMsgId)
    }


    // const fetchMoreMsgs = async(ev) => {
    //         // if ( props.readFromIndexNext!==null) {
    //             // console.log('refToTopAtStart')
    //             // console.log(refToTopAtStart)
    //     console.log("fetchMoreMsgs ev")
    //     debugger
    //     console.log(ev)
    //     if(!props.IsFetchingMsgs && !refToTopAtStart){
    //         // debugger
    //         // debugger
    //         await props.getMessages(props.chatTypeId, props.chatId, props.readFromIndexNext, null, 'fetchMoreMsgs')
    //     }
    // }
    

    if (!preFetch) return <Preloader />
    // let messages = props.messages.map((msg, index) => index !== messages.length-1 ?
    // <Message message={msg} key={msg.id} deleteMessageRequest={props.deleteMessageRequest} editMessageRequest={props.editMessageRequest} ENSM={!msg.local} chatTypeId={props.chatTypeId} chatId={props.chatId} getFile={props.getFile}/> :
    // <Message ref={refToTop} message={msg} key={msg.id} deleteMessageRequest={props.deleteMessageRequest} editMessageRequest={props.editMessageRequest} ENSM={!msg.local} chatTypeId={props.chatTypeId} chatId={props.chatId} getFile={props.getFile}/>
    // )
    let messages = props.messages.map(msg => <Message message={msg} key={msg.id} deleteMessageRequest={props.deleteMessageRequest} editMessageRequest={props.editMessageRequest} ENSM={!msg.local} chatTypeId={props.chatTypeId} chatId={props.chatId} getFile={props.getFile}/>)
 
    
    // console.log(messages)
    // if(messages.length === 15){
    //     debugger
    // }
    

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

        <div className={styleMessages.messages} ref={refToTop}>
            {/* <InfiniteScroll
                pageStart={0}
                loadMore={(ev)=>fetchMoreMsgs(ev)}
                hasMore={props.loadingOnScroll}
                loader={<h4>Loading...</h4>} 
                // getScrollParent={() => scrollParentRef}
                isReverse={true}
                adjustReverseScroll={true}
                threshold={1}
                > */}
                
                {/* {this.state.items.map((i, index) => (
                    <div style={style} key={index}>
                    div - #{index}
                    </div>
                ))} */}
                
                {messages}

            {/* </InfiniteScroll> */}
        </div>




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


    readFromIndexNext: state.chatsPage.readFromIndexNext,
    readFromIndex: state.chatsPage.readFromIndex,
    loadingOnScroll: state.chatsPage.loadingOnScroll,
    IsFetchingMsgs: state.chatsPage.IsFetchingMsgs,
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

                                // setReadFromIndexMsgs,
                                getFile, 
                                // downloadFile,
                            }),
    withRouter
)(ChatDetail)



// // for  IS only down
// <div id="scrollableDiv" className={styleMessages.messages}>
//             <InfiniteScroll
                
//                 dataLength={messages.length}
//                 // next={()=>fetchMoreMsgs()}
//                 next={fetchMoreMsgs}
//                 hasMore={props.loadingOnScroll}
//                 loader={<h4>Loading...</h4>} 
//                 scrollableTarget="scrollableDiv">
                
//                 {/* {this.state.items.map((i, index) => (
//                     <div style={style} key={index}>
//                     div - #{index}
//                     </div>
//                 ))} */}
                
//                 {messages}

//             </InfiniteScroll>
//         </div>










//// - another time  01-09-20











const ChatDetail = ({getCurrentChatData, getMessages, IsFetchingMsgs,  // functions
    chatTypeId:_chatTypeId, chatId:_chatId, readFromIndexNext:_readFromIndexNext, firstOfSetOfMsgsId:_firstOfSetOfMsgsId, readFromIndex:_readFromIndex, // state
    ...props}) => {  // other props

    // let cantApplyGetMessages = false; // if we yet dont change isFetching but useEffect is going to change it before component will be refreshed
    // ---------------------------------BLOCK FIRST FETCHING
    // populate current chat data and messages (state->useEffect->function)


    const [oldMsgsDonwload, setOldMsgsDonwload] = useState(false); 
    const [preFetch, setPreFetch] = useState(false);  /// +
    const [selectedMember, setSelectedMember] = useState(null) /// using in child functions (so dont check it now)   -
    const [refToTopAtStart, setRTTAS] = useState(true)  ///
    const [positioningScrollRefScroll, setPSRS] = useState(false) 
    const refPS = useRef(null) // this ref node always had loadOldMsgsDiv part of oclass ( we can write here not only node, but object {'node':node, classPart:'loadOldMsgsDiv'})
    const ref = useRef(null)

    const getMessagesCB = useCallback( async (RFI) => ( await getMessages(_chatTypeId, _chatId, RFI, _firstOfSetOfMsgsId )),
                                        [ _chatTypeId, _chatId, _firstOfSetOfMsgsId, getMessages ] ) // _prop - mean its from props descruct


    const getRefreshMessagesCB = useCallback( async () => ( await getMessagesCB( _readFromIndex )),  [_readFromIndex, getMessagesCB ] ) // _prop - mean its from props descruct

    const getOLDMessagesCB = useCallback( async () => ( await getMessagesCB( _readFromIndexNext )), [ _readFromIndexNext, getMessagesCB ] ) // _prop - mean its from props descruct



    
    // by the way there is no deps (setOldMsgsDonwload creating only 1 time for all renders) => so UC(PSRCB) cant start using UC(PSR) cause setOldMsgsDonwload stay the same
    const psrCB = useCallback( (node) => { // we write it mutable var to var node
        
        const thresholdArray = steps => Array(steps + 1)
        .fill(0)
        .map((_, index) => index / steps || 0)

        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                const isIntersecting = entry.isIntersecting
                if(isIntersecting){ 
                    console.log("TOP DIV VIEWED: " + entry.target.innerText)
                    entry.target.className = entry.target.className.replace(/[^\s]*loadOldMsgsDiv[^\s]*/g, ''); // change whole className but regex will take only a part of className (approp class)
                    observer.unobserve(entry.target)
                    
                    setOldMsgsDonwload(true) // toggle proccess for loading old msgs
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersect, {threshold: thresholdArray(20)})
        observer.observe(node);
    },[setOldMsgsDonwload])

    // oldMsgsDonwload -it after psrCB changed  /// isShouldCall = ref={(event) => ( positioningScrollRef(event.target, positioningScrollRefScroll && !oldMsgsDonwload))}
    const positioningScrollRef = useCallback((node, isShouldCall) => { // do it only once when page loading
        console.log('positioningScrollRef check')
        // if node===null -> it called only cause of some wierd problem (after it setRTTAS(false) => should be alqays refToTopAtStart=false     TIP I DONT KNOW WHY IT NOT LIKE THAT )
        if(node && isShouldCall){ // data loaded to redux but not scrolled element yet
            refPS.current = node
            console.log('positioningScrollRef')
            refPS.current.scrollIntoView()
            psrCB(refPS.current)
        }
        
    }, [psrCB])//, createRefObserver]) 
    // positioningScrollRefScroll - is scroll should be?  -  that triggered in fetchOldMsgs setPSRS(true),  
    // props.oldMsgsDonwload - are old msgs downloading now?  - that triggered in useEffect(IO) setOldMsgsDonwload(true),  (should be not loaded now to trigger it after in useEffect(IO))
    // it settled false after fetchMoreOldMsgs is done

    





    




    // // // // suspend loadOldMsgs function expression to useEffect (that each render page will check if refPS is changed (it will 100% and make an observer to it ref=> but old observer unobserve in return???))
    // // // useEffect(()=>{ // (IO) /// for every render of page ( a=cause use useRef)
    // // //     // for claenup function ( cause refPS - mutable and we cant see prev render value of refPS ( we wwill see current refPS))
    // // //     const currentNodeOfRef = refPS.current

    // // //     const thresholdArray = steps => Array(steps + 1)
    // // //     .fill(0)
    // // //     .map((_, index) => index / steps || 0)

    // // //     const handleIntersect = (entries, observer) => {
    // // //         entries.forEach(entry => {
    // // //             const isIntersecting = entry.isIntersecting
    // // //             // const currentY = entry.boundingClientRect.y
    // // //             if(isIntersecting){ 
    // // //                 // state = "TOP DIV VIEWED: " + entry.target.innerText ;//"Message viewed: " + entry.innerText 
    // // //                 console.log("TOP DIV VIEWED: " + entry.target.innerText)
    // // //                 // entry.target.classList.remove('messageToObserve'); 
    // // //                 entry.target.className = entry.target.className.replace(/[^\s]*loadOldMsgsDiv[^\s]*/g, ''); // change whole className but regex will take only a part of className (approp class)
    // // //                 observer.unobserve(entry.target)
    // // //                 setOldMsgsDonwload(true) // toggle proccess for loading old msgs
    // // //             }
    // // //         })
    // // //     }

    // // //     const observer = new IntersectionObserver(handleIntersect, {threshold: thresholdArray(20)})
    // // //     if (refPS.current) { // if it rendered on page ( if not reached start of chat)
    // // //         observer.observe(refPS.current);
    // // //     }
        
    // // //     // anyway cleanup
    // // //     return () => {observer.unobserve(currentNodeOfRef)} // it will unobserve prev node of ref

    // // // },[setOldMsgsDonwload, refPS]) // refPS changes every render or if it change ref node after render???? TODO CHECK
















    // // const ref
    // const loadOldMsgs = useCallback(() => { // cause only 1 target to observe - make it once after each load

    //     // const state = document.querySelector('.observer__state') // can make a setInterval to show changes of entry.target.innerText while intersecting
    //     const target = document.querySelector('div[class*="loadOldMsgsDiv"]') // [id*='someId']
    //     console.log('target for observe to load old msgs')
    //     console.log(target)

    //     const thresholdArray = steps => Array(steps + 1)
    //     .fill(0)
    //     .map((_, index) => index / steps || 0)

    //     const handleIntersect = (entries, observer) => {
    //         entries.forEach(entry => {
    //             const isIntersecting = entry.isIntersecting
    //             // const currentY = entry.boundingClientRect.y
    //             if(isIntersecting){ 
    //                 // state = "TOP DIV VIEWED: " + entry.target.innerText ;//"Message viewed: " + entry.innerText 
    //                 console.log("TOP DIV VIEWED: " + entry.target.innerText)
    //                 // entry.target.classList.remove('messageToObserve'); 
    //                 entry.target.className = entry.target.className.replace(/[^\s]*loadOldMsgsDiv[^\s]*/g, ''); // change whole className but regex will take only a part of className (approp class)
    //                 observer.unobserve(entry.target)
    //                 setOldMsgsDonwload(true) // toggle proccess for loading old msgs
    //             }
    //             // previousY = currentY
    //         })
    //     }

    //     const observer = new IntersectionObserver(handleIntersect, {threshold: thresholdArray(20)})
    //     observer.observe(target)
    // },[setOldMsgsDonwload ]) // only once at firstly page render (cause function wont change anyway)



    useEffect(() => { ////////////////////////////////////////////// (PF)
        if( !preFetch ){//&& !props.IsFetchingMsgs){ 
            const populatePreFetchData = async() => {
                await getCurrentChatData();
                setPreFetch(true);
            }
            populatePreFetchData();
        }
    }, [preFetch, getCurrentChatData])


    
    // ---------------------------------BLOCK FIRST FETCHING


    // ---------------------------------BLOCK POSITIONING SCROLL THUMB
    


    // // to positioningScrollRef
    // const createFirstRefObserver = useCallback((setRTTAS)=>{
    //     setRTTAS(false)
    //     loadOldMsgs() // after its scrolling top -> we can make an observer to the top div tag
    // },[])

    // // to positioningScrollRef
    // const createNewRefObserver = useCallback(()=>{
    //     setPSRS(false)
    //     loadOldMsgs() // after its scrolling top -> we can make an observer to the top div tag
    // },[])


    // const createRefObserver = useCallback((methodToAnnihilateValue)=>{
    //     methodToAnnihilateValue(false)
    //     // loadOldMsgs() // after its scrolling top -> we can make an observer to the top div tag
    // },[])//,[loadOldMsgs])

    
    // props.currentChat.firstNewMsgID === null -> scrool not to the top ( but to the first new msgs) (here will be refToTop)
    // else  -> scrool to the top  (here will be refToTop)
    // like: ref={(event)=>refToTop(event.target, (props.currentChat.firstNewMsgID === null),  refToTopAtStart)}

    const refToTop = useCallback((node, isScrollingToTheTop, isPositioning) => { // do it only once when page loading
        if(isPositioning){
            console.log('refToTop check')
        // if node===null -> it called only cause of some wierd problem (after it setRTTAS(false) => should be alqays refToTopAtStart=false     TIP I DONT KNOW WHY IT NOT LIKE THAT )
        // if(refToTopAtStart && preFetch && node){ // data loaded to redux but not scrolled element yet
            ref.current = node
            // {block: 'center', inline: 'center', behavior: 'smooth'}
            // console.log('refToTop')
            // console.log('ref.current ')
            // console.log( ref.current)
            // console.log('props.currentChat ');
            // console.log(props.currentChat)
            // console.log('refToTopAtStart '+ refToTopAtStart)
            // console.log('preFetch '+ preFetch);
            if (isScrollingToTheTop) {
                ref.current.scrollTop = ref.current.scrollHeight  
            } else {
                ref.current.scrollIntoView()
            }

            setRTTAS(false) // useEffect to loadOldMsgs (just create observer on such ref where it belong (refPS))
            // setRTTAS(false)
            // loadOldMsgs() // after its scrolling top -> we can make an observer to the top div tag
        }
    }, [setRTTAS]) // it will updating after each render????? ( preFetch, refToTopAtStart)



    // In your component you'll still recieve a `ref`, but it 
    // will be a callback function instead of a Ref Object
    // props.currentChat.firstNewMsgID!==null ---  это произойдет все равно только после отрисовки страницы потому { props.currentChat.firstNewMsgID} уже прогрузится с API и не будет undefined

    // ---------------------------------BLOCK POSITIONING SCROLL THUMB
        

    // ---------------------------------BLOCK REFRESH DATA




    // useEffect(() => {
    //     if( !IsFetchingMsgs && !refToTopAtStart ){
    //         // if(preFetch && !props.IsFetchingMsgs && props.readFromIndex!==null && !refToTopAtStart){ --------------
    //         // refreshData();
    //         setTimeout((function(PSRS, chatTypeId, chatId, readFromIndex, firstOfSetOfMsgsId, oldMsgsDonwload){
    //             refreshData(PSRS, chatTypeId, chatId, readFromIndex, firstOfSetOfMsgsId, oldMsgsDonwload);
    //          })(positioningScrollRefScroll, props.chatTypeId, props.chatId, props.readFromIndex, props.firstOfSetOfMsgsId, oldMsgsDonwload ), 1500);
    //     }  }, [props.messages, IsFetchingMsgs, refToTopAtStart])

    // const refreshData = async(PSRS, chatTypeId, chatId, readFromIndex, firstOfSetOfMsgsId, oldMsgsDonwload) => { 
    //     console.log('try refresh function') 
    //     // CREATE SETtIMEoUT TO CALL IT AFTER SOME INTERVAL TO GET SOME GAP FOR OTHER POSSIBLE CALLS OF getMsgs
    //     // setTimeout(async() => { 
    //     if(!PSRS && !oldMsgsDonwload){
    //         await getMessages(chatTypeId, chatId, readFromIndex, firstOfSetOfMsgsId )
    //     }
    //     //  }, 1500);
    // }


    // chatTypeId, chatId, readFromIndex, firstOfSetOfMsgsId   // positioningScrollRefScroll - if started the process of that will start oldMsgsDownload then => end oldMsgsDownload => end positioningScrollRefScroll
    useEffect(() => {/////////////////////////////////////////////////// (RD)
        // if( !IsFetchingMsgs && preFetch ){ // it rendering (so it after prefetch - so can use prefetch checker ( not refToTopAtStart ))
            // if(preFetch && !props.IsFetchingMsgs && props.readFromIndex!==null && !refToTopAtStart){ --------------
            // refreshData();
            if(preFetch) {
                setTimeout((async function(isShouldRunRefresh){
                    if( isShouldRunRefresh ){
                        await getRefreshMessagesCB()
                    }
                })(!oldMsgsDonwload && preFetch), 1500); // но на старом состоянии рендера  oldMsgsDonwload - фолс!!, потому луше юзать рефу текущего состояния, если ща рефа 
            }
            //  но функция то мы запускаем иммидиатли(потому значения oldMsgsDonwload - текущие!!!!)
        // }  
    }, [preFetch, oldMsgsDonwload, getRefreshMessagesCB]) //  for what oldMsgsDonwload ???? if msgs not fetching yet ( but process of getOLDMessagesCB is started ( but async so can не успеть зарундерится))
        // IsFetchingMsgs dont need (cause only 2 effects - FOM and RD -> if FOM processing (oldMsgsDonwload) => u can use RD and vise versa)






    // ---------------------------------BLOCK REFRESH DATA


    // ---------------------------------BLOCK SELECT MEMBERS OF CHAT
    // const [selectedMember, setSelectedMember] = useState(null) // member.id
    // ---------------------------------BLOCK SELECT MEMBERS OF CHAT


    // ---------------------------------BLOCK FETCH OLD MSGS

    // const [oldMsgsDonwload, setOldMsgsDonwload] = useState(false) -> to the redux state ( to sync after loading )
    // const [msgsRendered, setMR] = useState(false) // setMR 

    
    // const checkIsFetchMsgs = useCallback((method)=>{if(!IsFetchingMsgs){return method()}},[IsFetchingMsgs])

    


    useEffect(() => { // (FOM)
        if(!positioningScrollRefScroll && oldMsgsDonwload && !IsFetchingMsgs){ // если мы должны подгрузить старые сообщ + не грузится пока при рефреше сообщения, то запускаем асинх функцию
            const fetchOldMsgs = async() => {
                await getOLDMessagesCB() // query=null
                setPSRS(false) //  false will be called from component where  (falsing positioningScrollRefScroll)
                setOldMsgsDonwload(false) //  (falsing oldMsgsDonwload)
            }
            setPSRS(true)
            fetchOldMsgs()
        }
        // написать отмену загрузки данных (сообщений с АПИ)
        // return () => {} // после того как заканчивается эффект в котором условие исполнилось но не успело заверишся действие 
    }, [IsFetchingMsgs, positioningScrollRefScroll, oldMsgsDonwload, setOldMsgsDonwload, getOLDMessagesCB, setPSRS])
   


        
    // }
    // const fetchMoreOldMsgs = async() => { 
    //     await props.getMessages(props.chatTypeId, props.chatId, props.readFromIndexNext) 
    //     // setOldMsgsDonwload(false)
    //     // loadOldMsgs() // set another observer
    // }

    //   after sroll to the top 

    // can be only after refToTop callback or fetchMoreOldMsgs

    
    
    // ---------------------------------BLOCK FETCH OLD MSGS



    // TODO can implement only with useState to change num of new msgs  ( thet will pop up in circle there )

    // ---------------------------------BLOCK updateUnreadMsgs (NEW, THAT JUST READED)
    // ( after first load of page -  all msgs readed to the bottom)
    // const [newIntersectedMsgId, setNewIntersectedMsgId] = useState(null)  // msg.id (msg.msgViewed === false) -> (msg.msgViewed === true) (BY API)

    // useEffect(() => {
    //     if(!props.IsFetchingMsgs && !refToTopAtStart ){
    //         fetchMoreOldMsgs();
    //     } }, [refToTopAtStart, props.IsFetchingMsgs])

    // const updateUnreadMsgs = async(lastGlobalReadMsgId) => { // msg.id thet was intersected 
    //     await props.updateUnreadMsgs(props.chatTypeId, props.chatId, lastGlobalReadMsgId)
    // }
    // ---------------------------------BLOCK updateUnreadMsgs (NEW, THAT JUST READED)





