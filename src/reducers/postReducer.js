import {
  TITLE_CHANGED,
  TITLE_UPDATED,
  DESCRIPTION_CHANGED,
  DESCRIPTION_UPDATED,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAIL,
  EDIT_NOTE,
  EDIT_IN_PROGRESS,
  EDIT_NOTE_SUCCESS,
  CANCEL_EDIT,
  UPDATE_NOTE,
  UPDATE_NOTE_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  NOTE_SELECTED,
  FORM_RESET
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  description: '',
  user: null,
  authenticated: null,
  error: '',
  loading: false,
  editing: false,
  posts: {},
  postDetail: {},
  selectedPosts: {},
  showMultiDelete: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_RESET:
      return { ...INITIAL_STATE };
    case TITLE_CHANGED:
      return { ...state, title: action.payload };
    case DESCRIPTION_CHANGED:
      return { ...state, description: action.payload };
    case TITLE_UPDATED:
      return { ...state, postDetail: {...state.postDetail, title: action.payload}, postId: state.postId  };
    case DESCRIPTION_UPDATED:
      return { ...state, postDetail: {...state.postDetail, description: action.payload}, postId: state.postId };
    case ADD_NOTE:
      return { ...state, loading: true };
    case ADD_NOTE_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case ADD_NOTE_FAIL:
      return { ...state };
    case FETCH_POSTS:
      return { ...state, loading: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, ...INITIAL_STATE, posts: action.payload };
    case GET_POST_DETAILS:
      return { ...state, loading: true };
    case GET_POST_DETAILS_SUCCESS:
      return { ...state, ...INITIAL_STATE, postDetail: action.payload, postId: action.id, postNumber: action.number };
    case EDIT_NOTE:
      return { ...state, loading: true };
    case EDIT_IN_PROGRESS:
      return { ...state, ...INITIAL_STATE, editing: true, postDetail: action.payload};
    case EDIT_NOTE_SUCCESS:
      return { ...state, loading: false };
    case CANCEL_EDIT:
      return { ...state, ...INITIAL_STATE };
    case UPDATE_NOTE:
      return { ...state, loading: true };
    case UPDATE_NOTE_SUCCESS:
      return { ...state, ...INITIAL_STATE, postDetail: action.payload };
    case NOTE_SELECTED:
      if(state.selectedPosts[action.payload]){
        delete state.selectedPosts[action.payload]
        state.showMultiDelete--;
      }else{
        state.selectedPosts[action.payload] = true;
        state.showMultiDelete++;
      }
      return { ...state };  
    default:
    return state;
  }
};
