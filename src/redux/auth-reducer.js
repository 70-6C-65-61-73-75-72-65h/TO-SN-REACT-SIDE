// // import Axios from 'axios';

import { usersAPI } from "../api/api";

// // let sendSignUpRequest = (username, email, email2, password) => {
// //     // no obtained tokens ( cause only register // not login )
// //     let signup_data =
// //     {
// //         "username": username,
// //         "email": email,
// //         "email2": email2,
// //         "password": password
// //     }
// //     // link // data // config {headers} == 0
// //     Axios.post(`http://127.0.0.1:8000/api/auth/register/`, signup_data).then(response => {
// //         console.log(response.data);
// //         return response.data;
// //         // return { "username": response.data.username, "email": response.data.email};

// //     }).catch(function (error) { // errror impossible // cause always positive answers with status_code 200_ok
// //         console.log(error);
// //         return {};
// //     });
// //     // we always can handle email and username from response.data and error.data from 
// //     }

// // let sendIsLoginRequest = (token) => {
// //     let config = {
// //         headers: {
// //             'Authorization': 'Bearer ' + token
// //           }
// //         }
// //     // link // data // config {headers} == 0
// //     Axios.post(`http://127.0.0.1:8000/api/auth/me/`, config).then(response => {
// //         console.log(response.data);
// //         return response.data;

// //     }).catch(function (error) {
// //         console.log(error);
// //         return {};
// //     });
// //     }

// // let sendLoginRequest = (username,  password) => {
// //     let login_data =
// //     {
// //         "username": username,
// //         "password": password
// //     }
// //     // link // data // config {headers} == 0
// //     return Axios.post(`http://127.0.0.1:8000/api/auth/login/`, login_data);
// //     }

// import Cookies from 'js-cookie';

// const SIGNUP = 'SIGNUP';
// const LOGIN = 'LOGIN';
// // const IS_LOGIN = 'IS_LOGIN';

// const SET_USERNAME = 'SET_USERNAME';
// const SET_EMAIL = 'SET_EMAIL';
// const SET_EMAIL2 = 'SET_EMAIL2';
// const SET_PASSWORD = 'SET_PASSWORD';

// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
// const SET_REDIRECT_LOGIN = 'SET_REDIRECT';
// const SET_REDIRECT_SIGNUP = 'SET_REDIRECT_SIGNUP';
// const SET_REDIRECT_LOGOUT = 'SET_REDIRECT_LOGOUT'; 

// const DROP_STATE = 'DROP_STATE';

// // const SET_COOKIES = 'SET_COOKIES';

// let initialState = {
//     // auth data ( that will be nulled after operation )
//     username: '',
//     email: '',
//     email2: '',
//     password: '',
//     // resident data 
//     token: Cookies.get('token') || null,
//     userId: Cookies.get('userId') || null,

//     // invalidSignUpData: false, // signup // not appropriate data (or not all data)
//     // invalidLoginData: false, // login // not appropriate data (or not all data)

//     // userAlreadyExists: false, // signup //  unique field email or username wasnt passed
//     // mailAlreadyRegistered: false, // signup //  unique field email or username wasnt passed
//     // // isFetching: true,
//     // fatalError: false
//     errorMessage: null,

//     isFetching: false,
//     redirect_login: null,
//     redirect_signup: null,
//     redirect_logout: null
// };


// const authReducer = (state = initialState, action) => {

//     switch(action.type) {
//         case DROP_STATE:
//             return {
//                 ...state,
//                 username: '',
//                 email: '',
//                 email2: '',
//                 password: '',
//                 token: null,
//                 userId: null,
//                 errorMessage: null,
//                 isFetching: false,
//                 redirect_login: null,
//                 redirect_signup: null,
//                 redirect_logout: null
//             }

//         case SET_USERNAME:
//             return { ...state, username: action.username}
//         case SET_EMAIL:
//             return { ...state, email: action.email}
//         case SET_EMAIL2:
//             return { ...state, email2: action.email2}
//         case SET_PASSWORD:
//             return { ...state, password: action.password}



//         // case SIGNUP:
//         //     {
//         //     let response = sendSignUpRequest(state.username, state.email, state.email2, state.password);
//         //     if ('username' in response && 'email' in response){
//         //         if (!Array.isArray(response.username) && !Array.isArray(response.email)){
//         //             return { ...state, username: '', email: '', email2: '', password: '', errorMessage: null}; // чтобы не хранить в стейте постоянно все данные кроме токена (который получим потом)
//         //         }
//         //     }
//         //     // can contain username and email or both
//         //     // Оператор опциональной последовательности ?.
//         //     return { ...state, errorMessage: {username: response.username?.[0], email: response.email?.[0]}}; // it will just undef if there is no email or no username
//         //     }


