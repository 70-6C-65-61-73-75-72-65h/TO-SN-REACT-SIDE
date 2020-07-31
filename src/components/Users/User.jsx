import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {
    // console.log(user)
    // debugger followed
    return (
       <div>
                <span>
                    <div>
                       <NavLink to={'/profile/' + user.userId}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                    <div>
                        {(user.userRelation === 'subscription' || user.userRelation === 'friend')
                        //['subscription', 'friend'].includes(user.userRelation)
                        ?
                            <button disabled={followingInProgress
                                .some(id => id === user.userId)}
                                      onClick={() => { unfollow(user.userId) }}>
                                Unfollow</button>
                        :
                        // ||
                        // (['subscriber', null].includes(user.userRelation) 
                        // &&
                            <button disabled={followingInProgress
                                .some(id => id === user.userId)}
                                      onClick={() => { follow(user.userId) }}>
                                      Follow</button>
                        }

                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    {/* <span>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </span> */}
                </span>
            </div>)
}

export default User;