import profileReducer, { deletePost, addPost } from './profile-reducer.js'

it('len of posts shold be inc', () => {
  let action = addPost('new post text');
  let state = {
    posts: [ 
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ]
    };

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(5);
});


it('after deleting len of messages should be decrement', () => {
  let action = deletePost(1);
  let state = {
    posts: [ 
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ]
    };

  let newState = profileReducer(state, action);
  // console.log(state.posts.length - 1);
  expect(newState.posts.length).toBe(3);
});