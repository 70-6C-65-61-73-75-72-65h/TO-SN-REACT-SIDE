import React, { useState } from 'react';
import styles from './FormsControls.module.css'
import { Field } from 'redux-form';

import PropTypes from 'prop-types';


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