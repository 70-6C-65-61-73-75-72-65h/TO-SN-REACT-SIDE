// const APPR_DIALOG_MESSAGES_LIGHTNING = 'APPR-DIALOG-MESSAGE-LIGHTNING';
const APPR_DIALOG_SELECT_MESSAGES = 'APPR-DIALOG-SELECT-MESSAGES';
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesCount: 12 },
                { id: 2, message: 'It\'s my first post', likesCount: 11 },
                { id: 3, message: 'Blabla', likesCount: 11 },
                { id: 4, message: 'Dada', likesCount: 11 }
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dimych' },
                { id: 2, name: 'Andrew' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'Sasha' },
                { id: 5, name: 'Viktor' },
                { id: 6, name: 'Valera' }
            ],
            messages: [
                { id: 1, message: 'Hi' },
                { id: 2, message: 'How is your it-kamasutra?' },
                { id: 3, message: 'Yo' },
                { id: 4, message: 'Yo' },
                { id: 5, message: 'Yo' }
            ],
            chosenDialogId: null,
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        // debugger;
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;  // observer
    },

    dispatch(action) {// obj {type: 'TODO ( ADD-POST )'}
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } 

        else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText; // newText
            this._callSubscriber(this._state);
        }

        else if (action.type === APPR_DIALOG_SELECT_MESSAGES) {
            if (this._state.dialogsPage.chosenDialogId === action.dialogId) return null;
            // if (this._state.dialogsPage.chosenDialogId === null)
            this._state.dialogsPage.chosenDialogId = action.dialogId; // newText
            this._callSubscriber(this._state);
        }

        // else if (action.type === APPR_DIALOG_MESSAGES_LIGHTNING) {
        //     let  this._state.dialogsPage.messages[action.dialogId]; // add prop 'activeMessage' to each obj of messages
        //     this._callSubscriber(this._state);
        // }

    },

}




export let addPostActionCreator = () => {
    return { type: ADD_POST };
}

export let updateNewPostTextActionCreator = (text) => {
    return { type: UPDATE_NEW_POST_TEXT, newText: text };
}

export let apprDialogSelectMessages = (dialogId) => {
    return { type: APPR_DIALOG_SELECT_MESSAGES, dialogId: dialogId };
}

// export let apprDialogMessagesLightning = (dialogId) => {
//     return { type: APPR_DIALOG_MESSAGES_LIGHTNING, dialogId: dialogId };
// }

// export let apprDialogSelectMessages = (dialogId) > {
    
// }

export default store;