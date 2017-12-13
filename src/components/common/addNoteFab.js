import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AddNoteFab extends Component {
	addNote() {
		if(!this.props.noAdd){	
			return(
				<Link to="/post-add" title="Add Note" className="post-link btn btn-success gradient-bg glyphicon glyphicon-plus">
				</Link>
			)
		}
	}

	render(){
  		return (
		  	<div className="add-note-fab">
		 	{this.addNote()} 		
		  	</div>
		);
	};
};