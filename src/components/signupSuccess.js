import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SignUpSuccess extends Component {

	componentDidMount(){
		document.title = "Welcome - EveryNote";
	}
 	render() {
	    return (
	    	<div className="container">
			  	<h4> Thank you for Signing Up. A verification link has been sent to your email id.</h4>
			  	<Link to="/login" className="post-link btn btn-success gradient-bg">Go to Login
				</Link>
	    	</div>

	    );
	}
}
