import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from '../common/loading';
import { emailChanged, passwordChanged, loginUser, resetForm, checkAuth } from '../../actions/index';

class LoginForm extends Component {
  static contextTypes = {
		router: PropTypes.object
	};

  componentWillMount() {
    this.props.resetForm();
    this.props.checkAuth();
  }

  componentDidMount(){
    document.title = "Login - EveryNote";
  }

  componentWillUpdate(nextProps) {
      if(nextProps.authenticated) {
        this.context.router.push('/posts');
      }
  }

  onEmailChange(event) {
    this.props.emailChanged(event.target.value);
  }
  onPasswordChange(event) {
    this.props.passwordChanged(event.target.value);
  }


  handleFormSubmit(event) {
    event.preventDefault();
    if (this.props.email !== '' && this.props.password !== '') {
      this.props.loginUser(this.props.email, this.props.password)
      .then(() => {
        if (this.props.authenticated) {
          this.context.router.push('/posts');
        }
      });
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Loader />;
    }
    return (
      <button
      className="btn btn-sm btn-success btn-block gradient-bg"
      type="submit"
      >Log in
      </button>
    )
  }

  renderForm() {
    if (this.props.loading) {
      return <Loader />;
    }
    return (
      <div className="login-page">
        <form className="form-signin" onSubmit={this.handleFormSubmit.bind(this)}>
          <img className="logo" alt="logo" src="/assets/icon.png" />
          <h2 className="form-signin-heading">EveryNote</h2>
          <h5 className="error">{this.props.error}</h5>
          <label htmlFor="Email" className="sr-only">Email address</label>
          <input
            name="Email"
            type="email"
            className="form-control"
            placeholder="Email"
            autoFocus
            required
            value={this.props.email}
            onChange={this.onEmailChange.bind(this)}
          />
          <label htmlFor="Password" className="sr-only">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="Password"
            required
            value={this.props.password}
            onChange={this.onPasswordChange.bind(this)}
          />
          {this.renderButton()}
          <div className="login-link">
            <Link to="/signup" className="pull-left">I don't have an account ?</Link>
            <Link to="/reset-password" className="pull-right">Forgot password ?</Link>
          </div>
          <div className="clearfix">
          </div>
        </form>
        <div className="form-signin demo-link">
          <Link to="/demo">Learn More</Link>
          <p>EveryNote &copy; 2017</p>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
      {this.renderForm()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  const { email, password, user, authenticated, error, loading } = auth;
  return {
    email,
    password,
    user,
    authenticated,
    error,
    loading
  };
}

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, loginUser, resetForm, checkAuth }
)(LoginForm);
