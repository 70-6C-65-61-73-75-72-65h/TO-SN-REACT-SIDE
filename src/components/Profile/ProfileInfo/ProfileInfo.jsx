import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../../common/Preloader/Preloader';

const ProfileInfo = (props) => {
    console.log(props);
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.profile_info}>
            <div className={s.landi_block}>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
            </div>
            <div className={s.descriptionBlock}>
                <div className={s.ava_block}>
                    <img src={props.profile.photos.large} alt='DragonUser'/>
                </div>
                <div className={s.username}>Maxus</div>
                <div className={s.userinfo}>Date of Birth: 19 Jan 1997</div>
            </div>
        </div>
    )
}

export default ProfileInfo;