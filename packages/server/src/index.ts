import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { Database } from "bun:sqlite";
import { createTable } from "./createTable";
import TodoService from "./todos/service";

const app = new Elysia();
const db = new Database("db.todo", { create: true });
const todoService = new TodoService(db);

app.use(cors({ maxAge: 3000, preflight: true }));

app.get("/todos", todoService.getAllTodo);

app.post("/todos", todoService.createTodo, { body: todoService.dto.newTodo });

app.delete("/todos/:id", todoService.deleteTodo, {
  params: todoService.dto.deleteTodo
});

app.put("/todos/:id", todoService.updateTodo, {
  body: todoService.dto.updateTodo,
  params: todoService.dto.deleteTodo
});

app.listen(3311);

createTable(db, "todos");

console.log(
  `Todo app is running at ${app.server?.hostname}:${app.server?.port}`
);
