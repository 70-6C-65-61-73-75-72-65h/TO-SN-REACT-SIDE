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
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ChatDetail from './components/Chats/ChatItem/ChatDetail';
import { useAllFocusedElems } from './customHooks/focusedElems';

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
        const [membersShow, setMembersShow, memberOperShow, setMemberOperShow, usersForChatShow, setUsersForChatShow] = useAllFocusedElems()

        const falseAllFocusedElems = () => {
                setMembersShow(false)
                setMemberOperShow(false)
                setUsersForChatShow(false)
        }
        const toogleFocuseElem = (method, elem) => (event) => {
                // console.log(event.target)
                // console.log(elem)
                event.stopPropagation()
                method(!elem)
        }

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
                <div className='whole-app-page-wrapper' onClick={()=>{falseAllFocusedElems()}}>
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
                                render={() => <ChatsContainer  usersForChatShow={usersForChatShow} 
                                                                setUsersForChatShow={setUsersForChatShow}
                                                                toogleFocuseElem={toogleFocuseElem}/>} />
                        <Route path='/chats/:chatType/:name?'
                                render={() => <ChatDetail setMembersShow={setMembersShow} membersShow={membersShow} 
                                                setMemberOperShow={setMemberOperShow} memberOperShow={memberOperShow}
                                                toogleFocuseElem={toogleFocuseElem}/>} />
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
        connect(mapStateToProps, {initializeApp})
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