import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodos, changeTodoStatus } from '../../actions/index';
import moment from 'moment';

class TodoTask extends Component {
  selectedTaskItem(){
    this.props.changeTodoStatus({taskData: this.props.data, type: this.props.type});
  }

  filterDate(){
    let date = this.props.data.dateStamp;
    return moment(date).format('h:mm a, Do MMM, YY');
  }

  render() {
    return (
      <div className="todo-task-component">
        <div className="checkbox-div inline-block-div">
            <label className="custom-checkbox">
              <input 
              type="checkbox"
              value={this.props.data.completed}
              checked={this.props.data.completed}
              className="custom-control-input" 
              onChange={this.selectedTaskItem.bind(this)} />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <p className={(this.props.data.completed) ? 'todo-item-text completed' : 'todo-item-text' }>
            {this.props.data.task}
            </p>
            <p className="post-card-stamp">{this.filterDate()}</p>
          </div>
      </div>
    );
  }
}

export default connect(null, {
   fetchTodos, changeTodoStatus
 })(TodoTask);

