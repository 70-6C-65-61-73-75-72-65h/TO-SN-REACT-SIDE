import React from 'react';
// import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";

import s from './Header.module.scss';
import {NavLink} from "react-router-dom";  

import mylogo from '../../assets/images/mylogo.png';


const Header = (props) => { 
    return <header className={s.header}>
        {/* <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' /> */}
            <img src={mylogo}/>
        { props.isAuth ? 
        <div className={s.loginBlock}>{props.login} - <a onClick={props.logout}>Logout</a></div>
                        : 
        <div className={s.loginBlock}><NavLink to={'/login'}>Login</NavLink></div> 
        }
    

    </header>
}

// export default Header;


class HeaderContainer extends React.Component {
    // componentDidMount() {
    //   this.props.getAuthUserData();
    // }

    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {logout})(HeaderContainer);