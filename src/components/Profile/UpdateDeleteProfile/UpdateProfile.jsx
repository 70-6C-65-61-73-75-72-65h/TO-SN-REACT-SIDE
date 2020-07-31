import React, { useEffect, useState } from 'react';
import { reduxForm } from 'redux-form';
import { Input, TextArea, createField } from '../../common/FormsControls/FormsControls';
import { maxLength30, maxLength50, maxLength200 } from '../../../utils/validators/validators';
import { connect } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../../../redux/profile-reducer';
import { Redirect, withRouter } from 'react-router-dom';
import styles from '../../common/FormsControls/FormsControls.module.css'
import withAuthRedirect from '../../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import backupQuotes from '../../common/utils/backupQuotes';
import Preloader from '../../common/Preloader/Preloader';

const UpdateProfileForm = props => {
    const [lFAJ, setLFAJ] = useState(props.profile.lookingForAJob)
    const toggleLFAJ = () => lFAJ ? setLFAJ(false) : setLFAJ(true)

    // если даже тупо просто дотронемся до любого из полей - то можна будет отправить на сервак как якобы измененное значение ( хотя его и не изменяли )
    const { handleSubmit, pristine, reset, submitting, error, profile } = props
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Name</label>
            {createField(profile.name, 'name', Input, [maxLength30], {defaultValue: profile.name})}
            <label htmlFor="">Status</label>
            {createField(profile.status, 'status', TextArea, [maxLength200], {defaultValue: profile.status})}
            {/* photos */}
            <h3>Photos</h3>
            <h4>Large</h4>
            {createField(profile.photos.large, 'photos_large', Input, null, {defaultValue: profile.photos.large})} {/*here we just write urls to ours photos -> should be subs to uploading blobs or files*/}
            <label htmlFor="">Small</label>
            {createField(profile.photos.small, 'photos_small', Input, null, {defaultValue: profile.photos.small})}
            <label htmlFor="">Are you looking for A job?</label>
            {createField(profile.lookingForAJob , 'lookingForAJob', Input, null, {type: "checkbox", checked: lFAJ, onClick: toggleLFAJ })} {/* true-false*/}
            <label htmlFor="">Make a small description for a job you are looking for</label>
            {createField(profile.lookingForAJobDescription, 'lookingForAJobDescription', TextArea, [maxLength200], {defaultValue: profile.lookingForAJobDescription})}
            <label htmlFor="">Fullname</label>
            {createField(profile.fullname, 'fullname', TextArea, [maxLength200], {defaultValue: profile.fullname})}
            {/* contacts */}
            <h3 >Contacts</h3>
            <h4>github</h4>
            {createField(profile.contacts.github, 'contacts_github', Input, [maxLength50], {defaultValue: profile.contacts.github})}
            {createField('vk', 'contacts_vk', Input, [maxLength50], {defaultValue: profile.contacts.vk})}
            {createField('facebook', 'contacts_facebook', Input, [maxLength50], {defaultValue: profile.contacts.facebook})}
            {createField('instagram', 'contacts_instagram', Input, [maxLength50], {defaultValue: profile.contacts.instagram})}
            {createField('twitter', 'contacts_twitter', Input, [maxLength50], {defaultValue: profile.contacts.twitter})}
            {createField('website', 'contacts_website', Input, [maxLength50], {defaultValue: profile.contacts.website})}
            {createField('youtube', 'contacts_youtube', Input, [maxLength50], {defaultValue: profile.contacts.youtube})}
            {createField('mainLink', 'contacts_mainLink', Input, [maxLength50], {defaultValue: profile.contacts.mainLink})}

            {
            error && 
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }

            <div className=''>
                <button type='submit' disabled={pristine || submitting} >Update</button>
            </div>
            <div className=''>
                <button type='button' disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}
// if only for the first render i would use  {form: ... , initialValues: {}}
const UpdateProfileReduxForm = reduxForm({form: 'updateProfile'})(UpdateProfileForm)

const UpdateProfile = props => {

    useEffect(()=>{props.getUserProfile(props.userId)}, []) //  если изменяется профайл - мы делаем эффект по получению профала из АПИ props.profile
    
    let [profileRedirect, setProfileRedirect] = useState(false);
    // те из полей полученных из формы 
    // которые не равны полям из пропсов добавляем в список и отправляем 
    // ( чтобы на апи изменялось только соответствующее знаение а не все 
    //     (будет удобно, когда будем загружать изображения и файлы  а не ссылки))
    let addProfleFilledProperty = (obj, key, prop) => { 
        let subObjects = ['contacts', 'photos']
        if(subObjects.every(start => !key.startsWith(start))){
            obj[key] = prop
        } 
        else {
            subObjects.map(start => 
                {if(key.startsWith(start)){
                    obj[start] = {}
                    obj[start][key.split('_')[1]] = prop
                    }
                    return true
                })
            }
    } 
    const onSubmit = (formData) => {
        // console.log(profileRedirect)
        let profileData = {}
        for(let profProp in formData){
            addProfleFilledProperty(profileData, profProp, formData[profProp])
        }
        Object.keys(profileData).map(data => {
            if(['contacts', 'photos'].includes(data)){
                profileData = {...profileData, [data]: backupQuotes(Object.keys(props.profile[data])
                    .reduce((res, key) => (res[key] = (key in profileData[data] ? profileData[data][key]: props.profile[data][key]), res ), {}))}
            }
        })
        props.updateUserProfile(profileData)
        setProfileRedirect(true)
    }
    // then redirect to profile page (add to store isProfileUpdated: true) // or right after submit redirect 

    
    if (profileRedirect) return <Redirect to='/profile' />
    if (!props.profile) return <Preloader/>
    return (
        
        <div className=''>
            <h2 className=''>Profile Data Changing</h2>
            <UpdateProfileReduxForm onSubmit={onSubmit} profile={props.profile}/>
        </div>
    )
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,// for WithAuthRedirect
});
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {updateUserProfile, getUserProfile}),  // getUserProfile
    // withRouter
)(UpdateProfile)
