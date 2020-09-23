import React, {useState}  from 'react';
import styles from '../../common/FormsControls/FormsControls.module.css'
import { createField, TextArea, FileInput, Input } from '../../common/FormsControls/FormsControls';
import { maxLength1000 } from '../../../utils/validators/validators';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuthRedirect from '../../../hoc/WithAuthRedirect';
import { createMessageRequest  } from '../../../redux/chats-reducer';

const CreateMessageForm = props => {
    const { handleSubmit, pristine, reset, submitting, error } = props


    // const [selectedFiles, setSelectedFiles] = useState(undefined);
    // const selectFile = (event) => {
    //   setSelectedFiles(event.target.files);
    // };


    // const [file, setFile] = useState({
    //     selectedFiles: undefined,
    //     currentFile: undefined,
    //     progress: 0,
    //     message: "",
  
    //     fileInfos: [],
    //   })

    // const selectFile = (ev) => {
    //     setFile({
    //         selectedFiles: ev.target.files,
    //     });
    // }

    // TIP there is problems
    return (
        <form onSubmit={handleSubmit}>
            {createField('Write a message...', 'messageBody', TextArea, [maxLength1000])}
            {createField('Upload a file...', 'uploadedFile', FileInput, null, {type: "file"})} 
            {
            error && 
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div className=''>
                <button type='submit' disabled={pristine || submitting}>Send</button>
            </div>
            <div className=''>
                <button type='button' disabled={pristine || submitting} onClick={reset}>Clear</button>
            </div>
        </form>
    )
}


const msgCreationStyleForm = {
    color: 'green'
}

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
        <div className=''>
            <div style={msgCreationStyleForm}>Message:</div>
            <CreateMessageReduxForm onSubmit={onSubmit}/>   
        </div>
    )
}


export default compose(
    withAuthRedirect,
    connect(null, {createMessageRequest}),
)(CreateMessage);
