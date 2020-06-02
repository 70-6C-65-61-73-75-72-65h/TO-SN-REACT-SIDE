const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
// const SET_USER_JWTTOKEN = 'SET_USER_JWTTOKEN';
// const SET_SELF_USER_ID = 'SET_SELF_USER_ID';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    // token: null,
    // selfUserId: null
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        // case SET_USER_JWTTOKEN: {
        //     return {...state, token: action.token}
        // }
        // case SET_SELF_USER_ID: {
        //     return {...state, selfUserId: action.selfUserId}
        // }
        default:
            return state;
    }
}


export const addPostActionCreator = () => ({type: ADD_POST})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

// export const setUserJWTToken = (token) => ({type: SET_USER_JWTTOKEN, token})
// export const setSelfUserId = (selfUserId) => ({type: SET_SELF_USER_ID, selfUserId})

export const updateNewPostTextActionCreator = (text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text })

export default profileReducer;