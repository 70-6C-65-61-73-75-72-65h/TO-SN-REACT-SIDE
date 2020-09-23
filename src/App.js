import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
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


const App = React.memo((props) => {

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
                                render={() => <ChatsContainer  />} />
                        <Route path='/chats/:chatType/:name?'
                                render={() => <ChatDetail  />} />
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
