import React, { Component } from 'react';
import { connect } from 'react-redux';
import { taskTitleChanged, addTask, fetchTodos } from '../../actions/index';

class AddTaskForm extends Component {
  constructor(props){
    super(props);
    this.type= props.data;
  }

  onTitleChange(event) {
    this.props.taskTitleChanged(event.target.value, this.type);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.props[this.type] !== '') {
      this.props.addTask(this.props[this.type], this.type);
    }
  }

  render() {
    return (
    <form className="" onSubmit={this.handleFormSubmit.bind(this)} >
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add task ( max 100 characters )"
          label="task"
          value={this.props[this.type] || ''}
          onChange={this.onTitleChange.bind(this)}
          maxLength={100}
        />
        <span className="input-group-btn">
          <button className="btn btn-success" type="submit">
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        </span>
      </div>
    </form>
  );
  }
}

function mapStateToProps(state, ownProps) {
  if(ownProps.data == 'main'){
    return {
      main : state.todo[ownProps.data]
    };
  }
  if(ownProps.data == 'urgent'){
    return {
      urgent : state.todo[ownProps.data]
    };
  }
  if(ownProps.data == 'others'){
    return {
      others : state.todo[ownProps.data]
    };
  }
  return {state}
}

export default connect(mapStateToProps, {
   taskTitleChanged,
   addTask,
   fetchTodos
 })(AddTaskForm);
