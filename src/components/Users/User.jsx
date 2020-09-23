/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import styles from "./Users.module.scss";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {
    console.log(user)
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



export const ForChatUser = ({user, setSelectedForChatUsers, setSelectedForChatUser, selectedForChatUsers, chatUsersIds, styleForUser, ...props}) => {
    // console.log(user)
    // debugger followed // className={styleForUser}
    // console.log([...selectedForChatUsers.filter(selUserId => selUserId !== user.userId)])
    // console.log(selectedForChatUsers)
    return ( 
        <div>
            <NavLink to={'/profile/' + user.userId}>
                <div >{user.name}</div>
                <div className={styles.userChoosePhoto}><img src={user.photos.small} alt='Ava' /></div>
            </NavLink>
            { selectedForChatUsers 
            ?  
                selectedForChatUsers.includes(user.userId) ? 
                // setSelectedForChatUsers ?
                <a onClick={()=>{setSelectedForChatUsers( selectedForChatUsers.filter(selUserId => selUserId !== user.userId) )}}>Remove User</a> 
                // :
                // null
                // // null --- cause cant be anything - this bloack should be closed after 1 member choise 
                :
                <a onClick={()=>{setSelectedForChatUsers([...selectedForChatUsers, user.userId])}}>Add User</a> 

            :
                chatUsersIds.includes(user.userId) ? 
                    <div style={{color:"blue"}}>Chat Member</div>  
                : 

                 <a onClick={()=>
                    {
                     setSelectedForChatUser(user.userId);
                     console.log('after that should run inner function of useUserReducer '+ user.userId) 
                    //  props.clearCurrentFocusedWindow(props.fWAUFC) - dont work why???? but its better - cause i can choose a lot of users for adding to chat
                    }
                }>Add Member</a>  
             }
            
        </div>
             )
}


