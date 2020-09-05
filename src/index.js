import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from "react-router-dom";
// import {posts, messages, dialogs} from './redux/state'; для не дефолтного експорта надо куча приемников и расширения файла а  не путь к модулю
// import state from './redux/state';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
// import serverUsers from './serverApi/serverUsers';

import reactDebugHooks from 'react-debug-hooks'
reactDebugHooks(React)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// let rerenderEntireTree = (state) => {
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

    {/* <Route exact path='https://localhost:3000/api/1.0/users' render={ () => <serverUsers />}/> */}

    <Provider store={store} >
      <App/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
  );
// }

// rerenderEntireTree(store.getState());
// // store.subscribe(rerenderEntireTree);

// store.subscribe(() => {
//   let state = store.getState();
//   rerenderEntireTree(state);
// });


// renderEntireTree(state, addPost, updateNewPostText);

serviceWorker.unregister();
