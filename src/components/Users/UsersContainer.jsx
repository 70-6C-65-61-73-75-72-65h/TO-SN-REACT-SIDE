import React from 'react';
import { connect } from 'react-redux';
import {
    follow,
    setCurrentPage,
    unfollow, toggleFollowingProgress, requestUsers, searchUsers
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers, getQuery
} from "../../redux/users-selectors";
import UsersSearch from './UsersSearch';

import { useUsersEffects } from '../../customHooks/usersHooks';


// export function useQuering(isWithQuery){
//     const [queried, setQueried] = useState(null)
//     useEffect(()=>{
//         setQueried(isWithQuery)
//     },[isWithQuery])
//     return queried
// }

// chatUsersIds // filter list
// onClick={() => {props.toogleFocuseElem(props.setUsersForChatShow, props.usersForChatShow);onSubmit();}} // blur memberlist -> send to api request



const UsersContainer = (props) => {
    // const queried = useQuering(false)
    // const [query, setQuery] = useState('')
    // const { currentPage, pageSize } = props;
    const [onPageChanged] = useUsersEffects(props.getUsers, props.searchUsers, props.query, props.currentPage, props.pageSize)

    // debugger
    // console.log(props.chatUsersIds)

    return (<div className={props.styleForUsers ? props.styleForUsers: ''}>
        {props.isFetching ? <Preloader /> : null}
        <div >
            <UsersSearch/>
        </div>
        { props.fWUFCID === 0 ? 
        //props.forChat && props.setSelectedForChatUsers ?  
        
        
        // <a onClick={props.toogleFocuseElem(props.setUsersForChatShow, props.usersForChatShow)}>
        //     End Selection
        // </a>
        <a onClick={ () =>  props.clearCurrentFocusedWindow(props.fWUFCID) }>
            End Selection
        </a>
        : null}
        
        <Users 
        
            totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            onPageChanged={onPageChanged}
            users={props.users}
            follow={props.follow}
            unfollow={props.unfollow}
            followingInProgress={props.followingInProgress}


            forChat = {props.forChat}


            setSelectedForChatUsers = {props.setSelectedForChatUsers} // can be undef if it member adding
            setSelectedForChatUser = {props.setSelectedForChatUser} // can be undef if it chat creation
            chatUsersIds = {props.chatUsersIds} // can be undef if it chat creation

            // toogleFocuseElemArr={props.toogleFocuseElemArr}
            // usersForChatShow={props.usersForChatShow} 

            
            // setUsersForChatShow={props.setUsersForChatShow} // can be undef if it chat creation
            fWAUFC={props.fWAUFC}
            clearCurrentFocusedWindow={props.clearCurrentFocusedWindow}


            selectedForChatUsers={props.selectedForChatUsers} // can be undef if it member adding
            styleForUsers= {props.styleForUsers}
            styleForUser={props.styleForUser}
        />
    </div>)
}


let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        query: getQuery(state),
    }
}


export default compose(
    connect(mapStateToProps, { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers: requestUsers, searchUsers })
)(UsersContainer)

// class UsersContainer extends React.Component {

//     getValidToken(){
//         // console.log(`props token ${this.props.token}`);
//         // console.log(`props ${this.props}`);
//         return {
//             headers: {
//                 'Authorization': 'Bearer ' + this.props.token
//               }
//             }
//     }

//     // setValidToken(){

//     // }

//     componentDidMount() {
//         if(this.props.token === null){
//             return
//         }
//         // console.log(`props token ${this.props.token}`);
//         // console.log(`props ${this.props}`);
//         console.log('Im inside the DOM');
//         console.log(`${this.props.token}`);
//         // console.log(`\ngetValidToken\n${this.props.token}`);
//         this.props.toggleIsFetching(true);
//         // 'https://social-network.samuraijs.com/api/1.0/users'
//         Axios.get(`http://127.0.0.1:8000/api/users?page=${this.props.currentPage}&limit=${this.props.pageSize}`, this.getValidToken()).then(response => {

//             // console.log(response.data.data.items);
//             // debugger;
//             //response.data -- all json data
//             // response.data.data -- data from json string
//             // response.data.data.items -- data element to watch all users like in a list
//             response.data.users.items = response.data.users.items.map(user => ({...user, photos:replaceQuotes(user.photos)}))
//             // console.log(response.data);
//             this.props.setUsers(response.data.users.items)
//             // console.log(this.props.users);
//             this.props.toggleIsFetching(false);
//             // console.log(response.data.data.totalCount);
//             this.props.setTotalUsersCount(response.data.users.totalCount)
//         }).catch(function (error) {
//             console.log(error);
//         });
//     }

//     componentDidUpdate() {
//         // console.log('Im update the DOM');
//         // console.log(`${this.props.token}`);
//     }

//     onPageChanged = (page) => {
//         console.log(`${this.props.token}`);

//         this.props.setCurrentPage(page);
//         this.props.toggleIsFetching(true);
//         Axios.get(`http://127.0.0.1:8000/api/users?page=${page}&limit=${this.props.pageSize}`, this.getValidToken()).then(response => {
//             // console.log(response.data.users.items);
//             // debugger;
//             response.data.users.items = response.data.users.items.map(user => ({...user, photos:replaceQuotes(user.photos)}))
//             this.props.setUsers(response.data.users.items)
//             this.props.toggleIsFetching(false);
//         }).catch(function (error) {
//             console.log(error);
//         });
//     }

//     render() {
//         if(this.props.token === null){
//             return <Redirect to='/login'/>
//         }

//         return (<>
//         {this.props.isFetching ? <Preloader /> : null}
//         <Users totalUsersCount={this.props.totalUsersCount}
//         pageSize={this.props.pageSize}
//         currentPage={this.props.currentPage}
//         users={this.props.users}
//         onPageChanged={this.onPageChanged}
//         follow={this.props.follow}
//         unfollow={this.props.unfollow}

//         token={this.props.token}
//         userId={this.props.userId}

//         />
//         </>)
//     }

// }

// const mapStateToProps = (state) => ({
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         // for fixing followed error (UNauthorized user because of lack token)
//         // selfUserId: state.profilePage.selfUserId,
//         // token: state.profilePage.token,
//         // newPostText: state.profilePage.newPostText

//         token: state.auth.token,
//         userId: state.auth.userId,
// });

// const mapDispatchToProps = (dispatch) => {

    // return {
    //     follow: (userId) => {
    //         dispatch(followAC(userId));
    //     },
    //     unfollow: (userId) => {
    //         dispatch(unfollowAC(userId));
    //     },
    //     setUsers: (users) => {
    //         dispatch(setUsersAC(users));
    //     },
    //     setCurrentPage: (currentPage) => {
    //         dispatch(setCurrentPageAC(currentPage));
    //     },
    //     setTotalUsersCount: (totalUsersCount) => {
    //         dispatch(setTotalUsersCountAC(totalUsersCount));
    //     },
    //     toggleIsFetching: (IsFetching) => {
    //         dispatch(toggleIsFetchingAC(IsFetching));
    //     }
    // }
// }


// export default connect(mapStateToProps,
//     {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersContainer);

// export default UsersContainer;