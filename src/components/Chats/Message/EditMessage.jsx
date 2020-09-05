/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useHotEditing } from '../../../customHooks/hotEditing';
import styleMessages from './Message.module.css';
import { maxLength1000 } from '../../../utils/validators/validators';

import { saveAs } from 'file-saver';


const EditMessageActive = ({isInvalid, onMBChange, deactivateEditMode, editedMessage, charCount}) => {
    return (<div className={styleMessages.editMessage}>
        <textarea className={isInvalid ? `${styleMessages.editField} ${styleMessages.error}`: `${styleMessages.editField}`} onChange={onMBChange} autoFocus={true} onBlur={deactivateEditMode}
            value={editedMessage} />
        {
            isInvalid && <div className={styleMessages.errorField}>Invalid Data</div>
        }
        <div className={styleMessages.countChars}>{charCount}</div>
    </div>)
}

const EditMessageInactive = ({fileId, activateEditMode, messageBody, fileImageURL, loadFile, ENSM}) => { 
    if (fileId){
        return ( <div className={styleMessages.messageBody} onDoubleClick={!ENSM? activateEditMode: undefined}> {messageBody} 
            <div className={`${styleMessages.messageFile} ${fileImageURL===null ? styleMessages.fileImageDeactivate : styleMessages.fileImageActivate}`}>
                        <span>+ fileId: {fileId}</span>
                        <button onClick={()=>loadFile(fileId)}>GetFile</button> 
                        <img src={fileImageURL}/>
                </div>
            </div>)
    } else {
        return (<div className={styleMessages.messageBody} onDoubleClick={!ENSM? activateEditMode: undefined}>{messageBody}</div>)
    }
    
}

function urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
}


export const EditMessage = ({messageBody, editMessage, ENSM, fileId, getFile}) => {
    const [activateEditMode, deactivateEditMode, onMBChange, editMode, editedMessage, isInvalid, charCount] = useHotEditing(messageBody, editMessage, [maxLength1000], 1000) 

    const [fileImageURL, setFII] = useState(null)
    const loadFile = async(fileId) => { // click -> then it will loaded to explorer or added as src to img
        let file = await getFile(fileId)
        if(file.name){

            console.log(file)
        
            if(!file.isImage){
                urltoFile(file, file.name, file.format)
                .then(function(file){ 
                    console.log(file);
                        saveAs(file); });
            } else {

                urltoFile(file.file, file.name, file.format)
                .then(function(file){ 
                    let reader = new FileReader();
                    reader.onload = function(upload) {
                        setFII(upload.target.result)
                        console.log(upload);
                        console.log(upload.target.result);
                        console.log("Uploaded");
                    }
                    reader.readAsDataURL(file);})
            }

        } else {
            console.log('error in getting file from api')
        }
        
    }
    return ( 
            <>
                {!editMode && 
                <EditMessageInactive fileId={fileId} activateEditMode={activateEditMode} messageBody={messageBody} fileImageURL={fileImageURL} loadFile={loadFile.bind(this)} ENSM={ENSM}/>
                }
                {editMode &&
                <EditMessageActive isInvalid={isInvalid} onMBChange={onMBChange} deactivateEditMode={deactivateEditMode} editedMessage={editedMessage} charCount={charCount} />
                }
            </>  
    )
}
