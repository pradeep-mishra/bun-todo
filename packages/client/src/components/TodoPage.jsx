import React, { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
const serverPort = "3311";

function addNewTodo(newTodo) {
  return fetch(`http://localhost:${serverPort}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTodo)
  });
}

const TodoPage = ({ children }) => {
  const queryClient = useQueryClient();
  const inputRef = useRef(null);

  const addTodoMutation = useMutation(addNewTodo, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        queryClient.invalidateQueries("todos", { exact: true });
      }
    }
  });

  const onAdd = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodoMutation.mutate({ name: inputRef.current.value, done: 0 });
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
      <div className="max-w-full p-8 bg-white rounded-lg shadow-lg w-96">
        <div className="flex items-center mb-6">
          <svg
            className="h-8 w-8 text-indigo-500 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h4 className="font-semibold ml-3 text-lg">My Todos</h4>
        </div>

        {children}

        <button className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded">
          <svg
            className="w-5 h-5 text-gray-400 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <input
            ref={inputRef}
            onKeyUp={onAdd}
            className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
            type="text"
            placeholder="add a new task"
          />
        </button>
      </div>
    </div>
  );
};

export default TodoPage;
