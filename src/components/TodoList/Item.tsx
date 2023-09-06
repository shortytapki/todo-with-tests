import { useStore, type Todo, localStorageController } from "@app";
import "./Item.css";

interface ItemProps {
  todo: Todo;
}

export const Item = ({ todo }: ItemProps) => {
  const { actions } = useStore();

  return (
    <article className='p-4 border-round-md todo flex align-items-center justify-content-between'>
      <div
        className='flex align-items-center gap-3 cursor-pointer'
        onClick={() => {
          localStorageController.changeStatus({
            id: todo.id,
            isDone: !todo.isDone,
          });
          actions.changeStatus({ id: todo.id, isDone: !todo.isDone });
        }}
      >
        <i
          className={`pi ${
            todo.isDone ? "pi-check-circle" : "pi-circle"
          } cursor-pointer scale`}
        ></i>
        <h2 className={todo.isDone ? "line-through" : ""}>{todo.task}</h2>
      </div>
      <i
        className='pi pi-trash cursor-pointer scale'
        onClick={() => {
          localStorageController.removeTodo(todo.id);
          actions.removeTodo(todo.id);
        }}
      ></i>
    </article>
  );
};
