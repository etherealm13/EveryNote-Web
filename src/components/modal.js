import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { hideModal, deleteNote, multiDelete, getPostDetails, fetchPosts, logoutUser } from '../actions/index';

class CustomModal extends Component{
	static contextTypes = {
	    router: PropTypes.object
	};
	hideModalHandler(){
		this.props.hideModal();
	}
	deleteNoteHandler(){
		this.props.deleteNote(this.props.modal.data);
		this.hideModalHandler();
	}

	multiDeleteHandler(){
		this.props.multiDelete(this.props.modal.data);
		this.hideModalHandler();
	}

	cancelUpdateHandler(){
	    this.props.getPostDetails(this.props.modal.data);
		this.hideModalHandler();
	}
	cancelAddHandler(){
		this.context.router.push('/posts');
		this.hideModalHandler();
	}
	logoutHandler(){
		this.props.logoutUser();
		this.hideModalHandler();
	}

	renderView(){
		switch (this.props.modal.type){
			case 'delete': 
				return (
					<ReactModal
		              	isOpen={this.props.modal.modalShow}
		              	contentLabel="Modal"
		              	// onRequestClose={() => this.props.hideModal()}
		              	style={customStyle}
			        >
			            <div className="popup-content">
					  		<div className="popup-body">
								<h3>Delete Note</h3>
								<p>Deleted data cannot be recovered.
								Do you want to continue ?</p>
						  	</div>
					  		<div className="popup-footer">
						  		<div className="btn-wrapper">
					              	<button type="button" className="btn btn-success gradient-bg"
					              	onClick = {this.deleteNoteHandler.bind(this)} >
					              	Yes, Delete it
					              	</button>
					              	<button type="button" className="btn btn-default"
					              	onClick = {this.hideModalHandler.bind(this)} >
					              	Cancel
					              	</button>
							  	</div>
						  	</div>
					  	</div>
			        </ReactModal>
				)
			case 'multiDelete': 
				return (
					<ReactModal
			              isOpen={this.props.modal.modalShow}
			              contentLabel="Modal"
			              // onRequestClose={() => this.props.hideModal()}
			              style={customStyle}
			            >
			            <div className="popup-content">
					  		<div className="popup-body">
								<h3>Delete Selected Notes</h3>
								<p>Deleted data cannot be recovered.
								Do you want to continue ?</p>
						  	</div>
					  		<div className="popup-footer">
						  		<div className="btn-wrapper">
					              	<button type="button" className="btn btn-success gradient-bg"
					              	onClick = {this.multiDeleteHandler.bind(this)} >
					              	Yes, Delete it
					              	</button>
					              	<button type="button" className="btn btn-default"
					              	onClick = {this.hideModalHandler.bind(this)} >
					              	Cancel
					              	</button>
							  	</div>
						  	</div>
					  	</div>
			        </ReactModal>
				)
			case 'cancel': 
				return (
					<ReactModal
						isOpen={this.props.modal.modalShow}
						onRequestClose={() => this.props.hideModal()}
						style={customStyle}
						contentLabel="No Overlay Click Modal"
						>
			            <div className="popup-content">
					  		<div className="popup-body">
								<h3>Cancel Update</h3>
								<p>All unsaved date will be lost. 
								Do you want to continue ?</p>
						  	</div>
					  		<div className="popup-footer">
					  			<div className="btn-wrapper">
					              	<button type="button" className="btn btn-success gradient-bg"
					              	onClick = {this.cancelUpdateHandler.bind(this)} >
					              	Yes, Continue
					              	</button>
					              	<button type="button" className="btn btn-default"
					              	onClick = {this.hideModalHandler.bind(this)} >
					              	No
					              	</button>
							  	</div>
						  	</div>
					  	</div>
			        </ReactModal>
				)
			case 'cancelAddForm': 
				return (
					<ReactModal
						isOpen={this.props.modal.modalShow}
						onRequestClose={() => this.props.hideModal()}
						style={customStyle}
						contentLabel="No Overlay Click Modal"
						>
			            <div className="popup-content">
					  		<div className="popup-body">
								<h3>Cancel Update</h3>
								<p>All unsaved date will be lost. 
								Do you want to continue ?</p>
						  	</div>
					  		<div className="popup-footer">
					  			<div className="btn-wrapper">
					              	<button type="button" className="btn btn-success gradient-bg"
					              	onClick = {this.cancelAddHandler.bind(this)} >
					              	Yes, Continue
					              	</button>
					              	<button type="button" className="btn btn-default"
					              	onClick = {this.hideModalHandler.bind(this)} >
					              	No
					              	</button>
							  	</div>
						  	</div>
					  	</div>
			        </ReactModal>
				)
			case 'logout': 
				return (
					<ReactModal
						isOpen={this.props.modal.modalShow}
						onRequestClose={() => this.props.hideModal()}
						style={customStyle}
						contentLabel="No Overlay Click Modal"
						>
			            <div className="popup-content">
					  		<div className="popup-body">
								<h3>Logout</h3>
								<p>You are going to logout. Do you want to continue ?</p>
						  	</div>
					  		<div className="popup-footer">
					  			<div className="btn-wrapper">
					              	<button type="button" className="btn btn-success gradient-bg"
					              	onClick = {this.logoutHandler.bind(this)} >
					              	Yes, Logout!
					              	</button>
					              	<button type="button" className="btn btn-default"
					              	onClick = {this.hideModalHandler.bind(this)} >
					              	No
					              	</button>
							  	</div>
						  	</div>
					  	</div>
			        </ReactModal>
				)
			default:
				return false;
		}
	}
		

  	render() {
	  	return (
	  		<div className="popup-backdrop">
				{this.renderView()}
		  	</div>
	  	);
  	}
};


const customStyle = {
  overlay : {
    position          : 'fixed',
    zIndex           : 10000,
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(1, 1, 1, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '20rem',
    left                       : '10%',
    right                      : '10%',
    bottom                      : '',
    height                      : 'auto',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
}


function mapStateToProps(state) {
  if(state.post.postDetail != null){
    return { post: state.post.postDetail,  modal: state.modal, editing: state.post.editing, uid: state.post.postId, number: state.post.postNumber };
  }
  return { post: state.post, modal: state.modal, editing: state.post.editing, uid: state.post.postId };
}

export default connect(mapStateToProps, { hideModal, deleteNote, multiDelete, getPostDetails, fetchPosts, logoutUser })(CustomModal);
