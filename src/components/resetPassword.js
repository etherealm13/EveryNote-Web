import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { newPasswordChanged, confirmPasswordChanged, setNewPassword, logoutUser, showError } from '../actions/index';

class ResetPassword extends Component {
  static contextTypes = {
		router: PropTypes.object
	};

  componentDidMount(){
    document.title = "Reset Password - EveryNote";
  }

  onPasswordChange(event) {
    this.props.newPasswordChanged(event.target.value);
  }

  onConfirmPasswordChange(event) {
    this.props.confirmPasswordChanged(event.target.value);
  }

  onCancel() {
    this.context.router.push('/');
  }

  setErrorMessage(msg){
    this.props.showError(msg);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.props.newPassword !== '' && this.props.confirmPassword !== '') {
      if (this.props.newPassword === this.props.confirmPassword) {
        this.props.setNewPassword(this.props.location.state.actionCode, this.props.confirmPassword)
        .then((response) => {
          if(response){
            this.context.router.push({
              pathname: '/support',
              state: {message: 'Password Reset Successful. Login to continue.'}  
            })
          }
        });
      }else{
        this.setErrorMessage("Passwords do not match");
      }
    }
  }
  render() {
    return (
      <div className="login-page">
        <form className="form-signin" onSubmit={this.handleFormSubmit.bind(this)}>
              <h2 className="form-post-heading">Reset Password</h2>
              <h5 className="error">{this.props.error}</h5>
              <label htmlFor="inputTitle">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password (Min 6 character)"
                required
                autoFocus
                value={this.props.newPassword}
                onChange={this.onPasswordChange.bind(this)}
              />
              <label htmlFor="inputTitle">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                required
                value={this.props.confirmPassword}
                onChange={this.onConfirmPasswordChange.bind(this)}
              />
              <div className="btn-wrapper">
                <button
                  className="btn btn-success gradient-bg"
                  type="submit"
                >
                Submit
                </button>
                <button
                  className="btn btn-default gradient-bg"
                  type="reset"
                  onClick={this.onCancel.bind(this)}
                >
                Cancel
                </button>
              </div>
        </form>
      </div>
  );
  }
}


function mapStateToProps(state) {
  const { confirmPassword, newPassword, email, error } = state.auth;
  return {
    confirmPassword, newPassword, email, error
  };
}

export default connect(mapStateToProps, {
    newPasswordChanged,
    confirmPasswordChanged,
    setNewPassword,
    logoutUser,
    showError
 })(ResetPassword);
