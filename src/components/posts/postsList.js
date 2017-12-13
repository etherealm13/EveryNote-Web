import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts, logoutUser, showModal, getPostDetails, multiDelete, resetMultiSelect } from '../../actions';
import PostCard from './postCard';
import Loader from '../common/loading';
import Header from '../common/header';
import AddNoteFab from '../common/addNoteFab';

class PostsList extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.fetchPosts();
    }
    this.props.resetMultiSelect(this.props.multiselect);
    window.scroll(0,0);
  }

  componentDidMount(){
    document.title = "Home - EveryNote";
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.authenticated) {
      this.context.router.push('/login');
    }
  }

  renderMultiDeleteButton(){
    if(this.props.showMultiDelete > 0){
      return(
        <button type="button" className="multi-delete-button"
          onClick={() => this.props.showModal('multiDelete',this.props.multiselect)}
          >
          <span className="glyphicon glyphicon-trash">
          </span>&ensp;
          Delete Selected Notes
          </button>
      )
    }
  }

  renderPost() {
    if (!this.props.loading) {
      if (this.props.posts.length) {
          let sortedPosts = this.props.posts.sort(function(a,b) {
              return new Date(b.dateStamp) - new Date(a.dateStamp) 
          });
        return sortedPosts.map((post) => {
           return (
             <PostCard
               key={post.uniqueid}
               post={post}
               data={this.props.multiselect}
             />
           );
        });
      }
      return (
      <div className="no-posts">
        <h3>No Notes found.</h3>
        <h4>
          <Link to="/post-add" className="post-link">Add a note
          </Link>
        </h4>
      </div>
      );
    }
    return <Loader />;
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container my-5">
          <div className="row">
            <div className="list-wrapper">
                {this.renderPost()}
            </div>
          </div>
        </div>
        <AddNoteFab />
        {this.renderMultiDeleteButton()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const posts = _.map(state.post.posts, (val, uniqueid) => {
    return { ...val, uniqueid };
  });
  return { 
    posts, 
    loading: state.post.loading, 
    multiselect: state.post.selectedPosts,
    showMultiDelete: state.post.showMultiDelete };
}

export default connect(mapStateToProps, { fetchPosts, logoutUser, showModal, getPostDetails, multiDelete, resetMultiSelect })(PostsList);

