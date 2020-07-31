// // import { login } from '../../redux/auth-reducer';
// // import Cookies from 'js-cookie';

// // export let checkCookiesData = () => {
// //     let new_token = Cookies.get("token") || null;
// //     let new_userId = Cookies.get("userId") || null;

// // }
// import React from 'react';
// import Cookies from 'js-cookie';
// // import { connect } from 'react-redux';
// // import { login } from '../../redux/auth-reducer';
// // Эта функция принимает компонент...

// export function withCookies(WrappedComponent) {
//     // ...и возвращает другой компонент...
//     return class extends React.Component {
//     //   constructor(props) {
//     //     super(props);
//     //     // при рефреше страниц или выходе на новую вкладку
//     //     // this.token = Cookies.get('token') !== undefined ? Cookies.remove('token') : null;
//     //     // this.userId = Cookies.get('userId') !== undefined ? Cookies.remove('userId') : null;
//     //     // this.handleChange = this.handleChange.bind(this);
//     //     // this.state = {
//     //     //   data: selectData(DataSource, props)
//     //     // };
//     //   }
  
//       componentDidMount() {
        
//         // ...который подписывается на оповещения...
//         // DataSource.addChangeListener(this.handleChange);
//       }

//         dropCookies() {
//             try{
//                 if(Cookies.get('token') !== undefined){
//                     Cookies.remove('token');
//                 }
//                 if(Cookies.get('userId') !== undefined){
//                     Cookies.remove('userId');
//                 }
//             } catch(error){
//                 console.log(`${error}`);
//                 return false;
//             }
//             return true;
//         }

//         // checkCookies = () => {
//         //     if(Cookies.get('token') !== undefined && Cookies.get('userId') !== undefined){
//         //         return true;
//         //     }
//         //     return false;
//         // }

//         setCookies() {
//             try {
//                 Cookies.set('token', this.props.token);
//                 Cookies.set('userId', this.props.userId);
//             } catch(error){
//                 console.log(`${error}`);
//                 return false;
//             }
//             return true;
//         }


  
//     //   componentWillUnmount() {
//     //     // DataSource.removeChangeListener(this.handleChange);
//     //   }
  
//     //   handleChange() {
//     //     this.setState({
//     //       data: selectData(DataSource, this.props)
//     //     });
//     //   }
  
//       render() {
//         // ... и рендерит оборачиваемый компонент со свежими данными!
//         // Обратите внимание, что мы передаём остальные пропсы
//         return <WrappedComponent {...this.props}
//             dropCookies={this.dropCookies}
//             setCookies={this.setCookies}
//             // checkCookies={this.checkCookies}
//         />;
//       }
//     }

// }


// // const mapStateToProps = (state) => ({
// //     // users: state.usersPage.users,
// //     // pageSize: state.usersPage.pageSize,
// //     // totalUsersCount: state.usersPage.totalUsersCount,
// //     // currentPage: state.usersPage.currentPage,
// //     // isFetching: state.usersPage.isFetching,
// //     // for fixing followed error (UNauthorized user because of lack token)
// //     // selfUserId: state.profilePage.selfUserId,
// //     // token: state.profilePage.token,
// //     // newPostText: state.profilePage.newPostText

// //     token: state.authPage.token,
// //     userId: state.authPage.userId,
// // });

// // export default connect(mapStateToProps, {login})(withCookies);
