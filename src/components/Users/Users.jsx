import React from 'react';

// import Paginator from "../common/Paginator/Paginator";
import User, { ForChatUser } from "./User";
import Paginator from '../common/Paginator/Paginator';


let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, forChat=false, 
                                                                                            setSelectedForChatUsers, setSelectedForChatUser,  chatUsersIds,
    selectedForChatUsers, styleForUsers, styleForUser , ...props}) => {
        // console.log('Users for ForChatUser')
        // console.log(chatUsersIds)
        // debugger
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => forChat ? <ForChatUser user={u}

                                    setSelectedForChatUsers ={setSelectedForChatUsers} // can be undef if it member adding
                                    setSelectedForChatUser={setSelectedForChatUser}
                                    selectedForChatUsers={selectedForChatUsers} // can be undef if it member adding
                                    styleForUser= {styleForUser}
                                    chatUsersIds = {chatUsersIds}

                                    // toogleFocuseElemArr={props.toogleFocuseElemArr}
                                    // usersForChatShow={props.usersForChatShow} 
                                    // setUsersForChatShow={props.setUsersForChatShow}
                                    fWAUFC={props.fWAUFC}
                                    clearCurrentFocusedWindow={props.clearCurrentFocusedWindow}



                                     key={u.id}/>                 
                                     :
                                     <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.unfollow}
                                     follow={props.follow}/>  
                )
            }
        </div>
    </div>
}

export default Users;