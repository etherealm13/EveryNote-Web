import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getPostDetails } from '../actions';

class PostCard extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  getPostDetails() {
    let rand = Math.floor(Math.random() * 5) + 1;
    this.props.getPostDetails(this.props.post.uniqueid, rand);

  }

  filterDate(){
    let date = this.props.post.dateStamp;
    return moment(date).format('h:mm a, Do MMM, YY');
  }

  render() {
    return (
        <div className="post-card" onClick={this.getPostDetails.bind(this)}>
          <h3 className="post-card-title">{this.props.post.title}</h3>
           <p className="post-card-stamp">{this.filterDate()}</p>
           <hr className="post-divider"/>
          <div className="post-card-description">{this.props.post.description}</div>
        </div>
    );
  }
}

export default connect(null, { getPostDetails })(PostCard);
