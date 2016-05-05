import * as ActionTypes from '../actions/index';

export function todos(state = [], action) {
  switch (action.type) {
  case ActionTypes.CREATE_TODO: {
    const newTodos = state.slice();
    newTodos.unshift({
      text: action.text
    });
    return newTodos;
  }
  default:
    return state;
  }
}
