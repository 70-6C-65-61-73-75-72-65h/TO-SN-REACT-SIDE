/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useHotEditing } from '../../../customHooks/hotEditing';
import styleMessages from './Message.module.css';
import { maxLength1000 } from '../../../utils/validators/validators';
 
import { useRef } from 'react';
import { useEffect } from 'react';
import Preloader from '../../common/Preloader/Preloader';


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

// isFileFetching

const EditMessageInactive = ({fileId, activateEditMode, messageBody, fileImageURL, loadFile, ENSM }) => {  // , messageId => loadFile(messageId, fileId)
    if (fileId){
        return ( <div className={styleMessages.messageBody} onDoubleClick={!ENSM? activateEditMode: undefined}> {messageBody} 
            <div className={`${styleMessages.messageFile} ${fileImageURL===null ? styleMessages.fileImageDeactivate : styleMessages.fileImageActivate}`}>
                        {loadFile && <>
                            <span> + fileId: {fileId}</span>
                            <button onClick={()=>loadFile(fileId)}>GetFile</button> 
                        </>}

                        {/* <button onClick={()=>downloadFile(fileId)}>GetFile</button>  */}
                        <img src={fileImageURL} />
                        {/* {fileImageURL && <a  onClick={downloadFile} download={imageName}><img src={fileImageURL} /></a>} */}
                </div>
            </div>)
    } else {
        return (<div className={styleMessages.messageBody} onDoubleClick={!ENSM? activateEditMode: undefined}>{messageBody}</div>)
    }
    
}

 


export const EditMessage = ({messageBody, editMessage, ENSM, 
    fileId, fileIDBKey,  loadImageFromIDB,  
    getFile,
                            }) => {
    const [activateEditMode, deactivateEditMode, onMBChange, editMode, editedMessage, isInvalid, charCount] = useHotEditing(messageBody, editMessage, [maxLength1000], 1000) 
 

    const [isFetching, setIF] = useState(false)

    const [fileImageURL, setFIU] = useState(null) // fileIDBValue in fileImageURL 

    useEffect(() => { 
        if(!isFetching){ 
            console.log(fileIDBKey)  
            if( fileIDBKey && !fileImageURL){ 
                console.log(fileIDBKey)  
                setIF(true)
                async function loadFromIdb(fileIDBKey){  
                    console.log('loadFromIdb')
                    let fileIDBValue = await loadImageFromIDB(fileIDBKey) // like  image-chatTypeId-chatId-messageId
                    console.log("fileIDBValue for file IDB key: " + fileIDBKey)
                    console.log(fileIDBValue)
                    setFIU(fileIDBValue) 
                    setIF(false)
                }
                loadFromIdb(fileIDBKey)
            }

        } 
    },[fileIDBKey, loadImageFromIDB, fileImageURL, isFetching] ) // по идее запустится только 1 раз после открытия чатдитейл ( )


    if(fileIDBKey && fileImageURL===null) return <Preloader/>

    return ( 
            <>
                {!editMode && 
                <EditMessageInactive fileId={fileId} activateEditMode={activateEditMode} messageBody={messageBody} 
                fileImageURL={fileImageURL} 
                // loadFile={loadFile.bind(this)} 
                // messageId={messageId}
                loadFile={!fileImageURL ? getFile: undefined} // we cant get file if we already load from idb value for img:src
                ENSM={ENSM}
                
                // downloadFile={downloadFile}
                // imageName={imageName}
                />
                }
                {editMode &&
                <EditMessageActive isInvalid={isInvalid} onMBChange={onMBChange} deactivateEditMode={deactivateEditMode} editedMessage={editedMessage} charCount={charCount} />
                }
            </>  
    )
}

// tasks

// url browser add

// scss change and add

// validator create message make XoR-able

// photo and tap open in that window

