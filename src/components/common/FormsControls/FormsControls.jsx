import React, { useEffect, useState } from 'react';
import styles from './FormsControls.module.scss'
import { Field } from 'redux-form';

import PropTypes from 'prop-types';
import { chatsAPI } from '../../../api/api';


// import MultiSelect from "react-multi-select-component";


// how to show that we dont pass the field validation before submitting ( or after )
// field-level validation
const FormControl = ({ input, meta: {touched, error, warning}, children }) => { // children = <input {...input} {...restProps} /> or children = <input {...input} {...restProps} />
    const hasError = touched && error;
    const hasWarn = touched && warning;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error: "") + ' ' + (hasWarn ? styles.warning: "")}>
            <div className=''>
                {children}
            </div>
            <div className=''>
                {
                (hasError && <span>{error}</span>) ||
                (hasWarn && <span>{warning}</span>)
                }
            </div>
        </div>
    )
}


export const TextArea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return (<FormControl {...props}><textarea {...input} {...restProps} /></FormControl>)
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    // console.log('Input input: ' + input)
    // console.log('Input meta: ' + meta)
    // console.log('Input child: ' + child)
    // console.log('Input restProps: ' + restProps)
    // console.log('Input props: ' + props)
    return (<FormControl {...props}><input {...input} {...restProps}/></FormControl>)
}



// export const UploadFiles = ({fileId}) => {

//     const [selectedFiles, setSelectedFiles] = useState(undefined);
//     const [currentFile, setCurrentFile] = useState(undefined);
//     const [progress, setProgress] = useState(0);
//     const [message, setMessage] = useState("");

//     const [fileInfos, setFileInfos] = useState([]);


//     const selectFile = (event) => {
//         setSelectedFiles(event.target.files);
//       };

//     const upload = () => {
//         let currentFile = selectedFiles[0];
    
//         setProgress(0);
//         setCurrentFile(currentFile);
    
//         chatsAPI.uploadFile(currentFile, (event) => {
//           setProgress(Math.round((100 * event.loaded) / event.total));
//         })
//           .then((response) => {
//             setMessage(response.data.message);
//             return chatsAPI.getFile(fileId);
//           })
//           .then((files) => {
//             setFileInfos(files.data);
//           })
//           .catch(() => {
//             setProgress(0);
//             setMessage("Could not upload the file!");
//             setCurrentFile(undefined);
//           });
    
//         setSelectedFiles(undefined);
//       };

//     useEffect(() => {
//         chatsAPI.getFile(fileId).then((response) => {
//           setFileInfos(response.data);
//         });
//       }, []);

//     return (
//       <div>
//         {currentFile && (
//           <div className="progress">
//             <div
//               className="progress-bar progress-bar-info progress-bar-striped"
//               role="progressbar"
//               aria-valuenow={progress}
//               aria-valuemin="0"
//               aria-valuemax="100"
//               style={{ width: progress + "%" }}
//             >
//               {progress}%
//             </div>
//           </div>
//         )}
  
//         <label className="btn btn-default">
//           <input type="file" onChange={selectFile} />
//         </label>
  
//         <button
//           className="btn btn-success"
//           disabled={!selectedFiles}
//           onClick={upload}
//         >
//           Upload
//         </button>
  
//         <div className="alert alert-light" role="alert">
//           {message}
//         </div>
  
//         <div className="card">
//           <div className="card-header">List of Files</div>
//           <ul className="list-group list-group-flush">
//             {fileInfos &&
//               fileInfos.map((file, index) => (
//                 <li className="list-group-item" key={index}>
//                   <a href={file.url}>{file.name}</a>
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     );
//   };

  


// export const FileInput = (props) => {
//     // TIP there is problems
    
//     const { input, meta, child, ...restProps } = props;
//     return (<FormControl {...props}>  <input {...input} {...restProps}/> </FormControl>)

// }
// // <input {...input} {...restProps}/> onChange={props.selectFile}


// export class FileInput extends React.Component {
export const FileInput = (props) => {

    const { input, meta, child, ...restProps } = props;

    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  
    const onFileChange = async (e) => {
      const { input } = props
      const targetFile = e.target.files[0]
      if (targetFile) {
        const val = await getBase64(targetFile) 
        input.onChange({'fileURL': val, 'fileName':targetFile.name})
      } else {
        input.onChange(null)
      }
    }
 
    const fileInputKey = input.value ? input.value.name : +new Date();

      return (
    //   <>
        <input 
            key={fileInputKey}
            type="file"
            onChange={onFileChange} 
        />
        
      ) 
  }
  

// export const MultiSelectWrap = (props) => {
//     debugger
//     // const { meta, child, ...restProps } = props; // input
//     // console.log(...restProps)
//     // debugger
//     // console.log('Input input: ' + input)
//     // console.log('Input meta: ' + meta)
//     // console.log('Input child: ' + child)
//     // console.log('Input restProps: ' + restProps)
//     // console.log('Input props: ' + props)
//     return (<FormControl {...props}><MultiSelect options={props.optionsMS} 
//         value={props.valueMS} 
//         onChange={props.onChangeMS}
//         labelledBy={props.labelledByMS} /></FormControl>)
// }




// export const Select = (props) => {
//     const { input, meta, child, ...restProps } = props;
//     return (<FormControl {...props}>
//         <select {...input} {...restProps}>
//         </select>
//         </FormControl>)
// }
/// как возвращять полученый список в редакс форм
// const ForChatUsersList = () => {
//     // const onSubmitMemberList = () => {

//     // }
//     const [] = useState // selectedMembers
// return (
//     <UsersContainer />
// )
// }

// export const ForChatUsersListWrap = (props) => {
//     // debugger
//     // return (<FormControl {...props}><ForChatUsersList /></FormControl>)
//     return <ForChatUsersList />
// }

export const createField = (placeholder, name, component, validators, props={}, text="") => { 
    return <div className=''><Field placeholder={placeholder} name={name} component={component} validate={validators} {...props}/>{text}</div>
};


export class DropDownSelect extends React.Component { // eslint-disable-line react/prefer-stateless-function

    renderSelectOptions = (person) => (
        <option key={person.userId} value={person.userId}>{person.name}</option>
    )

    render() {
        const { input, label } = this.props;
        return (
        <div>
            {/* <label htmlFor={label}>{label}</label> */}
            <select {...input}>
            <option value="">Select</option>
            {this.props.people.map(this.renderSelectOptions)}
            </select>
        </div>
        );
    }
}

DropDownSelect.propTypes = {
    people: PropTypes.array,
    input: PropTypes.object,
    label: PropTypes.string,
};



export const ReduxFormSnippet = ({ pristine, reset, submitting, error, sumbitButtonName } ) => {
    return (
        <>
        {
            error && 
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div className=''>
                <button type='submit' disabled={pristine || submitting} >{sumbitButtonName}</button>
            </div>
            <div className=''>
                <button type='button' disabled={pristine || submitting} onClick={reset}>Clear</button>
            </div>
        </>
    )
}

// export const Select = (props) => {
//     const { input, meta, child, ...restProps } = props;
//     // console.log('Input input: ' + input)
//     // console.log('Input meta: ' + meta)
//     // console.log('Input child: ' + child)
//     // console.log('Input restProps: ' + restProps)
//     // console.log('Input props: ' + props)
//     return (<FormControl {...props}><DropDownSelect {...input} {...restProps} /></FormControl>)
// }