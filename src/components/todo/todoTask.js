import React from 'react';

const TodoTask = (props) => {
  return (
      <div className="todo-task-component">
        <div className="checkbox-div inline-block-div">
            <label className="custom-checkbox">
              <input type="checkbox" className="custom-control-input" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <p>
            {props.task}
            </p>
          </div>
      </div>
  );
};

export default TodoTask;
