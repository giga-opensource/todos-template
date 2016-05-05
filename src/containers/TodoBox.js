import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../actions/index';

class TodoBox extends Component {
  onCreateTodo() {
    const { createTodo } = this.props;
    createTodo('new todo');
  }

  render() {
    const { todos } = this.props;
    return (
      <div className='todo-box'>
        <div>
          <button onClick={this.onCreateTodo.bind(this)}>
            Add Todo
          </button>
        </div>
        <div>
          <h2>List:</h2>
          {todos.map((item, index) => <div key={index}>{item.text}</div>)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(
  mapStateToProps,
  {
    createTodo
  }
)(TodoBox);
