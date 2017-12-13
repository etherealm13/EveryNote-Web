import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getPostDetails, multiselect, resetMultiSelect } from '../../actions';

class PostCard extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  getPostDetails() {
    let rand = Math.floor(Math.random() * 5) + 1;
    this.props.getPostDetails(this.props.post.uniqueid, rand);
    this.props.resetMultiSelect(this.props.data);
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
            <label className="custom-checkbox">
              <input type="checkbox" className="custom-control-input" value={this.props.post.uniqueid} 
          onClick={this.selectedNote.bind(this)} />
              <span className="checkmark"></span>
            </label>
          </div>
            <h3 title={this.props.post.title} className="post-card-title">{this.props.post.title}
            </h3>
          <div className="clear-both">
            <p className="post-card-stamp">{this.filterDate()}</p>
          </div>
           <hr className="post-divider"/>
          <div title="Click to view details" onClick={this.getPostDetails.bind(this)}>
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

export default connect(null, { getPostDetails, multiselect, resetMultiSelect })(PostCard);
