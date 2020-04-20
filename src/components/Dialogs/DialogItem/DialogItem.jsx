import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import { apprDialogSelectMessages } from '../../../redux/state';


const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

    // let lightMessage = () => {
    //     props.dispatch(apprDialogMessagesLightning(props.id));
    // }

    let selectMessages = () => {
        props.dispatch(apprDialogSelectMessages(props.id));
    }

    return <div className={s.dialogsItems}>
        <NavLink to={path} onClick={selectMessages} >{props.name}</NavLink>
    </div>
}

export default DialogItem;