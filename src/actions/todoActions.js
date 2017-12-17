import firebase from 'firebase';
import { hashHistory } from 'react-router';
import {
  TODO_FORM_RESET,
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
    firebase.database().ref(`/users/${currentUser.uid}/todos/${type}/tasks`)
    .push(data)
    .then((res) => {
      dispatch({ type: TODO_FORM_RESET });
      dispatch(fetchTodos());
      // dispatch({ type: ADD_TODO_TASK_SUCCESS, payload: {task, type, id: res.key, data} });
    })
    .catch((error) => {
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

export function deleteCompleted(data){
  if(data != null){
    let currentData = data[data.type];
    let deleteEnabled = false;
    const user = firebase.auth().currentUser;
    for(let i in currentData){
      if(currentData[i].completed){
        deleteEnabled = true;
        currentData[i] = null;  
      }
    }
    if(deleteEnabled){
      return (dispatch) => {
        firebase.database().ref(`users/${user.uid}/todos/${data.type}/tasks`).update(currentData)
        .then(() =>{
          dispatch(fetchTodos());
        });
      }
    }
    return () => {};
  }
  return () => {};
}