import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { createTodo, removeTodo } from '../actions/index';

class TodoInput extends Component {

  onKeyDown(e) {
    // if not press enter, return
    if (e.which !== 13) return true;

    const { addTodo } = this.props;
    const text = e.target.value.trim();
    addTodo(text);
  }

  render() {
    return (
      <div>
        <h2>Input</h2>
        <input type='text' onKeyDown={this.onKeyDown.bind(this)}/>
      </div>
    );
  }
}

class Bar extends Component {
  render() {
    const {
      status,
      changeFilter,
      clearCompleted,
      activeTodosCount
    } = this.props;

    return (
      <div>
        <h2>Bar</h2>
        <span>{activeTodosCount} items left</span>
        {['All', 'Active', 'Complete'].map((name, index) => {
          return (
            <span
              key={index}//三个简写－－》根据name取值；
              className={status === name && 'active'}
              onClick={() => changeFilter(name)}
            >
              {name}
            </span>
          );
        })}
        <button onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </div>
    );
  }
}

class TodoItem extends Component {
  constructor(props) {//初始状态
    super(props);
    this.state = {
      editing: false
    };
  }

  onClick(e) {
    const { deleteTodo, index } = this.props;
    deleteTodo(index);
  }

  onKeyDown(e) {
    if (e.which === 13) this.setState({editing: false});
  }

  render() {
    const { todo, changeStatus, index } = this.props;
    return (
      <div>
        {todo.active && <button onClick={() => changeStatus(index)}>Complete</button>}
        {this.state.editing ?
          <input onKeyDown={this.onKeyDown.bind(this)}/>
          :
          <span onDoubleClick={()=> this.setState({editing: true})}>{todo.text}</span>
        }
        <span className='delete-icon' onClick={this.onClick.bind(this)}>X</span>
      </div>
    );
  }
}

class TodoList extends Component {
  render() {
    const { todos, deleteTodo, changeStatus} = this.props;
    return (
      <div>
        <h1>Todo List</h1>
        {todos.map((item, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={item}
            deleteTodo={deleteTodo}
            changeStatus={changeStatus}
          />
        ))}
        <hr />
      </div>
    );
  }
}

export default class TodoBox extends Component {
  constructor(props) {//初始状态
    super(props);
    this.state = {
      todos: [
        { text: 'example', active: true },
        { text: 'example 2', active: true },
        { text: 'complete item', active: false }
      ],
      filter: 'All'
    };
    this.addTodo = this.addTodo.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus(index) {
    const { todos } = this.state;
    const newTodo = Object.assign({}, todos[index], {active: false});
    const leftTodos = [...todos.slice(0, index), newTodo, ...todos.slice(index + 1, todos.length)];
    this.setState({todos: leftTodos});
  }

  deleteTodo(index) {
    const { todos } = this.state;
    const leftTodos = [...todos.slice(0, index), ...todos.slice(index + 1, todos.length)];
    this.setState({todos: leftTodos});
  }

  addTodo(text) {
    const newTodos = this.state.todos.slice();//复制旧的todos
    newTodos.unshift({ text: text, active: true });
    this.setState({todos: newTodos});
  }

  changeFilter(name) {
    this.setState({filter: name});
  }

  clearCompleted() {
    const leftTodos = this.state.todos.filter(item => item.active);
    this.setState({todos: leftTodos});
  }

  render() {
    const { todos, filter } = this.state;

    // filter display todos
    let displayTodos = todos;
    if (filter === 'Active') {
      displayTodos = todos.filter(item => item.active);
    } else if (filter === 'Complete') {
      displayTodos = todos.filter(item => !item.active);
    }

    const activeTodosCount = todos.filter(item => item.active).length;

    return (
      <div className='todo-box'>
        <TodoInput addTodo={this.addTodo}/>
        <TodoList
          todos={displayTodos}
          deleteTodo={this.deleteTodo}
          changeStatus={this.changeStatus}
        />
        <Bar
          status={filter}
          changeFilter={this.changeFilter}
          clearCompleted={this.clearCompleted}
          activeTodosCount={activeTodosCount}
        />
      </div>
    );
  }
}


// function mapStateToProps(state) {
//   const { todos } = state;
//   return {
//     todos
//   };
// }


// export default connect(
//   mapStateToProps,
//   {
//     createTodo,
//     removeTodo
//   }
// )(TodoBox);
