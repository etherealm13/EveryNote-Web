import React from 'react';
import Header from '../common/header';
import TodoTask from './todoTask';
import AddTaskForm from './addTaskForm';

const TodoComponent = () => {
  return (
  		<div className="col-lg-4">
        <div className="todo-component">
          <table className="table">
            <thead className="todo-component-header">
              <tr>
              <th>Main</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><TodoTask /></td>
              </tr>
              <tr>
                <td><TodoTask /></td>
              </tr>
              <tr>
                <td><TodoTask /></td>
              </tr>
              <tr>
                <td><TodoTask /></td>
              </tr>
              <tr>
                <td><TodoTask /></td>
              </tr>
              <tr>
                <td><TodoTask /></td>
              </tr>
              <tr>
                <td><AddTaskForm /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default TodoComponent;
