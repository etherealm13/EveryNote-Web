import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from '../common/loading';
import { emailChanged, passwordChanged, signUpUser, resetForm } from '../../actions/index';

class SignUpForm extends Component {
  static contextTypes = {
		router: PropTypes.object
	};

  componentWillMount() {
    this.props.resetForm();
  }

  componentDidMount(){
    document.title = "Sign Up - EveryNote";
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
      this.props.signUpUser(this.props.email, this.props.password)
      .then(() => {
        this.context.router.push('/signup-success');
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
      >
      Sign up
      </button>
    )
  }

  render() {
    return (
      <div className="login-page">
        <form className="form-signin" onSubmit={this.handleFormSubmit.bind(this)}>
          <img alt="logo" className="logo" src="/assets/icon.png" />
          <h2 className="form-signin-heading">EveryNote</h2>
          <h5 className="error">{this.props.error}</h5>
          <label htmlFor="inputEmail" className="sr-only">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            autoFocus
            value={this.props.email}
            onChange={this.onEmailChange.bind(this)}
          />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password (Min 6 character)"
            required=""
            value={this.props.password}
            onChange={this.onPasswordChange.bind(this)}
          />
          {this.renderButton()}
          <div className="signup-link">
            <Link to="/login" className="">I already have an account !</Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.auth.email,
    password: state.auth.password,
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    error: state.auth.error,
    loading: state.auth.loading
  };
}

export default connect(mapStateToProps,
  { emailChanged, passwordChanged, signUpUser, resetForm }
)(SignUpForm);
