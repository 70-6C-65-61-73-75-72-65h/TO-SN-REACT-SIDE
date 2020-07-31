// import React from 'react';
// import Axios from 'axios';
// import {connect} from "react-redux";

// import SignUp from './SignUp';

// // login - for  update token aduserId from Cookies
// import { signup, setUsername, setEmail, setEmail2, setPassword, toggleIsFetching, setRedirectSignUp, dropState } from '../../redux/auth-reducer';
// import Preloader from '../common/Preloader/Preloader';

// import { Redirect } from "react-router-dom";

// // import {checkCookiesData} from "../../common/utils/Cookies";
// // import Cookies from 'js-cookie';

// class SignUpContainer extends React.Component {


//     componentDidMount() {
//         this.props.dropState();
//     }

//     componentWillUnmount() { // before deletion
//         this.props.dropState(); // чтоб обнулить сайнап редирект на нуль
//     }

//     componentDidUpdate() {} // after state changed}

    
//     sendSignUpRequest = () => {
//         // console.log('props '+ this.props);
//         let signup_data = {
//             "username": this.props.username,
//             "email": this.props.email,
//             "email2": this.props.email2,
//             "password": this.props.password
//         }
//         // link // data // config {headers} == 0
//         this.props.toggleIsFetching(true);

//         Axios.post(`http://127.0.0.1:8000/api/auth/register/`, signup_data)
//         .then(response => {
//             // let errorMessage = null;
//             let redirect_signup = '/login';
//             // console.log(response.data);
//             response = response.data;
//             // console.log(`status\n${typeof response["status"] }\n`);
//             // console.log(`status\n${ response["status"] instanceof String }\n`);
//             // if have status its ok // if not - its bad
//             if (response["status"]!== undefined && response["status"] !== null ){ // if there is no such keys in obj data
//                 this.props.signup(null);
//             } else {
//                 let errorMessage = [];
//                 if (response["username"] !== undefined && response["username"] !== null){
//                     errorMessage.push(response["username"][0]);
//                 }
//                 if (response["email"] !== undefined && response["email"] !== null){
//                     errorMessage.push(response["email"][0]);
//                 }
//                 console.log('ERRRRORR');
//                 console.log(errorMessage.join('\n'));
//                 this.props.signup(errorMessage.join('\n')); // errorMessage 
//                 redirect_signup = null;
//             }
//             console.log(redirect_signup);
//             this.props.toggleIsFetching(false);
//             this.props.setRedirectSignUp(redirect_signup);
//         })
//         .catch(function (error) {
//             // if will be detail in response (response.detail === 'Signature ...')
//             console.log('\n\n\nERR\n'+error);
//         });
//     }
    
//     render(){
//         // console.log(this.props.redirect_signup);
//         if (this.props.redirect_signup) {
//             return <Redirect to={this.props.redirect_signup} />
//         }

//         return <>
//         {this.props.isFetching ? <Preloader/> : null}
//         <SignUp 
//         errorMessage={this.props.errorMessage}
//         username={this.props.username}
//         email={this.props.email}
//         email2={this.props.email2}
//         password={this.props.password}

//         sendSignUpRequest={this.sendSignUpRequest}

//         setPassword={this.props.setPassword}
//         setEmail={this.props.setEmail}
//         setEmail2={this.props.setEmail2}
//         setUsername={this.props.setUsername}
//         />
//         </>
//     }
// }



// const mapStateToProps = (state) => ({
//     username: state.authPage.username,
//     email: state.authPage.email,
//     email2: state.authPage.email2,
//     password: state.authPage.password,
//     errorMessage: state.authPage.errorMessage,
//     isFetching: state.authPage.isFetching,
//     redirect_signup: state.authPage.redirect_signup
// });


// // null state while signUp
// export default connect(mapStateToProps, { signup, setUsername, setEmail, setEmail2, setPassword, toggleIsFetching, setRedirectSignUp, dropState })(SignUpContainer);