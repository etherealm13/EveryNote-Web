import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Header from '../common/header';
import Loader from '../common/loading';
import TodoComponent from './todoListComponent';
import { fetchTodos, deleteCompleted } from '../../actions/index';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  componentWillMount(){
    this.props.fetchTodos();
  }

  componentDidMount(){
    document.title = "Todos - EveryNote";
  }

  clickHandler(type, main, urgent, others){
    this.props.deleteCompleted({ type, main, urgent, others });
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
        return <TodoComponent 
          key={field.name} 
          type={field.type} 
          name={field.name} 
          todo={todos}
          clickHandler={() => this.clickHandler(field.type, this.props.mainTodos, this.props.urgentTodos, this.props.otherTodos)}
        />
    })
  }

  render() {
    return (
      <div>
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
  let mainTodos = {}, urgentTodos = {}, otherTodos = {};
  if(todos != undefined){
    if(todos.main != undefined){
      mainTodos = todos.main.tasks;
      mainTasks = _.map(todos.main.tasks, (val, uniqueid) => {
        return { ...val, uniqueid };
      });
    }

    if(todos.urgent != undefined){
      urgentTodos = todos.urgent.tasks;
      urgentTasks = _.map(todos.urgent.tasks, (val, uniqueid) => {
        return { ...val, uniqueid };
      });
    }
    
    if(todos.others != undefined){
      otherTodos = todos.others.tasks;
      otherTasks = _.map(todos.others.tasks, (val, uniqueid) => {
        return { ...val, uniqueid };
      });
    }
  }
  return { 
    mainTasks,
    mainTodos,
    urgentTasks,
    urgentTodos,
    otherTasks,
    otherTodos
  }
}

export default connect(mapStateToProps, {
   fetchTodos,
   deleteCompleted
 })(TodoList);
