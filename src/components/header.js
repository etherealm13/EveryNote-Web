import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { showModal } from '../actions/index';
const imgSrc = '/assets/icon.png';

class Header extends Component {
	constructor(props) {
    	super(props);
	}

	loadUser(){
		return (
			<button type="button" className="btn btn-default"
		        onClick={() => this.props.showModal('logout')}>
            	Logout
            </button>
		)
	}

	render() {
	  return (
		<nav className="navbar navbar-default navbar-fixed-top">
	      <div className="container">
	        <div className="navbar-header">
	          	<Link to="/posts" className="navbar-brand">
	          	<img className="nav-logo" src={imgSrc} />
	          	EveryNote</Link>
        		<div className="visible-xs-inline-block hidden-sm hidden-md hidden-lg pull-right">
		        	<form className="navbar-btn-wrapper">
				        <button type="button" className="btn btn-default gradient-bg"
				        onClick={() => this.props.showModal('logout')}>
		            	Logout
		            	</button>
				    </form>
		        </div>
	        </div>
	        <div id="navbar" className="navbar-collapse collapse">
	        	<form className="navbar-form navbar-right">
			        {this.loadUser()}
			    </form>
	        </div>
	      </div>
	    </nav>
	  );
	};
};


function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps, { showModal })(Header);
