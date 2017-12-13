import firebase from 'firebase';
import { hashHistory } from 'react-router';
import {
  FORM_RESET,
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  TODO_TITLE_CHANGED,
  TODO_TASK_TITLE_CHANGED,
  ADD_TODO_TITLE,
  ADD_TODO_TITLE_SUCCESS,
  ADD_TODO_TASK,
  ADD_TODO_TASK_SUCCESS,
  COMPLETE_TODO_TASK,
  DELETE_TODO,
  EDIT_TODO_TASK
} from './types';

export function titleChanged(text) {
  return {
    type: TODO_TITLE_CHANGED,
    payload: text
  };
}

export function taskTitleChanged(text) {
  return {
    type: TODO_TASK_TITLE_CHANGED,
    payload: text
  };
}


export function addTodo(title) {
  const { currentUser } = firebase.auth();
  console.log(title);
  let tasks = ['kajdskajsd', 'asdsad'];
  return (dispatch) => {
    dispatch({ type: ADD_TODO_TITLE });
    let dateStamp = new Date().toString();
    return firebase.database().ref(`/users/${currentUser.uid}/todos`)
    .push({ title, tasks: tasks, dateStamp: dateStamp })
    .then(() => {
      dispatch({ type: ADD_TODO_TITLE_SUCCESS });
      hashHistory.push('/todos');
    })
    .catch((error) => {
      // return addNoteFail(dispatch, error.message);
    });
  };
}

export function addTask(task, id = '') {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: ADD_TODO_TASK });
    return firebase.database().ref(`/users/${currentUser.uid}/todos/${id}/tasks`)
    .push(task)
    .then(() => {
      dispatch({ type: ADD_TODO_TASK_SUCCESS });
      hashHistory.push('/todos');
    })
    .catch((error) => {
      // return addNoteFail(dispatch, error.message);
    });
  };
}

// export function updateNote(post, id) {
//   const { currentUser } = firebase.auth();
//   let dateStamp = new Date().toString();
//   return (dispatch) => {
//     dispatch({ type: UPDATE_NOTE });
//     return firebase.database().ref(`/users/${currentUser.uid}/posts/${id}`)
//     .set({
//       title: post.title,
//       description: post.description,
//       dateStamp: dateStamp })
//     .then(() => {
//       dispatch({ type: UPDATE_NOTE_SUCCESS, payload: post });
//     })
//   };
// }


// export function addNoteFail(dispatch, error) {
//   dispatch({
//     type: ADD_NOTE_FAIL,
//     payload: error
//   });
// }

// export function fetchPosts() {
//   const { currentUser } = firebase.auth();
//   if(currentUser.emailVerified){
//     return (dispatch) => {
//       dispatch({ type: FETCH_TODOS });
//       return firebase.database().ref(`/users/${currentUser.uid}/posts`)
//       .once('value', snapshot => {
//         dispatch({ type: FETCH_TODOS_SUCCESS, payload: snapshot.val() });
//         resetMultiSelect(snapshot.val());
//       });
//     };
//   }
//   hashHistory.push('/verify-email');
// }

// export function editNote(post) {
//   return (dispatch) => {
//     dispatch({
//       type: EDIT_IN_PROGRESS,
//       payload: post
//     });
//   };
// }


// export function deleteNote(id) {
//   const user = firebase.auth().currentUser;
//   return () => {
//     firebase.database().ref(`users/${user.uid}/posts/`).child(id).remove()
//     .then(() => {
//         hashHistory.push('/posts');
//         fetchPosts();
//       });
//   };
// }



// export function titleUpdated(text, id) {
//   return {
//     type: TITLE_UPDATED,
//     payload: text,
//     postId: id
//   };
// }

// export function descriptionUpdated(text, id) {
//   return {
//     type: DESCRIPTION_UPDATED,
//     payload: text,
//     postId: id
//   };
// }