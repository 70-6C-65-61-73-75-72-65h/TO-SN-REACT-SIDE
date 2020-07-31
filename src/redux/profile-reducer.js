import {profileAPI, authAPI} from "../api/api";
import { stopSubmit } from "redux-form";
import replaceQuotes from "../components/common/utils/quotes";
import authReducer from "./auth-reducer";
// import backupQuotes from "../components/common/utils/backupQuotes";
// const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// const SET_USER_PROFILE = 'SET_USER_PROFILE';
// const SET_USER_JWTTOKEN = 'SET_USER_JWTTOKEN';
// const SET_SELF_USER_ID = 'SET_SELF_USER_ID';


// must be 8
const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const UPDATE_PROFILE = 'UPDATE_USER_PROFILE';
// const DELETE_PROFILE = 'DELETE_USER_PROFILE';

const SET_STATUS = 'SET_STATUS';
const SET_PHOTO = 'SET_PHOTO';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    // newPostText: 'it-kamasutra.com',
    profile: null,
    status: ""
};


const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        // when we update subobject - we just add other old subproperties that dont updated 
        case UPDATE_PROFILE: { // нет проверки на правильность ключей (имен полей обьекта профайл) - если на серваке прошло, то точно верны все ключи по идее
            return {...state,
                    profile: 
                    {...state.profile,
                    ...action.profileData,
                    photos: {...state.profile.photos, ...action.profileData.photos},
                    contacts: {...state.profile.contacts, ...action.profileData.contacts}
                    }
                }
        }
        // case DELETE_PROFILE: {
        //     return {...state, posts: [], profile: null, status: ''}
        // }

        case SET_STATUS: {
            // return {...state, status: action.status}
            return {...state, profile: { ...state.profile, status: action.status} }
        }
        case SET_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state;
    }
}


// no API yet ( no likes api, no posts api, no polls api, no comments api)
export const addPost = (newPostText) => ({type: ADD_POST, newPostText})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

// no API hidden layer of action
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const setPhoto = (photos) => ({type: SET_PHOTO, photos})
export const setUpdateUserProfile = (profileData) => ({type: UPDATE_PROFILE, profileData})

// API actions
export const getUserProfile = (userId) => async(dispatch) => {
    // debugger
    let response = await profileAPI.getProfile(userId)
    if (response.data.resultCode === 0){
        let profile = response.data.data;
        profile.photos = replaceQuotes(profile.photos);
        profile.contacts = replaceQuotes(profile.contacts);
        dispatch(setUserProfile(profile));
        // return response.data.data
    }
}

export const updateUserProfile = (profileData) => async(dispatch) => {
    // debugger
    // profileData = backupQuotes(profileData)
    let response = await profileAPI.updateProfile(profileData)
    if(response.data.resultCode === 0){
        let profile = response.data.data
        if('photos' in profile){
            profile.photos = replaceQuotes(profile.photos);
        }
        if ('contacts' in profile){
            profile.contacts = replaceQuotes(profile.contacts);
        }
        dispatch(setUpdateUserProfile(profile))
    } else {
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("updateProfile", {_error: message}));
    }
}
// fields to change

// "name",
// "status",
// "photos",
// "lookingForAJob",
// "lookingForAJobDescription",
// "fullname",
// "contacts"

// export const setDeleteUserProfile = () => ({type: DELETE_PROFILE})
export const deleteUserProfile = () => async(dispatch) => {
    let response = profileAPI.deleteProfile()
    if(response.data.resultCode === 0){
        dispatch(setUserProfile(null))
        authReducer.logout()
        // delete state data and token ????
        // reidrect login???
        // if profile === null -> rerender all and redirect login (solved)
    } else {
        //  в случае ошибки от АПИ, все равно возможно юзер удален но возникла ошибка позднее его удаления,
        // потому, если мы до сих пор залогинены 
        // (тоесть наш текущий токен валиден на стороне сервака апи), значит не было удаления пользователя
        let authResponse = await authAPI.me() 
        if(authResponse.data.resultCode !== 0){ //  а если не валиден - юзер удален - очищаем данные
            dispatch(setUserProfile(null))
            authReducer.logout()
        }
    }
}


// export const getStatus = (userId) => async(dispatch) => {
//     let response =  await profileAPI.getStatus(userId);
//     if(response.data.resultCode === 0){
//         dispatch(setStatus(response.data.data));
//     } // if subs to redux-form  -> + stopSubmit
// }

// there is the only place we dont want to say the user that there is was an error in sataus update
export const updateStatus = (status) => async(dispatch) => {
    let response =  await profileAPI.updateStatus(status); //  без оповещения юзеру об ошибке в отправке на апи
    console.log(response);
    if( response.data.resultCode === 0 ){
        dispatch(setStatus(status));
    }
}

export const updatePhoto = (photo) => async(dispatch) => {
    let response =  await profileAPI.updatePhoto(photo);
    if( response.data.resultCode === 0 ){
        dispatch(setPhoto(photo));
    } else {
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("updatePhoto", {_error: message}));
    }
}



// export const setUserJWTToken = (token) => ({type: SET_USER_JWTTOKEN, token})
// export const setSelfUserId = (selfUserId) => ({type: SET_SELF_USER_ID, selfUserId})

// export const updateNewPostTextActionCreator = (text) =>
//     ({type: UPDATE_NEW_POST_TEXT, newText: text })

export default profileReducer;