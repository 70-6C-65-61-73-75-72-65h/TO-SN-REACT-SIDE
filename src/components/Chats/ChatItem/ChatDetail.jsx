
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import { compose } from 'redux';
import withAuthRedirect from '../../../hoc/WithAuthRedirect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMessages, editMessageRequest, deleteMessageRequest, getCurrentChatData,
        clearChatMyLocal, clearChatMyGlobal, clearChatAllLocal, clearChatAllGlobal,
        toogleMemberStatus, removeMemberMsgs, removeOneMemberMsg, removeMember,
        setChatPhotoRequest, addMember, renameChatRequest, 
        getFile, setRefreshMessageCreating, 
        // setRefreshAfterDM,

        // setOldMsgsDonwload, 
        // fetchMoreOldMsgs
     } from '../../../redux/chats-reducer';
import Preloader from '../../common/Preloader/Preloader';
import { selectChatMessages, selectCIPS, selectCTIPS, selectCurrentChat, selectFocusedWindowAddUserForChat, selectFocusedWindowMembersForChat, selectFocusedWindowMemberOperationsForChat } from '../../../redux/chats-selector';
import Message from '../Message/Message';


import styleMessages from '../Message/Message.module.css';
import styleChats from '../Chats.module.css';
import CreateMessage from '../Message/CreateMessage'; 
import { ChangeChatPhoto, RenameChat, Member, Members, SelectMemberToChat } from './ChatItem';
import { addFocusedWindow, clearCurrentFocusedWindow } from '../../../redux/app-reducer';




// const initialState = {
//     count: 0,
//     step: 1,
// };

// function reducer(state, action) {
//     const { count, step } = state;
//     if (action.type === 'tick') {
//         return { count: count + step, step };
//     } else if (action.type === 'step') {
//         return { count, step: action.step };
//     } else {
//         throw new Error();
//     }
// }

// NMTRefCondition = (props.currentChat.firstNewMsgID !== null && refToTopAtStart ? refAtStart : undefined)
// (1) data = {data.msg, data.firstOfLastSetOfMsgsId, data.positioningScrollRefScroll,  data.refOMDPSR }   rc = (msg.id === props.readFromIndexBefore && positioningScrollRefScroll ? refOMDPSR : undefined)
// (2) data = {}    rc = (msg.id === props.readFromIndexBefore  && positioningScrollRefScroll ? refOMDPSR : undefined)

// data = {msg:msg, getFile:props.getFile, _chatId:_chatId, _chatTypeId:_chatTypeId, editMessageRequest:props.editMessageRequest, deleteMessageRequest:props.deleteMessageRequest}

const getMessageTagWithRef = (data, refCondition, withNewMsgsTag=false, NMTRefCondition=null) => {
    if(!withNewMsgsTag) return (<Message message={data.msg} key={data.msg.id}
                                ref={refCondition} // OMD_PSR_CBCB(msg.id)
                                deleteMessageRequest={data.deleteMessageRequest} 
                                editMessageRequest={data.editMessageRequest} ENSM={!data.msg.local}
                                chatTypeId={data._chatTypeId} chatId={data._chatId} getFile={data.getFile}/>)
    
    return [
        <div className={`${styleMessages.newMsgsStartTag}`} 
        ref={NMTRefCondition}>----------UNREAD MESSAGES----------</div>,
        // rasCBCB1()
        <Message message={data.msg} key={data.msg.id} 
        ref={refCondition} // OMD_PSR_CBCB(msg.id) 
        // id={msg.id === props.readFromIndexBefore ? 'TYTA SOOKA' : undefined}
                deleteMessageRequest={data.deleteMessageRequest} 
                editMessageRequest={data.editMessageRequest} ENSM={!data.msg.local}
                chatTypeId={data._chatTypeId} chatId={data._chatId} getFile={data.getFile}/>
        ]
}

// setRefreshAfterDM /


