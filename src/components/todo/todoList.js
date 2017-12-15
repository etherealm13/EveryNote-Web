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
    let todos = [];
    let types = [
        {prop: 'mainTasks', name: 'Main', type: 'main'}, 
        {prop: 'urgentTasks', name: 'Urgent', type: 'urgent'},
        {prop: 'otherTasks', name: 'Others', type: 'others'}
      ];
    return types.map((field) => {
        if(this.props[field.prop] == undefined){
          todos = [];
        }else{
          todos = this.props[field.prop];
        }
        return <TodoComponent key={field.name} type={field.type} name={field.name} todo={todos}/>
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

function mapStateToProps(state) {
  let todos = state.todo.todos;
  let mainTasks = [], urgentTasks = [], otherTasks = [];
  if(todos != undefined){
    if(todos.main != undefined){
      mainTasks = _.map(todos.main.tasks, (val, uniqueid) => {
        return { ...val, uniqueid };
      });
    }

    if(todos.urgent != undefined){
      urgentTasks = _.map(todos.urgent.tasks, (val, uniqueid) => {
        return { ...val, uniqueid };
      });
    }
    
    if(todos.others != undefined){
      otherTasks = _.map(todos.others.tasks, (val, uniqueid) => {
        return { ...val, uniqueid };
      });
    }
  }
  return { mainTasks, urgentTasks, otherTasks }
}

export default connect(mapStateToProps, {
   fetchTodos
 })(TodoList);
