import firebase from 'firebase';
import { hashHistory } from 'react-router';
import {
  FORM_RESET,
  TITLE_CHANGED,
  TITLE_UPDATED,
  DESCRIPTION_CHANGED,
  DESCRIPTION_UPDATED,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAIL,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  EDIT_IN_PROGRESS,
  UPDATE_NOTE,
  UPDATE_NOTE_SUCCESS,
  NOTE_SELECTED
} from './types';

export function titleChanged(text) {
  return {
    type: TITLE_CHANGED,
    payload: text
  };
}

export function descriptionChanged(text) {
  return {
    type: DESCRIPTION_CHANGED,
    payload: text
  };
}

export function titleUpdated(text, id) {
  return {
    type: TITLE_UPDATED,
    payload: text,
    postId: id
  };
}

export function descriptionUpdated(text, id) {
  return {
    type: DESCRIPTION_UPDATED,
    payload: text,
    postId: id
  };
}

export function addNote(title, description) {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: ADD_NOTE });
    let dateStamp = new Date().toString();
    return firebase.database().ref(`/users/${currentUser.uid}/posts`)
    .push({ title, description, dateStamp: dateStamp })
    .then(() => {
      dispatch({ type: ADD_NOTE_SUCCESS });
      fetchPosts();
      hashHistory.push('/posts');
    })
    .catch((error) => {
      return addNoteFail(dispatch, error.message);
    });
  };
}

export function updateNote(post, id) {
  const { currentUser } = firebase.auth();
  let dateStamp = new Date().toString();
  return (dispatch) => {
    dispatch({ type: UPDATE_NOTE });
    return firebase.database().ref(`/users/${currentUser.uid}/posts/${id}`)
    .set({
      title: post.title,
      description: post.description,
      dateStamp: dateStamp })
    .then(() => {
      dispatch({ type: UPDATE_NOTE_SUCCESS, payload: post });
    })
  };
}


export function addNoteFail(dispatch, error) {
  dispatch({
    type: ADD_NOTE_FAIL,
    payload: error
  });
}

export function fetchPosts() {
  const { currentUser } = firebase.auth();
  if(currentUser.emailVerified){
    return (dispatch) => {
      dispatch({ type: FETCH_POSTS });
      return firebase.database().ref(`/users/${currentUser.uid}/posts`)
      .once('value', snapshot => {
        dispatch({ type: FETCH_POSTS_SUCCESS, payload: snapshot.val() });
        resetMultiSelect(snapshot.val());
      });
    };
  }
  hashHistory.push('/verify-email');
}

export function getPostDetails(id, number) {
  if(!number){
    number = Math.floor(Math.random() * 5) + 1;
  }
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: GET_POST_DETAILS });
    return firebase.database().ref(`/users/${currentUser.uid}/posts/${id}`)
    .on('value', snapshot => {
      // let username = (snapshot.val() && snapshot.val().title);
      dispatch({ type: GET_POST_DETAILS_SUCCESS, payload: snapshot.val(), id: id, number: number  });
      hashHistory.push(`/posts/${id}`);
      // this.context.router.push(`/posts/${this.props.post.uniqueid}`);
    });
  };
}

export function editNote(post) {
  return (dispatch) => {
    dispatch({
      type: EDIT_IN_PROGRESS,
      payload: post
    });
  };
}


export function deleteNote(id) {
  const user = firebase.auth().currentUser;
  return () => {
    firebase.database().ref(`users/${user.uid}/posts/`).child(id).remove()
    .then(() => {
        hashHistory.push('/posts');
        fetchPosts();
      });
  };
}

export function multiDelete(data){
  const user = firebase.auth().currentUser;
  return () => {
    for(let i in data){
      if(data[i]){
        data[i] = null;
      }else{
        delete data[i];
      }
    }
    firebase.database().ref(`users/${user.uid}/posts/`).update(data)
    .then(() => {
      hashHistory.push('/');
      return {
        type: FORM_RESET
      };
    })
  }
}

export function multiselect(id){
  return {
    type: NOTE_SELECTED,
    payload: id
  };
}

export function resetMultiSelect(data){
  if(data){
    return () => {
      for(let i in data){
        delete data[i];
      }
    }
  }else{
    return () => {}
  }
}