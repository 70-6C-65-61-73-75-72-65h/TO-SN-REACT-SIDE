import React from 'react';
import { useHotEditing } from '../../../customHooks/hotEditing';
import { maxLength30 } from '../../../utils/validators/validators';


// if i want field level validation better i have to use redux-form than localState (hooks)
const ProfileStatusWithHooks = (props) => {
    const [activateEditMode, deactivateEditMode, onStatusChange, editMode, status, isInvalid, charCount] = useHotEditing(props.status, props.updateStatus, [maxLength30], 30)

    return (
        <div className=''>
            {!props.ENSM ?
                <div>
                    {!editMode &&
                        <div>
                            <span onDoubleClick={activateEditMode}>Status: {props.status || "-------"}</span>
                        </div>
                    }
                    {editMode &&
                        <div>
                            <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                                value={status} />
                        </div>
                    }
                </div>
                :
                <div>
                    <div>
                        <span>Status: {props.status || "-------"}</span>
                    </div>
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;