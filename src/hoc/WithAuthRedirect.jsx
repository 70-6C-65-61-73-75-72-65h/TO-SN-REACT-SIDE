import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId
});

const withAuthRedirect = (WrappedComponent) =>  {

    class RedirectComponent extends React.Component{
        // constructor(props){
        //     super(props);
        // }
        render() {
            // debugger
            if (!this.props.isAuth) return <Redirect to='/login' />
            return <WrappedComponent {...this.props} />
        }
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}

export default withAuthRedirect;

// export default connect(mapStateToPropsForRedirect)(withAuthRedirect);