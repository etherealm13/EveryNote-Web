import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import PostReducer from './postReducer';
import ModalReducer from './modalReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  modal: ModalReducer,
  post: PostReducer
});

export default rootReducer;
