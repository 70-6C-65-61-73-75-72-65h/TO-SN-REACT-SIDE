import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from "react-router-dom";
// import {posts, messages, dialogs} from './redux/state'; для не дефолтного експорта надо куча приемников и расширения файла а  не путь к модулю
import state from './redux/state';
import {addPost, updateNewPostText, callback_tree} from './redux/state.js';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

let renderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <App state={state} addPost={addPost}  updateNewPostText={updateNewPostText}/>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
renderEntireTree();
callback_tree(renderEntireTree)
// renderEntireTree(state, addPost, updateNewPostText);

serviceWorker.unregister();
