// import {authAPI} from "../api/api";
import { getAuthUserData, setAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const ADD_FOCUSED_WINDOW = 'SET_FOCUSED_WINDOWS';
const CLEAR_FOCUSED_WINDOWS = 'CLEAR_FOCUSED_WINDOWS';
const CLEAR_CURRENT_FOCUSED_WINDOW = 'CLEAR_CURRENT_FOCUSED_WINDOW';

let initialState = {
    initialized: false,
    focusedWindows: [],
    focusedWindowsIds: {fWUsersFCId: 0, fWAddUserFCId: 1, fWMembersId: 2, fWMemberOperationsId: 3}
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:

            return {
                ...state,
                initialized: true
            }

        case ADD_FOCUSED_WINDOW:

            return {
                ...state,
                focusedWindows: [...state.focusedWindows, action.newFocusedWindow]
            }

        case CLEAR_FOCUSED_WINDOWS:
            // debugger
                return {
                    ...state,
                    focusedWindows: []
                }
        
        case CLEAR_CURRENT_FOCUSED_WINDOW: 
            // debugger
            return {
                ...state,
                focusedWindows: state.focusedWindows.filter(window=> window.id !== action.currentWindowId)
            }

        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS })

export const addFocusedWindow = (id, data) => ({type: ADD_FOCUSED_WINDOW, newFocusedWindow: {id: id, data: data} }) // id, data
export const clearAllFocusedWindows = () => ({type: CLEAR_FOCUSED_WINDOWS})
export const clearCurrentFocusedWindow = (currentWindowId) => ({type: CLEAR_CURRENT_FOCUSED_WINDOW, currentWindowId})


export const initializeApp = () => (dispatch) => {
    // debugger 
    Promise.all([dispatch(getAuthUserData())])
    .then( resolve => {
        // debugger
        // console.log('hui')
        dispatch(initializedSuccess());
    }).catch(error => 
        {
            // debugger
            if(["Signature has expired.", "Error decoding signature.", "Invalid Authorization header. No credentials provided."].includes(error.response.data.detail)){
                // console.log(error.response.data.detail)
                // delete localStorage['token']
                // dispatch(setAuthUserData(null, null, null, false, true))
            } else {
                console.log('its amaizing error - server error')
            }
            dispatch(initializedSuccess());
            // dispatch(initializedSuccess());
            // dispatch(getAuthUserData());
        }
        ).catch(error => {
            console.log('you gonna die')
            dispatch(initializedSuccess());
        });
    
    // authAPI.me()
    //     .then(response => {
    //         if (response.data.resultCode === 0) {
    //             let {id, login, email} = response.data.data;
    //             dispatch(initializedSuccess());
    //         }
    //     });
}


export default appReducer;