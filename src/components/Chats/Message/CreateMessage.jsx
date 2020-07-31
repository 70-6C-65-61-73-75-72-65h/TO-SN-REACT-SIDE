import React from 'react';
import styles from '../../common/FormsControls/FormsControls.module.css'
import { createField, TextArea } from '../../common/FormsControls/FormsControls';
import { maxLength1000 } from '../../../utils/validators/validators';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuthRedirect from '../../../hoc/WithAuthRedirect';
import { createMessageRequest  } from '../../../redux/chats-reducer';

const CreateMessageForm = props => {
    const { handleSubmit, pristine, reset, submitting, error } = props
    return (
        <form onSubmit={handleSubmit}>
            {createField('Write a message...', 'messageBody', TextArea, [maxLength1000])}
            {
            error && 
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div className=''>
                <button type='submit' disabled={pristine || submitting} >Send</button>
            </div>
            <div className=''>
                <button type='button' disabled={pristine || submitting} onClick={reset}>Clear</button>
            </div>
        </form>
    )
}

const CreateMessageReduxForm = reduxForm({form: 'CreateMessage'})(CreateMessageForm)

const CreateMessage = (props) => {
    const onSubmit = (formData) => {
        debugger
        props.createMessageRequest(props.chatTypeId, props.chatId, formData["messageBody"])
    }
    return (
        <div className=''>
            <div className=''>Message:</div>
            <CreateMessageReduxForm onSubmit={onSubmit}/>   
        </div>
    )
}

// let mapStateToProps = state => ({
//     isAuth: state.auth.isAuth,

// })

export default compose(
    withAuthRedirect,
    connect(null, {createMessageRequest}),
)(CreateMessage);
