import React, {useState}  from 'react';
import styles from '../../common/FormsControls/FormsControls.module.scss'
import { createField, TextArea, FileInput, Input } from '../../common/FormsControls/FormsControls';
import { maxLength1000 } from '../../../utils/validators/validators';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuthRedirect from '../../../hoc/WithAuthRedirect';
import { createMessageRequest  } from '../../../redux/chats-reducer';

import styleMessages from './Message.module.scss'; 
import { useRef } from 'react';


const styleButtons = {
    visibility: "hidden"
}

const CreateMessageForm = props => {
    const { handleSubmit, pristine, reset, submitting, error } = props
    
    const refSubmit = useRef(null);

    const onCTRLEnt = (e) => {
        if(e.keyCode===13 && e.ctrlKey){  
            e.target.value += '\r\n';
        } else if(e.keyCode===13) { 
            refSubmit.current.click()
        }
    } 

    // TIP there is problems
    return (
        <form onSubmit={handleSubmit} className={styles.redux_form}  > 
            {createField('Write a message...', 'messageBody', TextArea, [maxLength1000], {onCTRLEnt: onCTRLEnt.bind(this)})}
            {createField('Upload a file...', 'uploadedFile', FileInput, null, {type: "file"})}  
            {
            error && 
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div className={ styles.formButtons}> 
                <button type='button' disabled={pristine || submitting} onClick={reset}>Clear</button>
                <button type='submit' disabled={pristine || submitting} ref={refSubmit}>Send</button>
            </div> 
        </form>
    )
}


// const msgCreationStyleForm = {
//     color: 'green'
// }

const CreateMessageReduxForm = reduxForm({form: 'CreateMessage'})(CreateMessageForm)

const CreateMessage = (props) => {
    const onSubmit = (formData) => {
        if(!formData['messageBody'] && formData["uploadedFile"]){
            formData['messageBody'] = ' '
        }
        formData["uploadedFile"] ?
            props.createMessageRequest(props.chatTypeId, props.chatId, formData["messageBody"], formData["uploadedFile"]) :
            props.createMessageRequest(props.chatTypeId, props.chatId, formData["messageBody"])
    }
    return ( 
        <>
            <div className={styleMessages.createMessageFormH}>Message</div>
            <CreateMessageReduxForm onSubmit={onSubmit}/>   
        </>
    )
}


export default compose(
    withAuthRedirect,
    connect(null, {createMessageRequest}),
)(CreateMessage);
