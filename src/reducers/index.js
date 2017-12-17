import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import PostReducer from './postReducer';
import TodoReducer from './todoReducer';
import ModalReducer from './modalReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  post: PostReducer,
  todo: TodoReducer
});

export default rootReducer;
