import React from 'react';
import Axios from 'axios';
import {connect} from "react-redux";
// import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC } from '../../redux/users-reducer';
import {
    follow,
    setCurrentPage,
    setUsers,
    setTotalUsersCount,
    toggleIsFetching,
    unfollow
} from '../../redux/users-reducer';

import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import { replaceQuotes } from '../../common/utils/quotes';
import { Redirect } from 'react-router-dom';

class UsersContainer extends React.Component {

    getValidToken(){
        // console.log(`props token ${this.props.token}`);
        // console.log(`props ${this.props}`);
        return {
            headers: {
                'Authorization': 'Bearer ' + this.props.token
              }
            }
    }

    // setValidToken(){

    // }

    componentDidMount() {
        if(this.props.token === null){
            return
        }
        // console.log(`props token ${this.props.token}`);
        // console.log(`props ${this.props}`);
        console.log('Im inside the DOM');
        // console.log(`\ngetValidToken\n${this.props.token}`);
        this.props.toggleIsFetching(true);
        // 'https://social-network.samuraijs.com/api/1.0/users'
        Axios.get(`http://127.0.0.1:8000/api/users?page=${this.props.currentPage}&limit=${this.props.pageSize}`, this.getValidToken()).then(response => {
            
            // console.log(response.data.data.items);
            // debugger;
            //response.data -- all json data
            // response.data.data -- data from json string
            // response.data.data.items -- data element to watch all users like in a list
            response.data.users.items = response.data.users.items.map(user => ({...user, photos:replaceQuotes(user.photos)}))
            // console.log(response.data);
            this.props.setUsers(response.data.users.items)
            // console.log(this.props.users);
            this.props.toggleIsFetching(false);
            // console.log(response.data.data.totalCount);
            this.props.setTotalUsersCount(response.data.users.totalCount)
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentDidUpdate() {
        console.log('Im update the DOM');
        console.log(`${this.props.token}`);
    }

    onPageChanged = (page) => {
        console.log(`${this.props.token}`);
        
        this.props.setCurrentPage(page);
        this.props.toggleIsFetching(true);
        Axios.get(`http://127.0.0.1:8000/api/users?page=${page}&limit=${this.props.pageSize}`, this.getValidToken()).then(response => {
            // console.log(response.data.users.items);
            // debugger;
            response.data.users.items = response.data.users.items.map(user => ({...user, photos:replaceQuotes(user.photos)}))
            this.props.setUsers(response.data.users.items)
            this.props.toggleIsFetching(false);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if(this.props.token === null){
            return <Redirect to='/login'/>
        }

        return (<>
        {this.props.isFetching ? <Preloader /> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        users={this.props.users}
        onPageChanged={this.onPageChanged}
        follow={this.props.follow}
        unfollow={this.props.unfollow}

        token={this.props.token}
        userId={this.props.userId}

        />
        </>)
    }

}

const mapStateToProps = (state) => ({
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        // for fixing followed error (UNauthorized user because of lack token)
        // selfUserId: state.profilePage.selfUserId,
        // token: state.profilePage.token,
        // newPostText: state.profilePage.newPostText

        token: state.authPage.token,
        userId: state.authPage.userId,
});

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



export default connect(mapStateToProps,
    {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersContainer);

// export default UsersContainer;