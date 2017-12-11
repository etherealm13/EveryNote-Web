import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ResetPasswordMessage extends Component {
	componentDidMount(){
		document.title = this.props.location.state.title || "Support - EveryNote";
	}
 	render() {
	    return (
	    	<div className="container">
			  	<h4>{this.props.location.state.message}</h4>
			  	<Link to="/" className="post-link btn btn-success gradient-bg">Go to login page
				</Link>
	    	</div>

	    );
	}
}
