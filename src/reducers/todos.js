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
  case ActionTypes.REMOVE_TODO: {
    const index = action.index;
    return [...state.slice(0,index), ...state.slice(index + 1)];
  }
  default:
    return state;
  }
}
