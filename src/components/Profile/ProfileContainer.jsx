import React from 'react';
import Profile from "./Profile";
import Axios from 'axios';
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {withRouter, Redirect} from "react-router-dom";

import {replaceQuotes} from '../../common/utils/quotes.js';

class ProfileContainer extends React.Component {

    getValidToken(){
        // console.log(`props token ${this.props.token}`);
        return {
            headers: {
                'Authorization': 'Bearer ' + this.props.token
              }
            }
    }

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) { // while asking for our own profile
            userId = this.props.userId;//this.props.UserId;// = 8; // that means that my userId is 8
            // console.log(`\n\n\n${userId}`);
        }
        Axios.get(`http://127.0.0.1:8000/api/profile/` + userId, this.getValidToken())
        .then(response => {
            let profile = response.data;
            profile.photos = replaceQuotes(profile.photos);
            profile.contacts = replaceQuotes(profile.contacts);
            console.log(`${profile}`);
            this.props.setUserProfile(profile);
        })
        .catch((error) => {
            console.log(error);
        });



        //auth



        // const config = {
        //     headers: { Authorization: `Bearer ${this.props.token}` }
        // };
        // const bodyParameters = {
        //    key: "value"
        // };


        // https://social-network.samuraijs.com/api/1.0/profile/
        // http://127.0.0.1:4000/api/profile/
        
        
        
    }


    render() {
        if(this.props.token === null){
            return <Redirect to='/login'/>
        }
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    token: state.authPage.token,
    userId: state.authPage.userId
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);