//             // if ('username' in response && 'email' in response){
//             //     if (!Array.isArray(response.username) && !Array.isArray(response.email)){
//             //         return { ...state, invalidSignUpData: false, userAlreadyExists: false, mailAlreadyRegistered: false, fatalError: false }; // обнулим все ерроры шоб можно было перейти на логин
//             //     } else if (Array.isArray(response.username) && Array.isArray(response.email)){
//             //         return { ...state, userAlreadyExists: true, mailAlreadyRegistered: true };
//             //     } else {
//             //         return { ...state, fatalError: true }; // cannot be one field str and another list
//             //     }
//             // } else if ('username' in response){
//             //     if (Array.isArray(response.username)){
//             //         // that means that this is an error message only in username
//             //         return { ...state, userAlreadyExists: true };
//             //     } else {
//             //         return { ...state, fatalError: true }; // cannot be only username in positive signup return
//             //     }
//             // } else if ('email' in response){
//             //     if (Array.isArray(response.email)){
//             //         // that means that this is an error message only in email
//             //         return { ...state, mailAlreadyRegistered: true };
//             //     } else {
//             //         return { ...state, fatalError: true }; // cannot be only email in positive signup return
//             //     }
//             // } else {
//             //     return { ...state, fatalError: true };
//             // }
//         case SIGNUP:
//             {
//                 // if 
//                 // let send = sendLoginRequest(state.username, state.password);
//                 if (action.errorMessage === null){
//                     return { ...state, email: '', email2: '', errorMessage: action.errorMessage, username: '', password: '' }; //  зануляем еррор и кредишнлс
//                 } else {
//                     return { ...state, errorMessage: action.errorMessage }; //  зануляем токен и юзер ид
//                 }
//             }
//         case LOGIN:
//             {
//                 if (action.errorMessage === null){
//                     return { ...state, token: action.token, userId: action.userId, errorMessage: action.errorMessage, username: '', password: '' }; //  зануляем еррор и кредишнлс
//                 } else {
//                     return { ...state, token: action.token, userId: action.userId, errorMessage: action.errorMessage }; //  зануляем токен и юзер ид
//                 }
//             }
//         case TOGGLE_IS_FETCHING:
//             return {...state, isFetching: action.isFetching}
//         case SET_REDIRECT_LOGIN:
//             return {...state, redirect_login: action.redirect_login}
//         case SET_REDIRECT_SIGNUP:
//                 return {...state, redirect_signup: action.redirect_signup}
//         case SET_REDIRECT_LOGOUT:
//                     return {...state, redirect_logout: action.redirect_logout}
//         default:
//             return state;
//     }
// }


// export const signup = (errorMessage) => ({type: SIGNUP, errorMessage});
// export const login = (token, userId, errorMessage) => ({type: LOGIN, token, userId, errorMessage});



// export const setUsername = (username) => ({type: SET_USERNAME, username});
// export const setEmail = (email) => ({type: SET_EMAIL, email});
// export const setEmail2 = (email2) => ({type: SET_EMAIL2, email2});
// export const setPassword = (password) => ({type: SET_PASSWORD, password});

// export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

// export const setRedirectLogin = (redirect_login) => ({type: SET_REDIRECT_LOGIN, redirect_login});
// export const setRedirectSignUp = (redirect_signup) => ({type: SET_REDIRECT_SIGNUP, redirect_signup});

// export const setRedirectLogout = (redirect_logout) => ({type: SET_REDIRECT_LOGOUT, redirect_logout});


// export const dropState = () => ({type: DROP_STATE});


// export default authReducer;


// // email // email2 // password


import {authAPI} from "../api/api";
import { stopSubmit } from "redux-form";
import { idbKeyval } from "../components/common/utils/indexedDB";

const SET_USER_DATA = 'my-app/auth/SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    // tokenError: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload:{userId, email, login, isAuth}})

let destructAUD = (data) => {
    // debugger
    return [data.userId, data.email, data.login]
}
let dispatchSAUD = (dispatch, data, isAuth=true) => {
    return dispatch(setAuthUserData(...destructAUD(data), isAuth))
}


export const getAuthUserData = () => async(dispatch) => {
    let response = await authAPI.me()
    // debugger
    if("detail" in response.data){
        if(["Signature has expired.", "Error decoding signature.", "Invalid Authorization header. No credentials provided."].includes(response.data.detail)){
            console.log(response.data.detail)
            // dispatch(setAuthUserData(null, null, null, false, true))
        } else {
            console.log('its amaizing error - server error')
        }
    } else {
        if(response.data.resultCode === 0){
            dispatchSAUD(dispatch, response.data.data)
        }
    }
    return response
}

export const login = (login, password) => async(dispatch) => {
    // console.log(login)
    // console.log(password)
    // delete localStorage['token']
    await idbKeyval.delete('token')
    let response = await authAPI.login(login, password)
    if (response.data.resultCode === 0){
        // console.log('3')
        // localStorage.setItem('token', response.data.data.token)
        await idbKeyval.set('token', response.data.data.token)
        // localStorage.setItem('userId', response.data.data.userId)
        // console.log('4')
        dispatchSAUD(dispatch, response.data.data) // here we set user auth data ( but we dont call any api calls with token yet)
        // console.log('5')
    } else {
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("login", {_error: message}));
    }
}

// or async type????
export const logout = () => async(dispatch) => {
    // we just cant logout from API server ( we can do this on frontend by deleting our localStorage TOKEN  - thats all folks)
    // localStorage.setItem('token', null)
    // delete localStorage['token']
    await idbKeyval.delete('token')
    // delete localStorage['userId']
    // localStorage.setItem('userId', null)
    dispatch(setAuthUserData(null, null, null, false, false))
}

export const signup = (login, password) => async(dispatch) => {
    let response = await authAPI.signup(login, password)
    if (response.data.resultCode !== 0){
        let message = response.data.messages.length  ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("signup", {_error: message}));
    }
}



export default authReducer