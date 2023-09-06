import { Todo } from "../../app/store/Reducer";
import { Item } from "./Item";

interface TodoListProps {
  items: Todo[];
}

export const TodoList = ({ items }: TodoListProps) => {
  return (
    <ul>
      <ul className='list-none flex flex-column gap-4'>
        {items.map((todo) => (
          <li key={todo.id}>
            <Item todo={todo} />
          </li>
        ))}
      </ul>
    </ul>
  );
};
