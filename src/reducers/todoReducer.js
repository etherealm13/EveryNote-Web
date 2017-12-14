import {
  FORM_RESET,
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  TODO_TASK_TITLE_CHANGED,
  ADD_TODO_TASK,
  ADD_TODO_TASK_SUCCESS,
  COMPLETE_TODO_TASK,
  DELETE_TODO,
  EDIT_TODO_TASK
} from '../actions/types';

const INITIAL_STATE = {
  main: '',
  urgent: '',
  loading: false,
  editing: false,
  todos: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case FORM_RESET:
      return { ...INITIAL_STATE };
    
    case TODO_TASK_TITLE_CHANGED:
      return { ...state, [action.titleType]: action.payload };
    
    case ADD_TODO_TASK:
      return { ...state, loading: true };
    
    case ADD_TODO_TASK_SUCCESS:
      return { ...INITIAL_STATE };
    
    case COMPLETE_TODO_TASK:
      return { ...state };
    
    case EDIT_TODO_TASK:
      return { ...state, loading: true };
    
    case DELETE_TODO:
      return { ...state, ...INITIAL_STATE, todos: action.payload };
    
    case FETCH_TODOS:
      return { ...state, loading: true};

    case FETCH_TODOS_SUCCESS:
      return { ...state, ...INITIAL_STATE, todos: action.payload };
    
    // case UPDATE_NOTE_SUCCESS:
    //   return { ...state, ...INITIAL_STATE, postDetail: action.payload };
    
    // case NOTE_SELECTED:
    //   if(state.selectedPosts[action.payload]){
    //     delete state.selectedPosts[action.payload]
    //     state.showMultiDelete--;
    //   }else{
    //     state.selectedPosts[action.payload] = true;
    //     state.showMultiDelete++;
    //   }
    //   return { ...state };  
    default:
    return state;
  }
};
