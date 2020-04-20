import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <div className={s.profile_info}>
            <div className={s.landi_block}>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
            </div>
            <div className={s.descriptionBlock}>
                <div className={s.ava_block}>
                    <img src='https://image.freepik.com/free-vector/_79416-76.jpg' alt='DragonUser'/>
                </div>
                <div className={s.username}>Maxus</div>
                <div className={s.userinfo}>Date of Birth: 19 Jan 1997</div>
            </div>
        </div>
    )
}

export default ProfileInfo;