import React from 'react';
import _ from 'lodash';
import Header from '../common/header';
import Loader from '../common/loading';
import TodoTask from './todoTask';
import AddTaskForm from './addTaskForm';

const renderTasksList = (props) => {
  if(!_.isEmpty(props.todo) && props.todo.length > 0){
    return props.todo.map((i) => {
      return (
        <li className={props.type} key={i.uniqueid}>
          <TodoTask task={i.task} />
        </li>
      )
    })
  }
  return <Loader />
}
const TodoComponent = (props) => {
  return (
    		<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div className="todo-component">
            <div className={`todo-component-header ${props.type}`}>
            <h3>{props.name}</h3>
            </div>
            <ul className="todo-task-list">
              {renderTasksList(props)}
            </ul>
            <div className="add-task-form">
              <AddTaskForm data={props.type}/>
            </div>
          </div>
        </div>
  );
};

export default TodoComponent;
