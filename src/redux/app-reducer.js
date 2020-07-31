// import {authAPI} from "../api/api";
import { getAuthUserData, setAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:

            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS })

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