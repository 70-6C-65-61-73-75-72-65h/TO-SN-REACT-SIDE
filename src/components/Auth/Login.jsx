import React from 'react';
import {connect} from 'react-redux';

// import {NavLink} from "react-router-dom";



// import styles from './SignUp.module.css'

let Login = (props) => {


    let setledUsername = React.createRef();
    let setledPassword = React.createRef();

    let onUsernameChange = () => {
        let data = setledUsername.current.value;
        props.setUsername(data);
    }
    let onPasswordChange = () => {
        let data = setledPassword.current.value;
        props.setPassword(data);
    }

    return (
        <div className=''>
            
            <div>
                <h1>Login</h1>
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
                    <label>Password</label>
                </div>
                <div>
                    <input ref={setledPassword} type='password' name='password' placeholder='Password' value={props.password} onChange={onPasswordChange}/>
                </div>
            </div>
            <br/>

            <div className=''>
                {/* <NavLink to={props.errorMessage ? '/login': '/profile'} ><button onClick={() => {props.login()}}>Login</button></NavLink> */}
                <button onClick={() => props.sendLoginRequest()}>Login</button>
            </div>
            
            <div className=''>
                {props.errorMessage ? <label> Error is: {props.errorMessage} </label> : <></>}
            </div>
            {/* <div className=''>
                {props.token ? <label> Token is: {props.token} </label> : <></>}
            </div>
            <div className=''>
                {props.userId ? <label> User Id is: {props.userId} </label> : <></>}
            </div> */}

    </div>
    )
}


export default Login;