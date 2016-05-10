export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

export function createTodo(text) {
  return {
    type: CREATE_TODO,
    text
  };
}

export function removeTodo(index) {
  return {
    type: REMOVE_TODO,
    index
  };
}  
