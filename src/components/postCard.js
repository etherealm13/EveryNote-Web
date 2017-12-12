import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getPostDetails, multiselect } from '../actions';

class PostCard extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  getPostDetails() {
    let rand = Math.floor(Math.random() * 5) + 1;
    this.props.getPostDetails(this.props.post.uniqueid, rand);
  }

  selectedNote(){
    this.props.multiselect(this.props.post.uniqueid);
  }

  filterDate(){
    let date = this.props.post.dateStamp;
    return moment(date).format('h:mm a, Do MMM, YY');
  }

  render() {
    return (
        <div className="post-card">
          <div className="checkbox-div inline-block-div">
            <input type="checkbox" value={this.props.post.uniqueid} 
          onClick={this.selectedNote.bind(this)} />
          </div>
            <h3 className="post-card-title">{this.props.post.title}
            </h3>
          <div className="clear-both">
            <p className="post-card-stamp">{this.filterDate()}</p>
          </div>
           <hr className="post-divider"/>
          <div onClick={this.getPostDetails.bind(this)}>
            <div className="post-card-description">
            {this.props.post.description}
            </div>
            <span className="more-icon glyphicon glyphicon-arrow-right">
            </span>
          </div>
        </div>
    );
  }
}

export default connect(null, { getPostDetails, multiselect })(PostCard);
