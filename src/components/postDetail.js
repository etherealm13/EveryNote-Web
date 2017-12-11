import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { deleteNote, editNote, showModal, updateNote, getPostDetails, titleUpdated, descriptionUpdated, resetForm } from '../actions/index';
import Header from './header';
import Loader from './loading';
import AddNoteFab from './addNoteFab';

class PostDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount(){
    window.scroll(0,0);
    ReactModal.setAppElement('body');
    // let page = localStorage.getItem('currentState');
  }

  componentDidMount(){
    document.title = "View Note - EveryNote";
  }

  onTitleChange(event) {
    this.props.titleUpdated(event.target.value, this.props.uid );
  }

  onDescriptionChange(event) {
    this.props.descriptionUpdated(event.target.value, this.props.uid );
  }

  formCancel() {
    this.props.getPostDetails(this.props.uid);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.props.post.title !== '' && this.props.post.description !== '') {
      this.props.updateNote(this.props.post, this.props.uid)
      .then(() => {
        if (this.props.authenticated) {
          this.props.getPostDetails(this.props.uid);
          // this.context.router.push(`/posts/${this.props.uid}`);
        }
      });
    }
  }

  filterDate(){
    let date = this.props.post.dateStamp;
    return moment(date).format('h:mm a, Do MMM, YY');
  }

  renderView() {
    if(!this.props.loading){
      if(this.props.editing) {
        document.title = "Edit Note - EveryNote";
        return (
          <div className="post-form">
            <form className="form-post" onSubmit={this.handleFormSubmit.bind(this)}>
              <h2 className="form-post-heading">Edit Note</h2>
              <h5 className="error">{this.props.error}</h5>
              <label htmlFor="inputTitle">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                required
                autoFocus
                value={this.props.post.title}
                onChange={this.onTitleChange.bind(this)}
              />
              <label htmlFor="inputDescription">Description</label>
              <textarea
                type="text"
                className="form-control description-input"
                placeholder="Description"
                required
                value={this.props.post.description}
                onChange={this.onDescriptionChange.bind(this)}
              />
              <div className="btn-wrapper">
                <button
                  className="btn btn-success gradient-bg"
                  type="submit"
                >
                Update Note
                </button>
                <button type="button"
                className="btn btn-default"
                onClick={() => this.props.showModal('cancel', this.props.uid)}
                title="Cancel"
                >
                Cancel
                </button>
              </div>
            </form>
          </div>
        )
      }
      document.title = "View Note - EveryNote";
      return (
        <div className="post-details-page">
          <div className="row">
            <div className="col-xs-12 col-sm-12">
              <Link to="/posts" className="post-link pull-right hidden-xs">
              <i className="glyphicon glyphicon-chevron-left"></i> Go back to list
              </Link>
              <Link to="/posts" className="pull-right">
                <button className="btn btn-success hidden-sm hidden-md hidden-lg gradient-bg">
                  <i className="glyphicon glyphicon-home"></i>
                </button>
              </Link>
              <button
                className="btn btn-warning hidden-xs gradient-bg"
                onClick={() => this.props.editNote(this.props.post)}
                title="Edit Note"
                >
                Edit Note
              </button>
              <button
              className="btn btn-danger hidden-xs gradient-bg"
              onClick={() => this.props.showModal('delete',this.props.uid)}
              title="Delete Note"
              >
              Delete Note</button>
              <button
                className="btn btn-warning hidden-sm hidden-md hidden-lg gradient-bg"
                onClick={() => this.props.editNote(this.props.post)}
                title="Edit Note"
                ><i className="glyphicon glyphicon-pencil"></i>
              </button>
              <button
                className="btn btn-danger hidden-sm hidden-md hidden-lg gradient-bg"
                onClick={() => this.props.showModal('delete',this.props.uid)}
                title="Delete Note"
                >
                <i className="glyphicon glyphicon-trash"></i>
              </button>
            </div>
          </div>
          <div className="row">
            <div className={`post-wrapper post-wrapper-${this.props.number}`}>
              <h3 className="">{this.props.post.title}</h3>
              <p className="post-stamp">Last Modified: {this.filterDate()}</p>
              <hr className="post-divider"/>
              <h5 className="post-description">{this.props.post.description}</h5>
            </div>
          </div>
          <AddNoteFab />
        </div>
      );
    }
    return <Loader />;
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container my-6">
        {this.renderView()}
        </div>
        <div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  if(state.post.postDetail != null){  
    const { title, description, dateStamp } = state.post.postDetail;
    return { post: state.post.postDetail, loading: state.post.loading, modal: state.modal, editing: state.post.editing, uid: state.post.postId, number: state.post.postNumber };
  }
  return { post: state.post, loading: state.post.loading, modalShow: state.modal.modalShow, editing: state.post.editing, uid: state.post.postId };
}

export default connect(mapStateToProps, {  
  deleteNote,
  editNote,
  titleUpdated,
  getPostDetails,
  descriptionUpdated,
  updateNote,
  showModal,
  resetForm })(PostDetail);
