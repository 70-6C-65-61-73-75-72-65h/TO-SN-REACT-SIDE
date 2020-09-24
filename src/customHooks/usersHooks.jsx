// import { useEffect } from "react";
// export const useUsersEffects = (getUsers, searchUsers, query, currentPage, pageSize) => {
//     useEffect(() => {
//         query==='' ? getUsers(currentPage, pageSize) : searchUsers(currentPage, query);
//     }, [currentPage])

//     const onPageChanged = (pageNumber) => {
//         query==='' ? getUsers(pageNumber, pageSize) : searchUsers(pageNumber, query);
//     }
//     return [onPageChanged]
// }