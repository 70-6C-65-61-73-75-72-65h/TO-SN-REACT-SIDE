// import React, {Component} from 'react';
// import {connect} from 'react-redux';

// import { isLogin } from '../../redux/auth-reducer';

// // import styles from './SignUp.module.css'

// let Me = (props) => {

//     return (
//         <div className=''>
            
//             <div>
//                 <h1>Checking is Login</h1>
//             </div>
            
//             {
//             props.errorMessage ? 
//                 <div className=''>You are not Authorized!!! <div className=''>{props.errorMessage}</div></div>:
//                 <div className=''>You are Authorized as user
//                 <div className=''>with id {props.userId}</div>
//                 <div className=''>and token {props.token}</div>
//                 </div>
//             }
            
//     </div>
//     )
// }


// let mapStateToProps = (state) => ({
//     token: state.authPage.token,
//     userId: state.authPage.userId,

//     errorMessage: state.authPage.errorMessage
// });


// // null state while signUp
// export default connect(mapStateToProps, { isLogin })(Me);