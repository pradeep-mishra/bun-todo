import React, { useRef } from "react";

export const Todo = ({ todo, onDone, onDelete }) => {
  const inputRef = useRef(null);
  return (
    <div className="flex justify-between hover:bg-gray-100 px-2">
      <div className="flex-grow">
        <input
          ref={inputRef}
          className="hidden"
          type="checkbox"
          id={`todo_${todo.id}`}
          defaultChecked={todo.done === 1 ? true : false}
          onClick={() => onDone(todo, inputRef.current.checked)}
        />
        <label
          className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
          htmlFor={`todo_${todo.id}`}
        >
          <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="ml-4 text-sm">{todo.name}</span>
        </label>
      </div>
      <button
        className="flex text-sm items-center"
        onClick={() => onDelete(todo)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 18 18"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg>
      </button>
    </div>
  );
};

export default Todo;
