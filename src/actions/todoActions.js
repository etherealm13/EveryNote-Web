import firebase from 'firebase';
import { hashHistory } from 'react-router';
import {
  FORM_RESET,
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  TODO_TASK_TITLE_CHANGED,
  ADD_TODO_TITLE,
  ADD_TODO_TITLE_SUCCESS,
  ADD_TODO_TASK,
  ADD_TODO_TASK_SUCCESS,
  COMPLETE_TODO_TASK,
  DELETE_TODO,
  EDIT_TODO_TASK
} from './types';


export function taskTitleChanged(text, type) {
  return {
    type: TODO_TASK_TITLE_CHANGED,
    payload: text,
    titleType: type
  };
}

export function changeTodoStatus(data) {
    const { currentUser } = firebase.auth();
    if(currentUser != null){
      return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/todos/${data.type}/tasks/${data.taskData.uniqueid}/completed`)
         .set(!data.taskData.completed);
          let task = {...data.taskData, completed: !data.taskData.completed}
          dispatch({ type: COMPLETE_TODO_TASK, payload: data, newData: task });
      }
    }
  return () => {};
}

export function addTask(task, type = '') {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: ADD_TODO_TASK });
    let dateStamp = new Date().toString();
    let data = { task, dateStamp, completed: false };
    return firebase.database().ref(`/users/${currentUser.uid}/todos/${type}/tasks`)
    .push(data)
    .then((res) => {
      dispatch({ type: FORM_RESET });
      dispatch({ type: ADD_TODO_TASK_SUCCESS, payload: {task, type, id: res.key, data} });
      // fetchTodosWithType(type, currentUser.uid).then((res) => {
      //   dispatch({ type: FETCH_TODOS_SUCCESS, payload: res.val() });
      // })
    })
    .catch((error) => {
      // return addNoteFail(dispatch, error.message);
    });
  };
}

export function fetchTodos() {
    const { currentUser } = firebase.auth();
    if(currentUser != null){
      return (dispatch) => {
        return firebase.database().ref(`/users/${currentUser.uid}/todos`)
        .once('value', snapshot => {
          dispatch({ type: FETCH_TODOS_SUCCESS, payload: snapshot.val()});
        });
      } 
    }
  return () => {};
}


export function fetchTodosWithType(type = '', id = '') {
    return firebase.database().ref(`/users/${id}/todos`)
    .once('value', snapshot => {
      return { 
        type: FETCH_TODOS_SUCCESS, 
        payload: snapshot.val() 
      };
    });
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