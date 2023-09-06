import { todoReducer, INITIAL_STATE, StateSchema } from "./Reducer";
import { expect, test, describe } from "vitest";

describe("Reducer test", () => {
  const mockTodo1 = {
    id: 1,
    task: "Test 1",
    isDone: false,
  };

  const mockTodo2 = {
    id: 2,
    task: "Test 2",
    isDone: false,
  };

  test("Should add some todos", () => {
    let state = todoReducer(INITIAL_STATE, {
      type: "ADD",
      payload: mockTodo1,
    });

    expect(state).toStrictEqual({ todos: [mockTodo1] });

    state = todoReducer(state, {
      type: "ADD",
      payload: mockTodo2,
    });

    expect(state).toStrictEqual({ todos: [mockTodo1, mockTodo2] });
  });

  test("Should remove picked todos", () => {
    let state: StateSchema = {
      todos: [mockTodo1, mockTodo2],
    };

    state = todoReducer(state, { type: "REMOVE", payload: 1 });

    expect(state).toStrictEqual({ todos: [mockTodo2] });

    state = todoReducer(state, { type: "REMOVE", payload: 2 });

    expect(state).toStrictEqual({ todos: [] });
  });

  test("Should shange status", () => {
    let state: StateSchema = {
      todos: [mockTodo1, mockTodo2],
    };

    state = todoReducer(state, {
      type: "CHANGE_STATUS",
      payload: { id: mockTodo1.id, isDone: !mockTodo1.isDone },
    });

    expect(state).toStrictEqual({
      todos: [{ ...mockTodo1, isDone: true }, mockTodo2],
    });

    state = todoReducer(state, {
      type: "CHANGE_STATUS",
      payload: { id: mockTodo2.id, isDone: !mockTodo2.isDone },
    });

    expect(state).toStrictEqual({
      todos: [
        { ...mockTodo1, isDone: true },
        { ...mockTodo2, isDone: true },
      ],
    });
  });

  test("Should clear completed", () => {
    let state: StateSchema = {
      todos: [
        { ...mockTodo1, isDone: true },
        { ...mockTodo2, isDone: true },
      ],
    };

    state = todoReducer(state, { type: "CLEAR_COMPLETED", payload: null });

    expect(state).toStrictEqual({
      todos: [
        { ...mockTodo1, isDone: false },
        { ...mockTodo2, isDone: false },
      ],
    });
  });
});
