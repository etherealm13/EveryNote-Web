import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ReduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import App from './components/app';
import LoginForm from './components/loginForm';
import PostsList from './components/postsList';
import PostDetail from './components/postDetail';
import PostForm from './components/postForm';
import SignUpForm from './components/signup';
import SignUpSuccess from './components/signupSuccess';
import PageNotFound from './components/pageNotFound';
import RequireAuth from './components/require_auth';
import ResetPassword from './components/resetPassword';
import ResetPasswordMessage from './components/resetPasswordMessage';
import ResetPasswordRequested from './components/resetPasswordRequested';
import VerifyUser from './components/verifyUser';
import VerifyEmail from './components/verifyEmail';
// import NewUser from './components/newUser';
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
