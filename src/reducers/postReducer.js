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
  UPDATE_NOTE_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  NOTE_SELECTED,
  RESET_SELECTED_COUNT,
  POST_FORM_RESET
} from '../actions/types';

const INITIAL_STATE = {
  post: {
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
  }
};

export default (state = INITIAL_STATE.post, action) => {
  switch (action.type) {
    case POST_FORM_RESET:
      return { ...INITIAL_STATE.post };
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
      return { ...state, ...INITIAL_STATE.post };
    case ADD_NOTE_FAIL:
      return { ...state };
    case FETCH_POSTS:
      return { ...state, ...INITIAL_STATE.post, loading: true };
    case FETCH_POSTS_SUCCESS:
      return { ...state, ...INITIAL_STATE.post, posts: action.payload };
    case GET_POST_DETAILS:
      return { ...state, loading: true };
    case GET_POST_DETAILS_SUCCESS:
      return { ...state, ...INITIAL_STATE.post, postDetail: action.payload, postId: action.id, postNumber: action.number };
    case EDIT_NOTE:
      return { ...state, loading: true };
    case EDIT_IN_PROGRESS:
      return { ...state, ...INITIAL_STATE.post, editing: true, postDetail: action.payload};
    case EDIT_NOTE_SUCCESS:
      return { ...state, loading: false };
    case CANCEL_EDIT:
      return { ...state, ...INITIAL_STATE.post };
    case UPDATE_NOTE_SUCCESS:
      return { ...state, ...INITIAL_STATE.post, postDetail: action.payload };
    case NOTE_SELECTED:
      if(state.selectedPosts[action.payload] && state.showMultiDelete > 0){
        delete state.selectedPosts[action.payload]
        state.showMultiDelete--;
      }else{
        state.selectedPosts[action.payload] = true;
        state.showMultiDelete++;
      }
      return { ...state };  
    case RESET_SELECTED_COUNT:
      return { ...state, selectedPosts: {}, showMultiDelete: 0 };
    
    default:
    return { ...state };
  }
};
