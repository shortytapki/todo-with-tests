import { TabView, TabPanel } from "primereact/tabview";
import { TodoList } from "../TodoList/TodoList";
import { useStore } from "@app";

export const Tabs = () => {
  const { state } = useStore();
  const activeTodos = state.todos.filter((todo) => !todo.isDone);
  const completedTodos = state.todos.filter((todo) => todo.isDone);
  return (
    <TabView>
      <TabPanel header='All'>
        <TodoList items={state.todos} />
      </TabPanel>
      <TabPanel header='Active'>
        <TodoList items={activeTodos} />
      </TabPanel>
      <TabPanel header='Completed'>
        <TodoList items={completedTodos} />
      </TabPanel>
    </TabView>
  );
};
