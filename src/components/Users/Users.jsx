import React from 'react';
import UserImg from '../../assets/images/user.jpg';
import styles from './Users.module.css'
import { NavLink } from 'react-router-dom';

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
    <div className=''>
    <div className=''>
        {pages.map(page => <span key={page} className={props.currentPage === page ? styles.selectedPage : null} onClick={() => props.onPageChanged(page)}>{page}</span>)}
    </div>
    {props.users.map(u =>
        <div key={u.userId}>
            <span>
                <div className=''>
                    <NavLink to={'/profile'+ u.userId}>
                    <img kek={u.photos?.small} src={u.photos?.small ? u.photos.small : UserImg} alt='Data' className={styles.userPhoto} />
                    </NavLink>
                </div>
                <div className=''>
                    {u.followed ? <button onClick={() => props.unfollow(u.userId)}>Unfollow</button> : <button onClick={() => props.follow(u.userId)}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>name: {u.name}</div>
                    <div className=''>uniqueurlname: {u.uniqueurlname ? u.uniqueurlname : "null"}</div>
                    <div>status: {u.status ? u.status : "null"}</div>
                </span>
                {/* <span>
        <div>{"u.location.country"}</div>
        <div>{"u.location.city"}</div>
    </span> */}
            </span>
        </div>)}
    </div>)
}


export default Users;