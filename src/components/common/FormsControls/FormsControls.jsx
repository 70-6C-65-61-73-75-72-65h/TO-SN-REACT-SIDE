import React from 'react';
import styles from './FormsControls.module.css'
import { Field } from 'redux-form';

import PropTypes from 'prop-types';

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
    return (<FormControl {...props}><input {...input} {...restProps} /></FormControl>)
}



// export const Select = (props) => {
//     const { input, meta, child, ...restProps } = props;
//     return (<FormControl {...props}>
//         <select {...input} {...restProps}>
//         </select>
//         </FormControl>)
// }

export const createField = (placeholder, name, component, validators, props={}, text="") => { 
    return <div className=''><Field placeholder={placeholder} name={name} component={component} validate={validators} {...props}/>{text}</div>
};


class DropDownSelect extends React.Component { // eslint-disable-line react/prefer-stateless-function

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

export default DropDownSelect;


// export const Select = (props) => {
//     const { input, meta, child, ...restProps } = props;
//     // console.log('Input input: ' + input)
//     // console.log('Input meta: ' + meta)
//     // console.log('Input child: ' + child)
//     // console.log('Input restProps: ' + restProps)
//     // console.log('Input props: ' + props)
//     return (<FormControl {...props}><DropDownSelect {...input} {...restProps} /></FormControl>)
// }