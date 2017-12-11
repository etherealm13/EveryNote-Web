import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  SIGN_UP_USER,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAIL,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  CONFIRM_PASSWORD_CHANGED,
  NEW_PASSWORD_CHANGED,
  SET_NEW_PASSWORD,
  VERIFY_PASSWORD_CODE,
  PASSWORD_CODE_VERIFIED,
  SET_NEW_PASSWORD_REQUESTED,
  PASSWORD_CODE_INVALID,
  EMAIL_NOT_VERIFIED,
  EMAIL_VERIFIED,
  EMAIL_LINK_SENT,
  SET_ERROR_MESSAGE,
  LOADING,
  FORM_RESET
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  newPassword: '',
  confirmPassword: '',
  user: null,
  authenticated: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_RESET:
      return { ...INITIAL_STATE };
    case EMAIL_NOT_VERIFIED:
      return { ...INITIAL_STATE };
    case EMAIL_VERIFIED:
      return { ...INITIAL_STATE };
    case SIGN_UP_USER:
      return { ...state, loading: true };
    case LOADING:
      return { ...state, loading: true };
    case SIGN_UP_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, loading: false };
    case SIGN_UP_USER_FAIL:
      return { ...state, authenticated: false, error: action.payload, loading: false };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case EMAIL_LINK_SENT:
      return { ...state, ...INITIAL_STATE };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case NEW_PASSWORD_CHANGED:
      return { ...state, newPassword: action.payload };
    case CONFIRM_PASSWORD_CHANGED:
      return { ...state, confirmPassword: action.payload };
    case SET_NEW_PASSWORD_REQUESTED:
      return { ...state, ...INITIAL_STATE, loading: true };
    case VERIFY_PASSWORD_CODE:
      return { ...state, ...INITIAL_STATE, loading: true };
    case PASSWORD_CODE_VERIFIED:
      return { ...state, ...INITIAL_STATE, email: action.payload };
    case PASSWORD_CODE_INVALID:
      return { ...state, ...INITIAL_STATE, authenticated: false };
    case SET_NEW_PASSWORD:
      return { ...state, ...INITIAL_STATE };
    case SET_ERROR_MESSAGE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, authenticated: true };
    case LOGIN_USER_FAIL:
      return { ...state, authenticated: false, loading: false, error: action.payload };
    case USER_LOGGED_IN:
      return { ...state, loading: false, authenticated: true, user: action.payload };
    case USER_LOGGED_OUT:
      return { ...state, loading: false, authenticated: false };
    case LOGOUT_USER_SUCCESS:
      return { ...state, authenticated: false, user: null };
    case LOGOUT_USER_FAIL:
      return { ...state };
    default:
    return state;
  }
};
