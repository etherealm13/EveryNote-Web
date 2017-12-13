import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ReduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

// common files
import App from './components/common/app';
import PageNotFound from './components/common/pageNotFound';
import RequireAuth from './components/common/require_auth';

//auth files
import LoginForm from './components/auth/loginForm';
import SignUpForm from './components/auth/signup';
import SignUpSuccess from './components/auth/signupSuccess';
import ResetPassword from './components/auth/resetPassword';
import ResetPasswordMessage from './components/auth/resetPasswordMessage';
import ResetPasswordRequested from './components/auth/resetPasswordRequested';
import VerifyUser from './components/auth/verifyUser';
import VerifyEmail from './components/auth/verifyEmail';

// post files
import PostsList from './components/posts/postsList';
import PostDetail from './components/posts/postDetail';
import PostForm from './components/posts/postForm';

// todo files
import TodoList from './components/todo/todoList';



import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LoginForm} />
        <Route path="/login" component={LoginForm} />
        
        <Route path="/posts" component={RequireAuth(PostsList)} />
        <Route path="/post-add" component={RequireAuth(PostForm)} />
        <Route path="/posts/:id" component={RequireAuth(PostDetail)} />
        
        <Route path="/todos" component={RequireAuth(TodoList)} />
        

        <Route path="/signup" component={SignUpForm} />
        <Route path="/signup-success" component={SignUpSuccess} />
        <Route path="/new-password" component={ResetPassword} />
        <Route path="/reset-password" component={ResetPasswordRequested} />
        <Route path="/support" component={ResetPasswordMessage} />
        <Route path="/verify-user" component={VerifyUser} />
        <Route path="/verify-email" component={VerifyEmail} />
        

      </Route>
      <Route path="*" component={PageNotFound} />
    </Router>
  </Provider>
  , document.getElementById('root'));
  registerServiceWorker();
