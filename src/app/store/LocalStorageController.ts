import { Todo } from "./Reducer";

class LocalStorageController {
  private localStorageKey = "saved-todos";

  constructor() {}

  get storedTodos(): Todo[] {
    const todosAsString = localStorage.getItem(this.localStorageKey);
    return todosAsString ? JSON.parse(todosAsString) : [];
  }

  private updateTodos(todos: Todo[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  addTodo(todo: Todo) {
    const todos = this.storedTodos;
    const updatedTodos = todos.concat(todo);
    this.updateTodos(updatedTodos);
  }

  removeTodo(id: number) {
    const updatedTodos = this.storedTodos.filter((t) => t.id !== id);
    this.updateTodos(updatedTodos);
  }

  clearCompleted() {
    this.updateTodos(this.storedTodos.map((t) => ({ ...t, isDone: false })));
  }

  changeStatus(payload: { id: number; isDone: boolean }) {
    this.updateTodos(
      this.storedTodos.map((todo) => {
        if (todo.id === payload.id) {
          todo.isDone = payload.isDone;
        }
        return todo;
      })
    );
  }
}

export const localStorageController = new LocalStorageController();
