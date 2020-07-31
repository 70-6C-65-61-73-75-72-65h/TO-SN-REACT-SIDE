// import React from 'react';
// import Profile from "./Profile";
// import Axios from 'axios';
// import {connect} from "react-redux";
// import {setUserProfile} from "../../redux/profile-reducer";
// import {withRouter, Redirect} from "react-router-dom";

// // import Cookies from 'js-cookie';

// class ProfileContainer extends React.Component {

//     // getValidToken = () => {
//     //     // console.log(`props token ${this.props.token}`);
//     //     return {
//     //         headers: {
//     //             'Authorization': 'Bearer ' + this.props.token
//     //           }
//     //         }
//     // }

//     // setAllCookies = () => {
//     //     console.log('COOOC')
//     //     console.log(Cookies.get('token'))
//     //     console.log(Cookies.get('userId'))
//     //     console.log('COOOC')
//     //     Cookies.get('token')
//     //     Cookies.get('userId')
//     // }
    
//     // componentDidMount() {
        
//     //     // this.setAllCookies()
//     //     console.log(`${this.props.token}`);
//     //     let userId = this.props.match.params.userId;
//     //     if (!userId) { // while asking for our own profile
//     //         userId = this.props.userId;//this.props.UserId;// = 8; // that means that my userId is 8
//     //         // console.log(`\n\n\n${userId}`);
//     //     }

//     //     Axios.get(`http://127.0.0.1:8000/api/profile/` + userId, this.getValidToken())
//     //     .then(response => {
//     //         let profile = response.data;
//     //         profile.photos = replaceQuotes(profile.photos);
//     //         profile.contacts = replaceQuotes(profile.contacts);
//     //         // console.log(`${profile}`);
//     //         this.props.setUserProfile(profile);

//     //         // for (let key in this.props.profile){
//     //         //     console.log(`${key} `+ this.props.profile[key]);
//     //         // }
//     //         console.log(this.props.profile.name);

//     //     })
//     //     .catch((error) => {
//     //         console.log(error);
//     //     });

        

//         //auth



//         // const config = {
//         //     headers: { Authorization: `Bearer ${this.props.token}` }
//         // };
//         // const bodyParameters = {
//         //    key: "value"
//         // };


//         // https://social-network.samuraijs.com/api/1.0/profile/
//         // http://127.0.0.1:4000/api/profile/
        
        
        
//     // }


//     render() {
//         if(this.props.token === null){
//             return <Redirect to='/login'/>
//         }
//         return (<>
//         <Profile {...this.props} profile={this.props.profile}/>
//             </>
//         )
//     }
// }

// let mapStateToProps = (state) => ({
//     profile: state.profilePage.profile,
//     token: state.auth.token,
//     userId: state.auth.userId,

// });

// let WithUrlDataContainerComponent = withRouter(ProfileContainer);

// export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);

