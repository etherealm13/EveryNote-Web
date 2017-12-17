import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from '../common/loading';
import { emailChanged, resetForm, resetPassword } from '../../actions/index';

class ResetPasswordRequested extends Component {
  	static contextTypes = {
		router: PropTypes.object
	};

  componentDidMount(){
    document.title = "Forgot PassWord - EveryNote";
  }

  onEmailChange(event) {
    this.props.emailChanged(event.target.value);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.props.email !== '') {
      	this.props.resetPassword(this.props.email)
      	.then(() => {
          this.context.router.push({
            pathname: '/support',
            state: {message: 'A reset password link has been sent to your email id.'}
          })
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
      >Send Email
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
          <img alt="logo" className="logo" src="/assets/icon.png" />
          <h2 className="form-signin-heading">EveryNote</h2>
          <h5 className="error">{this.props.error}</h5>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            autoFocus
            required
            value={this.props.email}
            onChange={this.onEmailChange.bind(this)}
          />
          {this.renderButton()}
          <div className="login-link">
            <Link to="/signup" className="pull-left">I don't have an account ?</Link>
            <Link to="/login" className="pull-right">Back to Login</Link>
          </div>
        </form>
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


function mapStateToProps(state) {
  return {
    email: state.auth.email
  };
}

export default connect(mapStateToProps,
  { emailChanged, resetForm, resetPassword}
)(ResetPasswordRequested);
