import React from 'react';
import Axios from 'axios';
import {connect} from "react-redux";

import Login from './Login';

import { login, setUsername, setPassword, toggleIsFetching, setRedirectLogin } from '../../redux/auth-reducer';
import Preloader from '../../common/Preloader/Preloader';


import { Redirect } from "react-router-dom";


class LoginContainer extends React.Component {

    componentDidMount() {}

    componentDidUpdate() { // after state changed
        // console.log('Im update the DOM');
        // console.log(`${this.props.token}`);
    }

    
    sendLoginRequest = () => {
        // console.log('props '+ this.props);
        let login_data = {
            "username": this.props.username,
            "password": this.props.password
        }
        // link // data // config {headers} == 0
        this.props.toggleIsFetching(true);

        Axios.post(`http://127.0.0.1:8000/api/auth/login/`, login_data)
        .then(response => {
            // let errorMessage = null;
            let redirect_login = '/profile';
            console.log(response.data);
            response = response.data;
            
            if (response.token !== undefined && response.userId !== undefined){ // if there is no such keys in obj data
                this.props.login(response.token, response.userId, null);
            } else {
                console.log(`${response}`);
                this.props.login(null, null, response.errorMessage); // errorMessage 
                redirect_login = null;
            }
            
            this.props.toggleIsFetching(false);
            this.props.setRedirectLogin(redirect_login);
        })
        .catch(function (error) {
            // if will be detail in response (response.detail === 'Signature ...')
            console.log('\n\n\nERR\n'+error);
        });
    }
    
    render(){
        // console.log(this.props.redirect_login);
        if (this.props.redirect_login) {
            return <Redirect to={this.props.redirect_login} />
        }

        return <>
        {this.props.isFetching ? <Preloader/> : null}
        <Login 
        errorMessage={this.props.errorMessage}
        username={this.props.username}
        password={this.props.password}

        sendLoginRequest={this.sendLoginRequest}

        setPassword={this.props.setPassword}
        setUsername={this.props.setUsername}
        />
        </>
    }
    
}



const mapStateToProps = (state) => ({
    username: state.authPage.username,
    password: state.authPage.password,
    errorMessage: state.authPage.errorMessage,
    isFetching: state.authPage.isFetching,
    redirect_login: state.authPage.redirect_login
});


// null state while signUp
export default connect(mapStateToProps, { login, setUsername, setPassword, toggleIsFetching, setRedirectLogin })(LoginContainer);