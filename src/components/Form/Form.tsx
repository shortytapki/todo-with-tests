import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { useState } from "react";
import { Todo } from "../../app/store/Reducer";
import { useStore } from "@app";

const Form = () => {
  const [inputText, setInputText] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const { actions } = useStore();

  const addingTodo: Todo = {
    id: Math.random(),
    isDone: false,
    task: inputText,
  };

  return (
    <form
      data-testid='form'
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmited(true);
        if (inputText.length > 0) {
          actions.addTodo(addingTodo);
          const input = e.currentTarget.querySelector("input");
          input!.value = "";
        }
      }}
    >
      <div className='p-inputgroup mb-3'>
        <span className='p-inputgroup-addon'>
          <i className='pi pi-angle-right'></i>
        </span>
        <label className='p-sr-only'>Todo</label>
        <InputText
          data-testid='input'
          id='todo'
          placeholder='What needs to be done?'
          className='mr-4'
          onChange={(e) => {
            setIsSubmited(false);
            setInputText(e.currentTarget.value);
          }}
        />
        {inputText.length === 0 && isSubmited && (
          <Message severity='error' text='The field is empty.' />
        )}
      </div>
      <div className='flex gap-4 mb-3'>
        <Button type='submit' data-testid='submit-button'>
          Add
        </Button>
        <Button onClick={() => actions.clearCompleted()} type='button'>
          Clear completed
        </Button>
      </div>
    </form>
  );
};

export { Form };
