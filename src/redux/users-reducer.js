import {usersAPI} from "../api/api";
import { updateObjectInArray } from "../components/common/utils/object-helpers";

// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
const FOLLOW_UNFOLLOW = 'FOLLOW_UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_QUERY = 'SET_QUERY';
let initialState = {
    users: [ ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    query: '',
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_QUERY: {
            return {...state, query:action.query}
        }
        case FOLLOW_UNFOLLOW: { 
            // debugger
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "userId", {userRelation: action.userRelation}) //
            }
        }
        // case UNFOLLOW:
        //     return {
        //         ...state,
        //         users: updateObjectInArray(state.users, action.userId, "userId", {followed: false})
        //     }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            // console.log(`followingInProgress: ${state.followingInProgress}`);
            // debugger
            let l = {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
            // debugger
            return l
        }
        default:
            return state;
    }
}

export const setQuery = (query) => ({type: SET_QUERY, query })
export const followUnfollowSuccess = (userId, userRelation) => ({type: FOLLOW_UNFOLLOW, userId, userRelation })
// export const unfollowSuccess = (userId, userRelation) => ({type: UNFOLLOW, userId, userRelation })
export const setUsers = (users) => ({type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })





// we dont actually need pageSize
export const requestUsers = (page, pageSize) => {
    // debugger
    return async(dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let response =  await usersAPI.getUsers(page);
        // debugger
        
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.users.items));
        dispatch(setTotalUsersCount(response.data.users.totalCount));
    }
}


export const searchUsers = (page, query) => {
    return async(dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let response =  await usersAPI.getUsers(page, query);
        // debugger
        
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.users.items));
        dispatch(setTotalUsersCount(response.data.users.totalCount));
    }
}

const followUnfollowFlow = async(dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    // debugger
    let response =  await apiMethod(userId);
    // debugger
    if (response.data.resultCode === 0 || response.data === '') {
        let response2 = await usersAPI.getfollow(userId);
        // debugger
        if (response2.data.resultCode === 0) {
            dispatch(actionCreator(userId, response2.data.data.userRelation));
        }
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => {
    return (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followUnfollowSuccess);
    }
}
export const unfollow = (userId) => {
    return (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), followUnfollowSuccess);
    }
}

export default usersReducer;