import React, { useState, useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { Input, TextArea, createField } from '../common/FormsControls/FormsControls';
import { maxLength30, maxLength50, maxLength200 } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { addPost, deletePost, getUserProfile, updateUserProfile, deleteUserProfile, updateStatus, updatePhoto} from '../../redux/profile-reducer';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import styles from '../common/FormsControls/FormsControls.module.css'

import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import { compose } from 'redux';
import withAuthRedirect from '../../hoc/WithAuthRedirect';
import MyPosts from './MyPosts/MyPosts';
import Preloader from '../common/Preloader/Preloader';
import { useForbidUnsafeMethods } from '../../customHooks/reduceUnsafeMethods';

const ProfileContainer = (props) => {

    const [exchangeNotSafeMethods, setExchangeNotSafeMethods, shown, setShown, reduceMethods] = useForbidUnsafeMethods()

    useEffect(() => { 
        const fetchData = async() => {
        // debugger
        let userId = props.match.params.userId;
        if (!userId) {
            userId = props.userId; // getting from withAuthRedirect
            if (!userId) {
                // return <Redirect to='/login'/>
                props.history.push('/login')
            }
            exchangeNotSafeMethods && setExchangeNotSafeMethods(false)
        }
        else {
            if (props.userId !== parseInt(userId)) {
                // нельзя изменять (ибо не наша страница)
                !exchangeNotSafeMethods && setExchangeNotSafeMethods(true)
            } else {
                exchangeNotSafeMethods && setExchangeNotSafeMethods(false)
            }
        }
        
        await props.getUserProfile(userId);
        // debugger
        setShown(true)
        }
        fetchData();
    }, [props.match.params.userId])
    

    if(!shown) return <Preloader/>
    return (
        // {this.props.tokenError) ? <Login/>}
        <div className={s.profile_wrapper}>
            <ProfileInfo profile={props.profile} updateStatus={reduceMethods(props.updateStatus)} updatePhoto={reduceMethods(props.updatePhoto)} ENSM={exchangeNotSafeMethods}/>
            {!exchangeNotSafeMethods && <div className=''><MyPosts/> <NavLink to={'/profile_update'}>Update My Profile</NavLink><button onClick={props.deleteUserProfile}>Delete My Profile</button> </div> }
            
        </div>

    )

}
// status is already in profile.status => so we dont need to store it out profile instance in state

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,// for WithAuthRedirect
});
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, updateStatus, updatePhoto, deleteUserProfile, updateUserProfile}), // getPhoto == 
    withRouter
)(ProfileContainer)
