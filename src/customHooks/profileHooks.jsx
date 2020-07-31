// import { useState, useEffect } from 'react';
// // import { getUserProfile } from '../redux/profile-reducer';



// // userId = props.userId, paramsUserId = props.match.params.userId, effectFunction (getUserProfile) = getUserProfile
// export const useProfileGetting = (myProfile, effectFunction, userId, paramsUserId = null) => {
//       const [profile, setProfile] = useState(myProfile); // if local profile === null => getProfile : dont do this

//         // в первый раз у нас при заходе на стр пустой профайл - потому делаем setProfile=null 
//         // => при изменении setProfile - перерисовка опять
//     useEffect(() => { // while container component mount and then while updating
//         setProfile(myProfile)
//     }, [myProfile]);

//     // return isOnline;
// }

