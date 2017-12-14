import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Header from '../common/header';
import Loader from '../common/loading';
import TodoComponent from './todoListComponent';
import { fetchTodos } from '../../actions/index';

class TodoList extends Component {
  
  componentWillMount(){
    this.props.fetchTodos();
  }

  componentDidMount(){
    document.title = "Add Note - EveryNote";
  }

  renderList(){
    let types = [
        {prop: 'mainTasks', name: 'Main', type: 'main'}, 
        {prop: 'urgentTasks', name: 'Urgent', type: 'urgent'}
      ];
    return types.map((field) => {
        return <TodoComponent key={field.name} type={field.type} name={field.name} todo={this.props[field.prop]}/>
    })
  }

  render() {
    return (
      <div className="">
        <Header />
        <div className="container my-5">
              <div className="row todo-component-wrapper">
                {this.renderList()}
              </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let todos = state.todo.todos;
  if(todos != undefined && todos.main != undefined && todos.urgent != undefined){
    let mainTasks = _.map(todos.main.tasks, (val, uniqueid) => {
      return { ...val, uniqueid };
    });
        
    let urgentTasks = _.map(todos.urgent.tasks, (val, uniqueid) => {
      return { ...val, uniqueid };
    });

  // const mainTasks = _.map(state.todo.todos, (val, uniqueid) => {
  //   return { ...val, uniqueid };
  // });
  // console.log(types);
  // const todo = _.map(types, (val, uniqueid) => {
  //   return { ...val, uniqueid };
  // });
  console.log('todo ',mainTasks, urgentTasks);
  return { mainTasks, urgentTasks }
  }
  return {}
}

export default connect(mapStateToProps, {
   fetchTodos
 })(TodoList);
