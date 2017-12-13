import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { titleChanged, descriptionChanged, addNote, showModal, resetForm } from '../../actions/index';
import Header from '../common/header';

class PostForm extends Component {
  static contextTypes = {
		router: PropTypes.object
	};

  componentDidMount(){
    document.title = "Add Note - EveryNote";
  }

  onTitleChange(event) {
    this.props.titleChanged(event.target.value);
  }

  onDescriptionChange(event) {
    this.props.descriptionChanged(event.target.value);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.props.title !== '' && this.props.description !== '') {
      this.props.addNote(this.props.title, this.props.description)
      .then(() => {
        if (this.props.authenticated) {
          this.context.router.push('/posts');
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container my-6">
          <div className="post-form">
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
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12">
                <form className="form-post" onSubmit={this.handleFormSubmit.bind(this)}>
                  <h2 className="form-post-heading">Add New Note</h2>
                  <h5 className="error">{this.props.error}</h5>
                  <label htmlFor="inputTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    required
                    autoFocus
                    value={this.props.title}
                    onChange={this.onTitleChange.bind(this)}
                  />
                  <label htmlFor="inputDescription">Description</label>
                  <textarea
                    type="text"
                    className="form-control description-input"
                    placeholder="Description"
                    required
                    value={this.props.description}
                    onChange={this.onDescriptionChange.bind(this)}
                  />
                  <div className="btn-wrapper">
                    <button
                      className="btn btn-success gradient-bg"
                      type="submit"
                    >
                    Add Note
                    </button>
                    <button
                      className="btn btn-default gradient-bg"
                      type="reset"
                      onClick={() => this.props.showModal('cancelAddForm')}
                    >
                    Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
  }
}


function mapStateToProps(state) {
  const { title, category, description } = state.post;
  return {
    title, category, description
  };
}

export default connect(mapStateToProps, {
   titleChanged,
   descriptionChanged,
   addNote,
   showModal,
   resetForm
 })(PostForm);
