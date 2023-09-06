import { FC, PropsWithChildren, createContext, useContext } from "react";
import { StateSchema, Todo, useTodoReducer } from "./Reducer";

interface StoreActions {
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  changeStatus: (payload: { id: number; isDone: boolean }) => void;
  clearCompleted: () => void;
}

export interface Store {
  state: StateSchema;
  actions: StoreActions;
}

const storeContext = createContext<Store | null>(null);

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { state, actions } = useTodoReducer();

  return (
    <storeContext.Provider value={{ state, actions }}>
      {children}
    </storeContext.Provider>
  );
};

export const useStore = () => {
  const { state, actions } = useContext(storeContext) as Store;
  return { state, actions };
};
