import React from 'react';

const TodoTask = () => {
  return (
      <div className="">
        <div className="checkbox-div inline-block-div">
            <label className="custom-checkbox">
              <input type="checkbox" className="custom-control-input" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            Sample TodoComponent Data
          </div>

      </div>
  );
};

export default TodoTask;
