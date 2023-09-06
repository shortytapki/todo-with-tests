import { localStorageController } from "./LocalStorageController";

describe("Test of local storage controller", () => {
  const mockTodo1 = { id: 1, isDone: false, task: "Test" };
  const mockTodo2 = { id: 2, isDone: false, task: "Test" };
  const mockTodo3 = { id: 3, isDone: false, task: "Test" };

  test("Should initialize", () => {
    const storedTodos = localStorageController.storedTodos;
    expect(storedTodos).toHaveLength(0);
  });

  test("Should add", () => {
    localStorageController.addTodo(mockTodo1);
    localStorageController.addTodo(mockTodo2);
    localStorageController.addTodo(mockTodo3);
    expect(localStorageController.storedTodos).toHaveLength(3);
  });

  test("Should remove", () => {
    localStorageController.removeTodo(1);
    expect(localStorageController.storedTodos).toHaveLength(2);
  });

  test("Should change status", () => {
    localStorageController.changeStatus({ id: 2, isDone: true });
    localStorageController.changeStatus({ id: 3, isDone: true });
    localStorageController.storedTodos.forEach((todo) => {
      expect(todo.isDone).toBeTruthy();
    });
    localStorageController.changeStatus({ id: 2, isDone: false });
    localStorageController.changeStatus({ id: 3, isDone: false });
    localStorageController.storedTodos.forEach((todo) => {
      expect(todo.isDone).not.toBeTruthy();
    });
  });

  test("Should clear completed", () => {
    localStorageController.changeStatus({ id: 2, isDone: true });
    localStorageController.changeStatus({ id: 3, isDone: true });
    localStorageController.clearCompleted();
    localStorageController.storedTodos.forEach((todo) => {
      expect(todo.isDone).not.toBeTruthy();
    });
  });
});
