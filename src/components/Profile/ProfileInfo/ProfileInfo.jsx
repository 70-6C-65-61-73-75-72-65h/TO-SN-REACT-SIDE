// import React from 'react';
// import s from './ProfileInfo.module.css';
// import Preloader from '../../common/Preloader/Preloader';

// const ProfileInfo = (props) => {
//     if (!props.profile) {
//         return <Preloader />
//     }
//     return (
//         <div className={s.profile_info}>
//             <div className={s.landi_block}>
//                 <img
//                     src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
//             </div>
//             <div className={s.descriptionBlock}>
//                 <div className={s.ava_block}>
//                     <img src={props.profile.photos.large} alt={`PHOTO OF ${props.profile.name}`}/>
//                 </div>
//                 <div className={s.username}>{props.profile.name}</div>
//                 <div className={s.userinfo}>BIO: Date of Birth: 19 Jan 1997</div>
//             </div>
//         </div>
//     )
// }

// export default ProfileInfo;


import React from 'react';
import s from './ProfileInfo.module.scss';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { NavLink } from 'react-router-dom';

const ProfileInfo = ({ profile, updateStatus, updatePhoto, ENSM }) => {

    if (!profile) {
        return <Preloader />
    }
    console.log(profile.photos.large)
    return (
        <div className={s.profile_info}>
            <div className={s.landi_block}>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' />
            </div>
            <div className={s.descriptionBlock}>
                <div className={s.ava_block}>
                    <img src={profile.photos.large} alt='ProfilePhoto' />
                </div>
                <div className={s.username}>USERNAME: {profile.name}</div>
                <div className={s.userinfo}>
                    <div>
                        BIO: Date of Birth: 19 Jan 1997
                    </div>
                    <ProfileStatusWithHooks status={profile.status} updateStatus={updateStatus} ENSM={ENSM}/>
                    img url: <a target="_blank" href={profile.photos.large}>Get Photo</a>
                </div>

                {/* <ProfileStatusWithHooks status={profile.status} updateStatus = {updateStatus}/>
                <ProfilePhotos photos={profile.photos} updatePhoto = {updatePhoto}/> */}
            </div>
        </div>
    )
}

export default ProfileInfo;