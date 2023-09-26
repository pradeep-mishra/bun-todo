import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Todo from "./Todo";
const serverPort = "3311";

function updateTodo(newTodo) {
  return fetch(`http://localhost:${serverPort}/todos/${newTodo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTodo)
  });
}

function deleteTodo(todo) {
  return fetch(`http://localhost:${serverPort}/todos/${todo.id}`, {
    method: "DELETE"
  });
}

const TodoList = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery("todos", () =>
    fetch(`http://localhost:${serverPort}/todos`, { timeout: 5000 }).then(
      (res) => res.json()
    )
  );

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        //
      }
    }
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: (data) => {
      if (data?.status === 200) {
        console.log("todo deleted successfully");
        queryClient.invalidateQueries("todos", { exact: true });
      }
    }
  });

  const onDone = (todo, done) => {
    updateTodoMutation.mutate({ ...todo, done: done ? 1 : 0 });
  };

  const onDelete = (todo) => {
    deleteTodoMutation.mutate(todo);
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      {data.map((todo) => (
        <Todo key={todo.id} todo={todo} onDone={onDone} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;
