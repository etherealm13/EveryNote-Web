import _ from 'lodash';
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
  others: '',
  loading: false,
  editing: false,
  todos: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case FORM_RESET:
      return { ...INITIAL_STATE, todos: {...state.todos} };
    
    case TODO_TASK_TITLE_CHANGED:
      return { ...state, [action.titleType]: action.payload };
    
    case ADD_TODO_TASK:
      return { ...state };
    
    case ADD_TODO_TASK_SUCCESS:
      return { ...state, todos: { 
          ...state.todos, [action.payload.type]: { 
            ...state.todos[action.payload.type], tasks: {
              ...state.todos[action.payload.type].tasks, [action.payload.id]: {...action.payload.data} } 
          } 
        }
      }
    
    case COMPLETE_TODO_TASK:
      return { ...state, todos: { 
          ...state.todos, [action.payload.type]: { 
            ...state.todos[action.payload.type], tasks: {
              ...state.todos[action.payload.type].tasks, [action.payload.taskData.uniqueid]: {...action.newData}
            } 
          } 
        }
      }

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
