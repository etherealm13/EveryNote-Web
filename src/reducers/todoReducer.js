import {
  TODO_FORM_RESET,
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  TODO_TASK_TITLE_CHANGED,
  ADD_TODO_TASK,
  ADD_TODO_TASK_SUCCESS,
  COMPLETE_TODO_TASK,
  EDIT_TODO_TASK,
  CLEAR_DATA
} from '../actions/types';

const INITIAL_STATE = {
  main: '',
  urgent: '',
  others: '',
  loadingTodo: false,
  todos: {
    main: {
      tasks:{}
    },
     urgent: {
      tasks:{}
    },
     others: {
      tasks:{}
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case CLEAR_DATA:
      return { ...INITIAL_STATE };
    
    case TODO_FORM_RESET:
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
      return { ...state, loadingTodo: true };
    
    case FETCH_TODOS:
      return { ...state, loadingTodo: true};

    case FETCH_TODOS_SUCCESS:
      return { ...state, ...INITIAL_STATE, todos: action.payload };

    default:
    return state;
  }
};
