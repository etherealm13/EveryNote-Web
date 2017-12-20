import React, { Component } from 'react';
import { Link } from 'react-router';

class VerifyEmail extends Component {
	componentDidMount(){
		document.title = "Support - EveryNote";
	}

 	render() {
	    return (
	    	<div className="container">
			  	<h4>A verification link has been sent to your email id. Please verify your email to continue.</h4>
			  	<Link to="/" className="post-link btn btn-success gradient-bg">
			  		<span>Go to Login</span>
			  	</Link>
	    	</div>
	    );
	}
}

export default VerifyEmail;