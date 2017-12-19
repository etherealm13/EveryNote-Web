import firebase from 'firebase';
import { hashHistory } from 'react-router';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  EMAIL_CHANGED,
  SIGN_UP_USER,
  SIGN_UP_USER_FAIL,
  SIGN_UP_USER_SUCCESS,
  PASSWORD_CHANGED,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_REQUESTED,
  RESET_PASSWORD_REQUESTED,
  CONFIRM_PASSWORD_CHANGED,
  NEW_PASSWORD_CHANGED,
  VERIFY_PASSWORD_CODE,
  PASSWORD_CODE_VERIFIED,
  PASSWORD_CODE_INVALID,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  EMAIL_VERIFIED,
  EMAIL_LINK_SENT,
  SET_ERROR_MESSAGE,
  LOADING,
  FORM_RESET
} from './types';

export function checkAuth() {
  return (dispatch) => {
    dispatch({ type: LOADING });
    return firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        if(!user.emailVerified){
            firebase.auth().signOut()
            .then(() => {
              dispatch(emailUnVerified());
            })
        }
        dispatch({ type: USER_LOGGED_IN, payload: user });
      }else {
        dispatch({ type: USER_LOGGED_OUT });
      }
    });
  };
}

export function verifyEmail(code) {
  return (dispatch) => {
     firebase.auth().applyActionCode(code)
    .then(() => {
      dispatch({ type: EMAIL_VERIFIED });
      logoutUser();
    })
  };
}


export function sendEmailLink(user){
      let currentUser = null;
      if(user == null){
        currentUser = firebase.auth().currentUser;
      }
      else{
        currentUser = user;
      }

      currentUser.sendEmailVerification()
      .then(() => {
        return {
          type: EMAIL_LINK_SENT
        };
      })
  }

export function resetForm() {
  return {
    type: FORM_RESET
  };
}

export function emailChanged(text) {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
}

export function passwordChanged(text) {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
}

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(loginUserSuccess(user));
    }).catch((error) => {
      dispatch(loginUserFail( error.message));
    });
  };
}

export function signUpUser(email, password) {
  return (dispatch) => {
    dispatch({ type: SIGN_UP_USER });
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
          dispatch(signUpUserSuccess(user));
          dispatch(sendEmailLink(user));
      }).catch((error) => {
          dispatch(signUpUserFail(error.message));
      });

  };
}

export function signUpUserSuccess(user) {
  return (dispatch) => {
    dispatch({ type: SIGN_UP_USER_SUCCESS, payload: user });
    hashHistory.push('/signup-success');
  }
}

export function signUpUserFail(error) {
  return (dispatch) => {
    dispatch({
      type: SIGN_UP_USER_FAIL,
      payload: error
    });
  }
}


export function loginUserSuccess(user) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
    if (!user.emailVerified){
      firebase.auth().signOut()
      .then(() => {
        dispatch(emailUnVerified());
      })
      .catch((error) => {
        dispatch(loginUserFail(error.message));
      });
    }
  }
}


export function loginUserFail(error) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error
    });
  }
}

export function logoutUser() {
  return (dispatch) => {
    firebase.auth().signOut()
    .then(() => {
      dispatch(logoutUserSuccess());
    })
  };
}


export function logoutUserSuccess() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER_SUCCESS
    });
    hashHistory.push('/');
  }
}

export function emailUnVerified() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER_SUCCESS
    });
    hashHistory.push('/verify-email');
  }
}


export function logoutUserFail(error) {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error
    });
  }
}

export function resetPassword(email) {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUESTED });
    return firebase.auth().sendPasswordResetEmail(email).then(function(response) {
      // Email sent.
    })
  };
}

export function setNewPassword(code, password) {
  return (dispatch) => {
      dispatch({ type: SET_NEW_PASSWORD_REQUESTED });
      return firebase.auth().confirmPasswordReset(code, password).then(function(response) {
        dispatch({ type: SET_NEW_PASSWORD });
        return true;
      }).catch(function(error) {
        // An error happened.
        dispatch({ type: SET_ERROR_MESSAGE, payload: error.message });
        return false;
      });
  };
}

export function showError(msg) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: msg
  };
}

export function verifyPasswordCode(code) {
  return (dispatch) => {
    dispatch({ type: VERIFY_PASSWORD_CODE });
    return firebase.auth().verifyPasswordResetCode(code).then(function(response) {
      dispatch({ type: PASSWORD_CODE_VERIFIED, payload: response });
    }).catch(function(error) {
      dispatch({ type: PASSWORD_CODE_INVALID });
      // An error happened.
    });
  };
}


export function newPasswordChanged(text) {
  return {
    type: NEW_PASSWORD_CHANGED,
    payload: text
  };
}

export function confirmPasswordChanged(text) {
  return {
    type: CONFIRM_PASSWORD_CHANGED,
    payload: text
  };
}
