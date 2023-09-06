import { useReducer } from "react";

export type Todo = {
  id: number;
  isDone: boolean;
  task: string;
};

export type StateSchema = {
  todos: Todo[];
};

type Action<T, P> = {
  type: T;
  payload: P;
};

type TodoAction =
  | Action<"ADD", Todo>
  | Action<"REMOVE", number>
  | Action<"CHANGE_STATUS", { id: number; isDone: boolean }>
  | Action<"CLEAR_COMPLETED", null>;

export const INITIAL_STATE: StateSchema = {
  todos: [],
};

export const todoReducer = (
  state: StateSchema = INITIAL_STATE,
  action: TodoAction
): StateSchema => {
  const { type, payload } = action;

  switch (type) {
    case "ADD":
      return { ...state, todos: [...state.todos, payload] };
    case "REMOVE":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    case "CHANGE_STATUS":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === payload.id) {
            todo.isDone = payload.isDone;
          }
          return todo;
        }),
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          todo.isDone = false;
          return todo;
        }),
      };
    default:
      return { ...state };
  }
};

export const useTodoReducer = () => {
  const [state, dispatch] = useReducer(todoReducer, INITIAL_STATE);
  const actions = {
    addTodo: (todo: Todo) => dispatch({ type: "ADD", payload: todo }),
    removeTodo: (id: number) => dispatch({ type: "REMOVE", payload: id }),
    changeStatus: (payload: { id: number; isDone: boolean }) =>
      dispatch({ type: "CHANGE_STATUS", payload }),
    clearCompleted: () => dispatch({ type: "CLEAR_COMPLETED", payload: null }),
  };

  return { state, actions };
};
