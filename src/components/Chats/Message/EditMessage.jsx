import React from 'react';
import { useHotEditing } from '../../../customHooks/hotEditing';
import styleMessages from './Message.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { maxLength1000 } from '../../../utils/validators/validators';




export const EditMessage = ({messageBody, editMessage, ENSM}) => {
    const [activateEditMode, deactivateEditMode, onMBChange, editMode, editedMessage, isInvalid, charCount] = useHotEditing(messageBody, editMessage, [maxLength1000], 1000) 

    

    return (
        <>
            {!ENSM ?
                <>
                    {!editMode &&
                            <div className={styleMessages.messageBody}  onDoubleClick={activateEditMode} >{messageBody}</div>
                    }
                    {editMode &&
                        <div className={styleMessages.editMessage}>
                            <textarea className={isInvalid ? `${styleMessages.editField} ${styleMessages.error}`: `${styleMessages.editField}`} onChange={onMBChange} autoFocus={true} onBlur={deactivateEditMode}
                                value={editedMessage} />
                            {
                                isInvalid && <div className={styleMessages.errorField}>Invalid Data</div>
                            }
                            <div className={styleMessages.countChars}>{charCount}</div>
                        </div>
                    }
                </>
                :
                <>
                    <div className={styleMessages.messageBody}>{messageBody}</div>
                </>
            }
        </>
    )
}


// export default compose(
//     connect(null, {})
// )(EditMessage)

// import styles from '../../common/FormsControls/FormsControls.module.css'
// import { createField } from '../../common/FormsControls/FormsControls';


// const EditMessageForm = props => {
//     const {handleSubmit, pristine, reset, submitting, error} = props
//     return (
//         <form onSubmit={handleSubmit}>
//             {createField('Write a message...', 'messageBody', TextArea, [maxLength1000])}
//             {
//             error && 
//             <div className={styles.formSummaryError}>
//                 {error}
//             </div>
//             }
//             <div className=''>
//                 <button type='submit' disabled={pristine || submitting} >Send</button>
//             </div>
//             <div className=''>
//                 <button type='button' disabled={pristine || submitting} onClick={reset}>Clear</button>
//             </div>
//         </form>
//     )
// }

// createField

// TextArea



