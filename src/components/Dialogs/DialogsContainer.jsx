import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';

class DialogsContainer extends React.Component {
    render() {
        if(this.props.token === null){
            return <Redirect to='/login'/>
        }
        return (
            <Dialogs {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        token: state.authPage.token
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        }
    }
}

let WhithTokenDialogsContainer = withRouter(DialogsContainer);
// const DialogsContainer = 
export default connect(mapStateToProps, mapDispatchToProps)(WhithTokenDialogsContainer);

// export default DialogsContainer;