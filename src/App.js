import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
// import Profile from './components/Profile/Profile';
import { Route, withRouter } from "react-router-dom";
import ChatsContainer from './components/Chats/ChatsContainer';
import UsersContainer from './components/Users/UsersContainer';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import UpdateProfile from './components/Profile/UpdateDeleteProfile/UpdateProfile';
import Preloader from './components/common/Preloader/Preloader';
import { initializeApp, clearAllFocusedWindows } from './redux/app-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ChatDetail from './components/Chats/ChatItem/ChatDetail';
import { useAllFocusedElems, useRefactorPopUp } from './customHooks/focusedElems';



import messageStyles from './components/Chats/Message/Message.module.css';


// import SignUpContainer from './components/Auth/SignUpContainer';
// import Logout from './components/Auth/Logout';

// import Cookies from 'js-cookie';
// import { login } from './redux/auth-reducer';


// // if not initilized ( cant get getAuthData - )
// class AppContainer extends React.Component{
//         componentDidMount() {
//                 // проверка на обновление токена, чтобы не было запросов на других страницахс не валидным токеном и не перебрасывало в итоге на логин форм - а потом обратно на профайл
//                 this.props.initializeApp();
//         }
//         render(){
//                 if((!this.props.initialized)) return <Preloader/>
//                 return (<div className='app-wrapper'>
//                         <Header />
//                         <Navbar />
//                         <div className='app-wrapper-content'>
//                         <App/>
//                         </div>
//                 </div>)
//         }
// }


const App = React.memo((props) => {
        // const [membersShow, setMembersShow, memberOperShow, setMemberOperShow, usersForChatShow, setUsersForChatShow, userForChatShow, setUserForChatShow] = useAllFocusedElems()

        // const classToBlur = '';

        // const classToFocus = messageStyles.usersForChatActive;
        // useRefactorPopUp
                // console.log(event.target)
                // debugger
                
                // console.log(event.tagret.value)
                // console.log(event.tagret.classList)
                // console.log(event.tagret.classList.contains(classToFocus))
                // console.log(event.tagret.classList.contains('usersForChatActive'))
                // event.tagret.classList.contains('usersForChatActive') && event.tagret.classList.toggle('usersForChatActive') 

        // const unfocusWindows = () => { 
        //         props.clearFocusedWindows()   
        // }




        // const falseAllFocusedElems = () => {
        //         setMembersShow(false)
        //         setMemberOperShow(false)
        //         setUsersForChatShow(false)

        //         setUserForChatShow([])// int to bool false
        // }
        // const toogleFocuseElem = (method, elem) => (event) => {
        //         // console.log(event.target)
        //         // console.log(elem)
        //         event.stopPropagation()
        //         method(!elem)
        // }

        // const toogleFocuseElemArr = (method,newData) => (event) => {
        //         // console.log(event.target)
        //         console.log('hereerere')
        //         event.stopPropagation()
        //         method(newData)
                
        // }

        // const toogleFocuseElem = (method, elem) => (event) => {
        //         console.log(event.target)
        //         console.log(elem)
        //         event.stopPropagation()
        //         method(!elem)
        // }

        console.log('rerender')
        console.log(props.initialized)
        useEffect(() => {props.initializeApp()}, [])
        if((!props.initialized)) return <Preloader/>
        return (
                <div className='whole-app-page-wrapper' onClick={()=>{ props.clearAllFocusedWindows()   }}>
                <div className='app-wrapper'>
                        <Header />
                        <Navbar />
                        <div className='app-wrapper-content'>
                        <Route path='/profile/:userId?'
                                        render={() => <Profile />} />
                        <Route path='/profile_update'
                                render={() => <UpdateProfile />} />
                        <Route path='/login' render={() => <Login />} />
                        <Route path='/users'
                                render={() => <UsersContainer />} />
                        <Route exact path='/chats'
                                render={() => <ChatsContainer  
                                                                // usersForChatShow={usersForChatShow} 
                                                                // setUsersForChatShow={setUsersForChatShow}

                                                                // userForChatShow={userForChatShow} 
                                                                // setUserForChatShow={setUserForChatShow}

                                                                // toogleFocuseElem={toogleFocuseElem}
                                                                // toogleFocuseElemArr={toogleFocuseElemArr}



                                                                // blurFocusedWindow={blurFocusedWindow}
                                                                />} />
                        <Route path='/chats/:chatType/:name?'
                                render={() => <ChatDetail 
                                        // setMembersShow={setMembersShow} membersShow={membersShow} 
                                        //         setMemberOperShow={setMemberOperShow} memberOperShow={memberOperShow}
                                                // toogleFocuseElem={toogleFocuseElem}

                                                // toogleFocuseElemArr={toogleFocuseElemArr}
                                                

                                                // userForChatShow={userForChatShow} 
                                                // setUserForChatShow={setUserForChatShow}
                                                                />} />
                        </div>
                </div>
                </div>

        )
})

const mapStateToProps = (state) => ({
        initialized: state.app.initialized,
});

export default compose(
        withRouter,
        connect(mapStateToProps, {initializeApp,
                clearAllFocusedWindows
        })
 )(App);


//  {/*<div className='app-wrapper'>
//                         <Header />
//                         <Navbar />
//                         <div className='app-wrapper-content'>*/}
//                                 {/* <Route path='/dialogs'
//                                         render={() => <DialogsContainer />} /> */}
//                                         <Route path='/profile/:userId?'
//                                         render={() => <Profile />} />
//                                 <Route path='/profile_update'
//                                         render={() => <UpdateProfile />} />
//                                 {/* <Route path='/users'
//                                         render={() => <UsersContainer />} /> */}

//                                 <Route path='/login'
//                                         render={() => <Login />} />
//                                 {/* <Route path='/signup'
//                                         render={() => <SignUpContainer />} /> */}
//                                 {/* <Route path='/logout'
//                                         render={() => <Logout />} /> */}
//                         {/*</div>
//                 </div>*/}