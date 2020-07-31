import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm } from 'redux-form';
import { requiredField, maxLength30 } from '../../../utils/validators/validators';
import { createField, TextArea } from '../../common/FormsControls/FormsControls';
import {addPost} from "../../../redux/profile-reducer";
import {connect} from "react-redux";

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}> {/* + к этому контейнерная компонента  вызывает props.onSubmit*/}
            <div className=''>
                {createField('Write your post', "newPostText", TextArea, [requiredField, maxLength30])}
            </div>
            <div className=''>
                <button>Add post</button>
            </div>
        </form>
    )
}
// a unique name for the form
const AddNewPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm)

const MyPosts = (props) => {

    const onAddPost = (formData) => {
        // console.log(formData);
        props.addPost(formData.newPostText);
    }

    let postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

    return (
        <div className={s.postsBlock}>
            <div className={s.myPostsHeader}>My posts</div>
            <div className={s.createPost}>
                <AddNewPostFormRedux onSubmit={onAddPost} />
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
}

export default connect(mapStateToProps, {addPost})(MyPosts);


// import React from 'react';
// import s from './MyPosts.module.css';
// import Post from './Post/Post';


// const MyPosts = (props) => {
//     let postsElements =
//         props.posts.map( p => <Post message={p.message} likesCount={p.likesCount}/>);

//     let newPostElement = React.createRef();

//     let onAddPost = () => {
//         props.addPost();
//     }

//     let onPostChange = () => {
//         let text = newPostElement.current.value;
//         props.updateNewPostText(text);
//         // console.log(text);
//     }

//     return (
//         <div className={s.postsBlock}>
//             <div className={s.myPostsHeader}>My posts</div>
//             <div className={s.createPost}>
//                 <div>
//                     <textarea ref={newPostElement} value={props.newPostText} onChange={onPostChange}/>
//                 </div>
//                 <div>
//                     <button onClick={onAddPost}>Add post</button>
//                 </div>
//             </div>
//             <div className={s.posts}>
//                 { postsElements }
//             </div>
//         </div>
//     )
// }

// export default MyPosts;