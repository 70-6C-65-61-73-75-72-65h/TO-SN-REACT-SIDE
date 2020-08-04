import React from 'react';

// import Paginator from "../common/Paginator/Paginator";
import User, { ForChatUser } from "./User";
import Paginator from '../common/Paginator/Paginator';


let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, forChat=false, setSelectedForChatUsers, selectedForChatUsers, styleForUsers, styleForUser , ...props}) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => forChat ? <ForChatUser user={u}

                                    setSelectedForChatUsers ={setSelectedForChatUsers}
                                    selectedForChatUsers={selectedForChatUsers}
                                    styleForUser= {styleForUser}

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