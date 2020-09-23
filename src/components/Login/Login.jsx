import React from 'react';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { requiredField } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from '../common/FormsControls/FormsControls.module.scss'

// can show the summary error
// form-level validation
const LoginForm = props => {
    const { handleSubmit, pristine, reset, submitting, error } = props
    return (
        <form onSubmit={handleSubmit}>
            {createField('Login', "login", Input, [requiredField])}
            {createField('Password', "password", Input, [requiredField], {type: "password"})}
            {
            error && 
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div className=''>
                <button type='submit' disabled={pristine || submitting} >Login</button>
            </div>
            <div className=''>
                <button type='button' disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form:'login'})(LoginForm)


const Login = (props) => {
    // debugger
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password)
    }
    if(props.isAuth) return (<Redirect to='/profile'/>)

    return (<>
        <div className=''>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
        </>)
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});


export default connect(mapStateToProps, {login})(Login);