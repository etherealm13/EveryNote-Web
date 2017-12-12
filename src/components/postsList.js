import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts, logoutUser, showModal, getPostDetails, addNote, multiDelete } from '../actions';
import PostCard from './postCard';
import Loader from './loading';
import Header from './header';
import AddNoteFab from './addNoteFab';

class PostsList extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.fetchPosts();
    }
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
          >Delete Selected Notes</button>
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

export default connect(mapStateToProps, { fetchPosts, logoutUser, showModal, getPostDetails, multiDelete })(PostsList);