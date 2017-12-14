import React from 'react';
import Header from '../common/header';
import TodoComponent from './todoListComponent';

const Todo = () => {
  return (
  	<div className="">
  		<Header />
  		<div className="container my-5">
            <div className="row todo-component-wrapper">
              <TodoComponent />
              <TodoComponent />
              <TodoComponent />
            </div>
        </div>
  	</div>
  );
};

export default Todo;
