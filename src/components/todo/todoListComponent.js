import React from 'react';
import _ from 'lodash';
import Header from '../common/header';
import Loader from '../common/loading';
import TodoTask from './todoTask';
import AddTaskForm from './addTaskForm';

const renderTasksList = (props) => {
  if(!_.isEmpty(props.todo) && props.todo.length > 0){
    let sortedTodos = props.todo.sort(function(a,b) {
        return new Date(b.dateStamp) - new Date(a.dateStamp) 
    });

    return sortedTodos.map((i) => {
      return (
        <li className={props.type} key={i.uniqueid}>
          <TodoTask data={i} type={props.type} />
        </li>
      )
    })
  }
}

const renderDeleteButton = (props) => {
  return (
    <div className="inline-block-div task-remove">
      <div className="inline-block-div task-remove ">
        <span onClick={props.clickHandler} className="glyphicon glyphicon-trash"></span>
      </div>
      {/*     
      <div className="inline-block-div task-remove">
        <span onClick={props.clickHandler} className="glyphicon glyphicon-sort"></span>
      </div>
      */} 
    </div>
  )
}


const TodoComponent = (props) => {
  return (
    		<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
          <div className="todo-component">
            <div className={`todo-component-header ${props.type}`}>
            <h3 className="inline-block-div">{props.name}</h3>
              {renderDeleteButton(props)}
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
