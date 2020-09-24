import React from 'react';
import { createField, Input } from '../common/FormsControls/FormsControls';
import { reduxForm } from 'redux-form';
import { maxLength50 } from '../../utils/validators/validators';
import styles from '../common/FormsControls/FormsControls.module.scss'
import { searchUsers , setQuery} from '../../redux/users-reducer';
import { connect } from 'react-redux';
import {getCurrentPage, getQuery} from "../../redux/users-selectors";

const UsersSearchForm = props => {
    const { handleSubmit, pristine, reset, submitting, error, query } = props
    return (
        <form onSubmit={handleSubmit} autoComplete='off'>
            {createField(query, "search", Input, [maxLength50], {defaultValue: ''})}
            {
            error && 
            <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div className=''>
                <button type='submit' disabled={submitting} >Run</button>
            </div>
            <div className=''>
                <button type='button' disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

const UsersSearchReduxForm = reduxForm({form:'UsersSearch'})(UsersSearchForm)

const UsersSearch = (props) => {
    const onSubmit = (formData) => {
        props.setQuery(formData.search)
        props.searchUsers(props.currentPage, formData.search)
    }
    // if(props.isAuth) return (<Redirect to='/profile'/>)

    return (<>
        <div className=''>
            <label htmlFor="">SEARCH: </label><UsersSearchReduxForm onSubmit={onSubmit}  />
        </div>
        </>)
}

const mapStateToProps = (state) => ({
    currentPage: getCurrentPage(state),
    query: getQuery(state),
});


export default connect(mapStateToProps, {searchUsers, setQuery})(UsersSearch);
