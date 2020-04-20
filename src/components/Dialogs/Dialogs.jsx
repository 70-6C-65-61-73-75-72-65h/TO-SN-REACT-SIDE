import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    let dialogsElements =  props.state.dialogs.map( d => <DialogItem name={d.name} id={d.id} dispatch={props.dispatch}/>  );
    let messagesElements = props.state.messages.filter( m => m.id === props.state.chosenDialogId).map( m => <Message message={m.message}/> );
 
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_header}>Dialogs</div>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
            </div>
        </div>
    )
}

export default Dialogs;