// ......  numOfDeletedMsgs - счетчик удаленных сообщений чтоб послать в рефрещ
const ChatDetail = ({getCurrentChatData, getMessages, IsFetchingMsgs,  
    setRefreshMessageCreating, 
    // setRefreshAfterDM, // functions
    chatTypeId:_chatTypeId, chatId:_chatId, readFromIndexNext:_readFromIndexNext, readFromIndex:_readFromIndex, // state
    windowScrollOnMsgCreate, isMessageCreating, isRefreshedAfterMC, 
    numOfDeletedMsgs,
    ...props}) => {  // other props

    // let cantApplyGetMessages = false; // if we yet dont change isFetching but useEffect is going to change it before component will be refreshed
    // ---------------------------------BLOCK FIRST FETCHING
    // populate current chat data and messages (state->useEffect->function)
    
    // const gccD = useRef(null)
    // // check getCurrentChatData
    // useEffect(()=>{
    //     if(gccD.current!==null){
    //         console.log('check gccd')
    //         // console.log(gccD.current.kek ==='old') // should be old (not undef)
    //         console.log(gccD.current === getCurrentChatData)
    //     }
    //     return () => {gccD.current = getCurrentChatData}// gccD.current - will change for old render  so allis okay))); gccD.current.kek = 'old';} // dont it use old render gccD.current ????
    // },[getCurrentChatData])

    const [oldMsgsDonwload, setOldMsgsDonwload] = useState(false, 'oldMsgsDonwload'); 
    const [preFetch, setPreFetch] = useState(false, 'preFetch');  /// +
    const [selectedMember, setSelectedMember] = useState(null, 'selectedMember') /// using in child functions (so dont check it now)   -
    const [refToTopAtStart, setRTTAS] = useState(true,  'refToTopAtStart')  ///
    const [positioningScrollRefScroll, setPSRS] = useState(false, 'positioningScrollRefScroll') 
    
    // old message download positional scrol ref
    const refOMDPSR = useRef(null) // this ref node always had loadOldMsgsDiv part of oclass ( we can write here not only node, but object {'node':node, classPart:'loadOldMsgsDiv'})
    const refAtStart = useRef(null) // ref -> refAtStart
    // refferenced to the tag on top of msgs div (if there is some msgs to download exists)
    // TODO delete
    const refToObserve = useRef(null) // from refAtStartCB and 

    const [refreshIsRunning, setRIR] = useState(false)


    // const [loadingOnScroll, setLoadingOnScroll] = useState(true) // _readFromIndex !=== _readFromIndexNext

    // const getMessagesCB = useCallback( async (RFI) => (await getMessages(_chatTypeId, _chatId, RFI, _firstOfSetOfMsgsId )),
    //                                     [ _chatTypeId, _chatId, _firstOfSetOfMsgsId, getMessages ] ) // _prop - mean its from props descruct


    // const getRefreshMessagesCB = useCallback( async () => (await getMessagesCB( _readFromIndex )),  [_readFromIndex, getMessagesCB ] ) // _prop - mean its from props descruct

    // const getOLDMessagesCB = useCallback( async () =>   (await getMessagesCB( _readFromIndexNext )), [ _readFromIndexNext, getMessagesCB ] ) // _prop - mean its from props descruct



    const refLastMsg = useRef(null)

    // const wSOMC = useRef(windowScrollOnMsgCreate) // will be last value of prop ( e.i. if we cleanup it data we will check newest data from props to not run it action more then should)
    useEffect(() => {
        // еси не успел исполнится эффект а юзер закрыл страницу - зануляем значение windowScrollOnMsgCreate в редаксе // но по идее этот то пропс будет слепком из прошлого рендера ( потому и будет тру - тоесть иногда мы мб будем зря занулять)
        if(isRefreshedAfterMC){
            if(refLastMsg.current){
                refLastMsg.current.scrollIntoView()
            } else {
                console.log('some wierd error in ref creating for last msg after creation')
            }
            isRefreshedAfterMC && setRefreshMessageCreating(false)
            // isRefreshedAfterDM && setRefreshAfterDM(false)
        }
        // return () => {if(windowScrollOnMsgCreate === true){shouldWindowScrollDown(false)}}
    },[setRefreshMessageCreating, isRefreshedAfterMC]) // setRefreshAfterDM

    // const [state, dispatch] = useReducer(reducer, initialState);
    // const { count, step } = state;



    // console.log('refToTopAtStart')
    // console.log(refToTopAtStart)
    // ref={refToObserve} renderring first of all callback refs => so to run it like last -> should add observer after refs operated

    useEffect(()=>{

        let node = null;

        const thresholdArray = steps => Array(steps + 1)
            .fill(0)
            .map((_, index) => index / steps || 0)

        const handleIntersect = (entries, observer) => { // its async??? // no its callback!
            entries.forEach(entry => {
                const isIntersecting = entry.isIntersecting 
                console.log('only after scroll calling')
                if(isIntersecting){ 
                    // debugger
                    console.log('intersetcion of target(should be true) ')
                    // console.log(refToObserve.current)
                    // console.log(entry.target)
                    // console.log(entry.target === node) // can be different if was refreshed after observer created
                    console.log("TOP DIV VIEWED: " + entry.target.innerText) // refToObserve.current.innerText
                    // entry.target.className = entry.target.className.replace(/[^\s]*loadOldMsgsDiv[^\s]*/g, ''); // change whole className but regex will take only a part of className (approp class)
                    observer.unobserve(entry.target)
                    
                    setOldMsgsDonwload(true) // toggle proccess for loading old msgs
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersect, {threshold: thresholdArray(2)})


        
        if(refToObserve.current && preFetch && ((!positioningScrollRefScroll && !oldMsgsDonwload) || (refToTopAtStart))){ 
            node = refToObserve.current
            observer.observe(node); // its event.target
        }


        return () => node !==null && observer.unobserve(node);
    }, [positioningScrollRefScroll, oldMsgsDonwload, refToTopAtStart, preFetch])// it will call every render and it okay//,[setOldMsgsDonwload, preFetch, refToTopAtStart]) 


    // /// here
    // // by the way there is no deps (setOldMsgsDonwload creating only 1 time for all renders) => so UC(PSRCB) cant start using UC(PSR) cause setOldMsgsDonwload stay the same
    // const refToObserveCB = useCallback( () => { // we write it mutable var to var node
    //     // refToObserve.current = node //  to check after (so it should written in refToObserve.current to be the ref of observing)
    //     debugger
    //     console.log('only after other CB-s calling')
    //     if(refToObserve.current){


    //         const thresholdArray = steps => Array(steps + 1)
    //         .fill(0)
    //         .map((_, index) => index / steps || 0)

    //         const handleIntersect = (entries, observer) => { // its async??? // no its callback!
    //             entries.forEach(entry => {
    //                 const isIntersecting = entry.isIntersecting
    //                 debugger
    //                 console.log('only after scroll calling')
    //                 if(isIntersecting){ 
    //                     debugger
    //                     console.log('intersetcion of target(should be true) ')
    //                     // console.log(refToObserve.current)
    //                     // console.log(entry.target)
    //                     console.log(entry.target === refToObserve.current) // can be different if was refreshed after observer created
    //                     console.log("TOP DIV VIEWED: " + entry.target.innerText) // refToObserve.current.innerText
    //                     // entry.target.className = entry.target.className.replace(/[^\s]*loadOldMsgsDiv[^\s]*/g, ''); // change whole className but regex will take only a part of className (approp class)
    //                     observer.unobserve(entry.target)
                        
    //                     setOldMsgsDonwload(true) // toggle proccess for loading old msgs
    //                 }
    //             })
    //         }

    //         const observer = new IntersectionObserver(handleIntersect, {threshold: thresholdArray(2)})
    //         observer.observe(refToObserve.current); // its event.target


    // }
    // },[setOldMsgsDonwload, preFetch, refToTopAtStart]) // refToObserve


    // // oldMsgsDonwload -it after psrCB changed  /// isShouldCall = ref={(event) => ( positioningScrollRef(event.target, positioningScrollRefScroll && !oldMsgsDonwload))}
    // const OMD_PSR_CB = (node, isShouldCall) =>{
    //     // (node, isShouldCall) => { // do it only once when page loading
    //     debugger
    //     // console.log('positioningScrollRef check')
    //     // if node===null -> it called only cause of some wierd problem (after it setRTTAS(false) => should be alqays refToTopAtStart=false     TIP I DONT KNOW WHY IT NOT LIKE THAT )
    //     if(node && isShouldCall){ // data loaded to redux but not scrolled element yet
    //         debugger
    //         refOMDPSR.current = node
    //         // console.log('positioningScrollRef')
    //         refOMDPSR.current.scrollIntoView()
    //         refToObserveCB()
    //         // psrCB(refPS.current)
    //     }
    // }
        
        // })(node, positioningScrollRefScroll && !oldMsgsDonwload)
            
        // , [refOMDPSR, positioningScrollRefScroll, oldMsgsDonwload, preFetch, refToObserveCB])//, createRefObserver]) 
    // positioningScrollRefScroll - is scroll should be?  -  that triggered in fetchOldMsgs setPSRS(true),  
    // props.oldMsgsDonwload - are old msgs downloading now?  - that triggered in useEffect(IO) setOldMsgsDonwload(true),  (should be not loaded now to trigger it after in useEffect(IO))
    // it settled false after fetchMoreOldMsgs is done


    // props.currentChat.firstNewMsgID === null -> scrool not to the top ( but to the first new msgs) (here will be refToTop)
    // else  -> scrool to the top  (here will be refToTop)
    // like: ref={(event)=>refToTop(event.target, (props.currentChat.firstNewMsgID === null),  refToTopAtStart)}


    // only if re-render div element will be called this callback
    // call second time cause setRTTAS not chenging yet 

    // we use new CB if preFetch changing, otherwise we use old func with old global vars (good choice to use old render vars (exxclude useRefs))
    // use refToTopAtStart to get curr render data if not positionized view yet
    // const refAtStartCB = useCallback(function pizdezAtStart(node, isScrollingToTheTop, rttas) //  props.currentChat.firstNewMsgID === null
    //     { // refToTopAtStart === isPositioning
    //     debugger
    //     console.log('not more then 2 times')
    //     if(preFetch && rttas){
    //     // ((node, isScrollingToTheTop, isPositioning) => { // do it only once when page loading
    //     // console.log('check wht inside node') // change TODO here
    //     // console.log(node);
    //     // console.log(refAtStart.current)
    //     if(node){
    //         // console.log('refAtStartCB check')
    //         refAtStart.current = node
    //         if (isScrollingToTheTop) {
    //             refAtStart.current.scrollTop = refAtStart.current.scrollHeight  
    //         } else {
    //             refAtStart.current.scrollIntoView()
    //         }
    //         refToObserveCB()
    //         setRTTAS(cd=>!cd) // useEffect to loadOldMsgs (just create observer on such ref where it belong (refPS))
    //     }
    // } // because refAtStart.current became null run 2-nd time (((((refAtStart.current)))))
    // // )(node, isScrollingToTheTop, rTTAS)
    // // }


    // }
    // // refToTopAtStart // refToObserveCB
    // , [  preFetch, refToObserveCB ])//refAtStart // first call refToTopAtStart == true // second - false











// object in useRef is persist for all life of component 

























// made useEffect for observing


    const ULTIMATE_CALLBACK = (nodeToScrollType, nodeToScroll, conditionNTS, nodeToObserve)=> {
        if(nodeToScroll ==null) return 
            if(nodeToScrollType==='start'){
                // debugger
                if(conditionNTS){
                    nodeToScroll.scrollTop = nodeToScroll.scrollHeight  
                } else {
                    nodeToScroll.scrollIntoView()
                } 
                // refToObserveCB()
                setRTTAS(false)
            } else {
                if(conditionNTS){
                    debugger
                    nodeToScroll.scrollIntoView()
                    setPSRS(false)
                }
            }
    }

    // setRTTAS, refToObserveCB 



    useEffect(() => { ////////////////////////////////////////////// (PF)
        console.log('should run 2 times only (preFetch)') 
        if( !preFetch ){//&& !props.IsFetchingMsgs){ 
            const populatePreFetchData = async() => {
                await getCurrentChatData();
                setPreFetch(true);
            }
            populatePreFetchData();
        }
    }, [preFetch, getCurrentChatData])


    
    
    
    // chatTypeId, chatId, readFromIndex, firstOfSetOfMsgsId   // positioningScrollRefScroll - if started the process of that will start oldMsgsDownload then => end oldMsgsDownload => end positioningScrollRefScroll
    
    
    // и после того как отпозиционируется скрол после загрузки старых сообщений тоже
    // потому добавляем positioningScrollRefScroll
    useEffect(() => {/////////////////////////////////////////////////// (RD)
            // if(preFetch) {
            let sTOID = null
            console.log("refreshIsRunning")
            console.log(refreshIsRunning)
            if(!refreshIsRunning){
            // sTOID = setTimeout( (async function(isShouldRunRefresh,  _readFromIndex, readFromIndexBefore, numOfDeletedMsgs){
            //     refreshIsRunning.current = true
            //     if( isShouldRunRefresh){
            //         // debugger
                    
            //         let currentdate = new Date(); 
            //         let datetime = "Last Sync: " + currentdate.getDate() + "/"
            //         + (currentdate.getMonth()+1)  + "/" 
            //         + currentdate.getFullYear() + " @ "  
            //         + currentdate.getHours() + ":"  
            //         + currentdate.getMinutes() + ":" 
            //         + currentdate.getSeconds();
            //         console.log(datetime)


            //         await getMessages(_chatTypeId, _chatId, _readFromIndex, readFromIndexBefore, null, (windowScrollOnMsgCreate && !isMessageCreating), numOfDeletedMsgs )
                    
            //     }
            //     refreshIsRunning.current = false


            // })(!oldMsgsDonwload && preFetch && !IsFetchingMsgs && !positioningScrollRefScroll, _readFromIndex, props.readFromIndexBefore, numOfDeletedMsgs ), 1500); // IIF run immidiatly - so (windowScrollOnMsgCreate && !isMessageCreating) - current data
            
            sTOID = setTimeout( async () => {
                // setRIR(true)
                if( !oldMsgsDonwload && preFetch && !IsFetchingMsgs && !positioningScrollRefScroll){
                    // debugger
                    setRIR(true)
                    let currentdate = new Date(); 
                    let datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
                    console.log(datetime)


                    await getMessages(_chatTypeId, _chatId, _readFromIndex, props.readFromIndexBefore, null, (windowScrollOnMsgCreate && !isMessageCreating), numOfDeletedMsgs )
                    setRIR(false)
                }
                // setRIR(false)
                // refreshIsRunning.current = false


            }
            , 1500);


        }


            return () => {
                sTOID !== null && clearTimeout(sTOID);
              };

            //  но функция то мы запускаем иммидиатли(потому значения oldMsgsDonwload - текущие!!!!)
        // if(!positioningScrollRefScroll && oldMsgsDonwload && !IsFetchingMsgs){ // если мы должны подгрузить старые сообщ + не грузится пока при рефреше сообщения, то запускаем асинх функцию
        }, [preFetch, oldMsgsDonwload, IsFetchingMsgs, positioningScrollRefScroll,
            _chatTypeId, _chatId, _readFromIndex, props.readFromIndexBefore, getMessages,
            windowScrollOnMsgCreate, isMessageCreating, numOfDeletedMsgs, refreshIsRunning]) //  for what oldMsgsDonwload ???? if msgs not fetching yet ( but process of getOLDMessagesCB is started ( but async so can не успеть зарундерится))
        // IsFetchingMsgs dont need (cause only 2 effects - FOM and RD -> if FOM processing (oldMsgsDonwload) => u can use RD and vise versa)


    
    // стоит ли numOfDeletedMsgs посылать и для обновления сообщений??? (наверн нет ( ибо полученных сообщений будет более 10 в любом случае))
    useEffect(() => { // (FOM)

        // const checkIdShouldLoadMsgs = (rfi, rfin) => { // _readFromIndexNext should alway be less then _firstOfSetOfMsgsId  === _readFromIndex 
        //     if(rfin === rfi){
        //         setLoadingOnScroll(false)  // if scrolled to the top - infinity scroll stop
        //     }
        //     // dispatch(setReadFromIndexMsgs(readFromIndex))
        //     // dispatch(setReadFromIndexNextMsgs(response.data.data.readFromIndexNext))
        // }


        if(!positioningScrollRefScroll && oldMsgsDonwload && !IsFetchingMsgs){ // если мы должны подгрузить старые сообщ + не грузится пока при рефреше сообщения, то запускаем асинх функцию
            const fetchOldMsgs = async() => { 
                await getMessages(_chatTypeId, _chatId, _readFromIndexNext, _readFromIndex )
                // setPSRS(false)
                setOldMsgsDonwload(false) 

                // if(_readFromIndexNext === _readFromIndex){
                //     setLoadingOnScroll(false) 
                // }
            }
            setPSRS(true)
            debugger
            fetchOldMsgs()
        }
        // написать отмену загрузки данных (сообщений с АПИ)
        // return () => {} // после того как заканчивается эффект в котором условие исполнилось но не успело заверишся действие 
    }, [IsFetchingMsgs, positioningScrollRefScroll, oldMsgsDonwload, setOldMsgsDonwload, setPSRS,
        _chatTypeId, _chatId, _readFromIndexNext, _readFromIndex, getMessages])
   
    // const rasCBCB1 = () => {
    //     if(props.currentChat.firstNewMsgID !== null && refToTopAtStart ) {  //  && refToTopAtStart - only for first positioning of scroll
    //         return (node) => (console.log('call refAtStartCB 1'), console.log(refToTopAtStart), refAtStartCB(node, props.currentChat.firstNewMsgID === null ))
    //     } else {
    //             return undefined 
    //         }
    // }

    // const rasCBCB2 = (newMsgId, rttas ) => {
    //     console.log('refAtStart.current')
    //     console.log(refAtStart.current);
        
    //     if(props.currentChat.firstNewMsgID === null && refToTopAtStart ) {  //  && refToTopAtStart - only for first positioning of scroll
    //         return (node) => (console.log('call refAtStartCB 2'), console.log(rttas), refAtStartCB(node, newMsgId === null, rttas ))
    //     } else {
    //             return undefined
    //         }
    // }


    // const OMD_PSR_CBCB = (msgId) => {
    //     if( msgId === props.readFromIndexBefore ) {  //  && refToTopAtStart - only for first positioning of scroll
    //         return (node)=>OMD_PSR_CB(node, positioningScrollRefScroll && !oldMsgsDonwload)
    //     } else {
    //             return undefined 
    //         }
    // }

    // const OMD_PSR_CBCB = (msgId) => {
    // if( msgId === props.readFromIndexBefore ) {  //  && refToTopAtStart - only for first positioning of scroll
    //     return (node)=>OMD_PSR_CB(node, positioningScrollRefScroll && !oldMsgsDonwload)
    // } else {
    //         return undefined 
    //     }
    // }


//|| props.oldMsgsDonwload
    if (!preFetch){ return <Preloader />} else {
        if(numOfDeletedMsgs > 0){
            console.log("numOfDeletedMsgs")
            console.log(numOfDeletedMsgs)
        }
        // console.log("props.readFromIndexBefore")
        // console.log(props.readFromIndexBefore)
        // console.log(numOfDeletedMsgs)
        // console.log("props.firstOfSetOfMsgsId")
        // console.log(_firstOfSetOfMsgsId)
    // console.log('only now will render page')
    // console.log(props.currentChat)
    // refToObserve прописалась заранее и исользуется терь всегда!!!
    // ----------Get Older Messages----------
    let beforeMsgsDiv = (_readFromIndexNext !== _readFromIndex) ? (<div className={`${styleMessages.loadOldMsgsDiv}`} ref={refToObserve}></div>) : 
                                                (<div className={`${styleMessages.startChatDiv}`}>----------Chat Start----------</div>)

    // но после каждого updateUnreadMsgs - props.messages[index-1].msgViewed === true - потому делаем апдейт только после  выхода из чата ( в локалстейте хранится индекс последнего сообщения прочитанного и по нему обновление идет)
    
    // let mappedMessages = props.messages.map(msg => msg.id === props. ? (msg['positioningScroll']=true, console.log(`\n\n\nHERE WE GO msg.id = ${msg.id}`), msg) : msg)
    let messages = props.messages.map((msg, index) => 
                                        {
                                            let dataToMsg = {msg:msg, getFile:props.getFile, _chatId:_chatId, _chatTypeId:_chatTypeId,
                                                editMessageRequest:props.editMessageRequest, deleteMessageRequest:props.deleteMessageRequest}

                                            if(props.currentChat.firstNewMsgID!==null && props.currentChat.firstNewMsgID <= msg.id && (index === 0 || props.messages[index-1].id < props.currentChat.firstNewMsgID ))
                                            {// return list of 2 elems
                                                return getMessageTagWithRef(dataToMsg, (msg.id === props.readFromIndexBefore && positioningScrollRefScroll ? refOMDPSR : undefined),
                                                true,  (props.currentChat.firstNewMsgID !== null && refToTopAtStart ? refAtStart : undefined))
                                            } else {
                                                if(index === props.messages.length - 1){
                                                    // if message already created and we should after that scroll -> do that then discard wsomc value to false 
                                                    return getMessageTagWithRef(dataToMsg, (isRefreshedAfterMC  ? refLastMsg : undefined))
                                                } else {
                                                    return getMessageTagWithRef(dataToMsg, (msg.id === props.readFromIndexBefore && positioningScrollRefScroll ? refOMDPSR : undefined))
                                                }
                                            }
                                            }).flat()  // if we create newMsgsStartTag additional tag
    messages.unshift(beforeMsgsDiv) // add div before first msg                                           
    if(messages.length < 3){ // сообщений становится ноль после удаления (иногда) - после этого надо запустить процес прогрузки старых сообщений 
        debugger
    }
    const prefetchOper = (method, chatTypeId, chatId) => (selectedMemberId)  => () => method(chatTypeId, chatId, selectedMemberId)
    let memberOpers = [{method: props.toogleMemberStatus, name: 'Toogle Member'}, {method: props.removeMemberMsgs, name: 'Remove All Member Messages'}, {method: props.removeMember, name: 'Remove Member'}]
    let chatUsersIds = props.currentChat.members.map(member => member.id)

    
    let members = _chatTypeId === 1 
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
        props.fWAUFC.data !== null  && 
        <div className={styleChats.addMember}>
            <SelectMemberToChat addMember={props.addMember} chatTypeId={_chatTypeId} chatId={_chatId} chatUsersIds={chatUsersIds} 
            fWAUFC={props.fWAUFC} clearCurrentFocusedWindow={props.clearCurrentFocusedWindow} />
        </div>
        } 
        <div className={styleMessages.currentChat}>
            
                <Members members={members} 
                membersShow={props.fWMFC.data} 
                memberOperShow={props.fWMOFC.data} 
                selectedMember={selectedMember}
                memberOpers={memberOpers
                    .map(memberOper => ({...memberOper, 
                        method: prefetchOper(memberOper.method, _chatTypeId, _chatId) }))}/>
 
            <div className={styleMessages.chatsHeader}>
                <div className={styleMessages.chatsHeaderPhoto}> {props.currentChat.chatPhoto.small !== null ? <img src={props.currentChat.chatPhoto.small} /> : <div className={styleMessages.chatsHeaderPhotoAlt}>chatPhotoSmall</div>}</div>
                <div className={styleMessages.chatsHeaderName}>{props.currentChat.name}</div>
                <div className={styleMessages.chatsHeaderSettings}>
                    Settings
                    <div className={styleMessages.chatsSettings}>
                    { _chatTypeId === 1 &&
                        <>
                            <div className={styleMessages.chatsSettingsItem}>
                                {props.fWAUFC.data === null  &&
                                    <a className={styleChats.getMemberList}
                                        onClick={
                                            (event) => (event.stopPropagation(), props.addFocusedWindow(props.fWAUFC.id, [_chatTypeId, _chatId]))
                                         }
                                        > 
                                            Add Member
                                        </a>
                                }
                            </div>
                            <div className={styleMessages.chatsSettingsItem}>
                                <div className={styleMessages.chatsSettingsItemH}>Change Photo</div>
                                <ChangeChatPhoto msgStyle={styleMessages.chatsSettingsItemForm} setChatPhotoRequest={props.setChatPhotoRequest} chatTypeId={_chatTypeId} chatId={_chatId} />
                            </div> 
                            <div className={styleMessages.chatsSettingsItem}>
                            <div className={styleMessages.chatsSettingsItemH}>Rename Chat</div>
                                <RenameChat msgStyle={styleMessages.chatsSettingsItemForm} renameChatRequest={props.renameChatRequest} chatTypeId={_chatTypeId} chatId={_chatId}/>
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
 
            {/* event or event.target TODO*/}
            
        <div className={styleMessages.messages} ref={
            // delete this ref if refToTopAtStart is already precced before (cause we dont nedd to posit again) so use """&& refToTopAtStart"""
            // rasCBCB1(props.currentChat.firstNewMsgID , refToTopAtStart) /// ref={undefined} -> знач что наша ссыль оставила привзяку на старого рендера елемент(тег)
            props.currentChat.firstNewMsgID === null && refToTopAtStart ? refAtStart : undefined }>
                {messages}
                {/* <h1>{refToTopAtStart + 'is it okay refToTopAtStart ??????'}</h1> */}
        </div>
        <h3 className={styleMessages.trash} ref={() => ULTIMATE_CALLBACK( refToTopAtStart ? 'start' : 'notStart',
                            refToTopAtStart ? refAtStart.current : refOMDPSR.current, 
                            refToTopAtStart ?  props.currentChat.firstNewMsgID === null : positioningScrollRefScroll && !oldMsgsDonwload,
                             refToObserve.current)}>Trash</h3>

        {/* 11111111111111111111111111111111111111111111111111111*/}
        {/* 
        
        
        
        
        
        
        
        */}
        {/* when all ref tag elems rendered call it -> to make operations over that refs */}
        
        <div className={styleMessages.createMessageForm}><CreateMessage chatTypeId={_chatTypeId} chatId={_chatId} isAuth={props.isAuth}/></div>


            
        </div>
        </>
            )
        }
}

// if refToTopAtStart === true - yet не успел перерендерится refToTopAtStart-фолс - но еффект ща действует и 
// !positioningScrollRefScroll && !oldMsgsDonwload || !refToTopAtStart

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
    readFromIndexBefore: state.chatsPage.readFromIndexBefore,
    // loadingOnScroll: state.chatsPage.loadingOnScroll,
    IsFetchingMsgs: state.chatsPage.IsFetchingMsgs,

    // oldMsgsDonwload: state.chatsPage.oldMsgsDonwload,

    // firstOfSetOfMsgsId: state.chatsPage.firstOfSetOfMsgsId, 
    // firstOfLastSetOfMsgsId: state.chatsPage.firstOfLastSetOfMsgsId,
    // firstNewMsgID: state.chatsPage.firstNewMsgID,

    windowScrollOnMsgCreate: state.chatsPage.windowScrollOnMsgCreate,
    isMessageCreating: state.chatsPage.isMessageCreating,
    isRefreshedAfterMC: state.chatsPage.isRefreshedAfterMC,
    // isRefreshedAfterDM: state.chatsPage.isRefreshedAfterDM,
    numOfDeletedMsgs: state.chatsPage.numOfDeletedMsgs,
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
                                setRefreshMessageCreating,
                                // setRefreshAfterDM,
                                // setOldMsgsDonwload, 
                                // fetchMoreOldMsgs,
                                // downloadFile,
                            }),
    withRouter
)(ChatDetail)

 

// pre render page effect useLayoutEffect
// post render page effect useEffect