import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { sendEmailLink } from '../actions/index';

class VerifyEmail extends Component {
	componentDidMount(){
		document.title = "Support - EveryNote";
	}

 	render() {
	    return (
	    	<div className="container">
			  	<h4>A verification link has been sent to your email id. Please verify your email to continue.</h4>
			  	<Link to="/" className="post-link btn btn-success gradient-bg">Go to Login
				</Link>
	    	</div>
	    );
	}
}

export default connect(null, { sendEmailLink })(VerifyEmail);

// <button className="btn btn-success" onClick={() => this.props.sendEmailLink()}>
// 	Resend  Verification Link
// </button>