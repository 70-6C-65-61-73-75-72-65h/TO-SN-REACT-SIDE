import React, {Component} from 'react';
import {connect} from 'react-redux';

import { signup, setUsername, setEmail, setEmail2, setPassword } from '../../redux/auth-reducer';

// import styles from './SignUp.module.css'

let SignUp = (props) => {

    let setledUsername = React.createRef();
    let setledPassword = React.createRef();
    let setledEmail = React.createRef();
    let setledEmail2 = React.createRef();

    let onUsernameChange = () => {
        let data = setledUsername.current.value;
        props.setUsername(data);
    }
    let onPasswordChange = () => {
        let data = setledPassword.current.value;
        props.setPassword(data);
    }
    let onEmailChange = () => {
        let data = setledEmail.current.value;
        props.setEmail(data);
    }
    let onEmail2Change = () => {
        let data = setledEmail2.current.value;
        props.setEmail2(data);
    }

    return (
        <div className=''>
            
            <div>
                <h1>Sign Up For An Account</h1>
            </div> 

            <div className=''>
                <div className=''>
                    <label>Username</label>
                </div>
                <div>
                    <input ref={setledUsername} name='username' placeholder='Username' value={props.username} onChange={onUsernameChange}/>
                </div>
            </div>
            <br/>

            <div className=''>
                <div className=''>
                    <label>Email</label>
                </div>
                <div>
                    <input ref={setledEmail} name='email' placeholder='Email' value={props.email} onChange={onEmailChange}/>
                </div>
            </div>
            <br/>

            <div className=''>
                <div className=''>
                    <label>Repeat Email</label>
                </div>
                <div>
                    <input ref={setledEmail2} name='email2' placeholder='Email' value={props.email2} onChange={onEmail2Change}/>
                </div>
            </div>
            <br/>

            <div className=''>
                <div className=''>
                    <label>Password</label>
                </div>
                <div>
                    <input ref={setledPassword} type='password' name='password' placeholder='Password' value={props.password} onChange={onPasswordChange}/>
                </div>
            </div>
            <br/>

            <div className=''>
                <button onClick={() => {props.signup()}}>Sign Up</button>
            </div>

            <div className=''>
                {props.errorMessage ? <label> Error is: {props.errorMessage} </label> : <></>}
            </div>

    </div>
    )
}


let mapStateToProps = (state) => ({
    username: state.authPage.username,
    email: state.authPage.email,
    email2: state.authPage.email2,
    password: state.authPage.password,

    // token: state.authPage.token,
    // userId: state.authPage.userId,

    errorMessage: state.authPage.errorMessage
});


// null state while signUp
export default connect(mapStateToProps, { signup, setUsername, setEmail, setEmail2, setPassword })(SignUp);