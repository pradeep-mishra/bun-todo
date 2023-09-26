import { Database } from "bun:sqlite";
import { newTodoDto, deleteTodoDto, updateTodoDto } from "./schema";

export default class TodoService {
  constructor(private db: Database) {}
  dto = {
    newTodo: newTodoDto,
    deleteTodo: deleteTodoDto,
    updateTodo: updateTodoDto
  };
  createTodo = ({ body }) => {
    const query = this.db.query(
      `INSERT INTO todos (name, done) VALUES ('${body.name}', ${
        body.done ?? 0
      }) RETURNING id, name, done`
    );
    const results = query.get();
    return results;
  };
  deleteTodo = ({ params }) => {
    const query = this.db.query(`DELETE FROM todos WHERE id = ?1`);
    const result = query.get(params.id);
    return result;
  };
  updateTodo = ({ body, params }) => {
    const updatedata = [];
    if (body.name) {
      updatedata.push(`name = '${body.name}'`);
    }
    if (!isNaN(body.done)) {
      updatedata.push(`done = ${body.done}`);
    }

    const query = this.db.query(
      `UPDATE todos SET ${updatedata.join(",")}  WHERE id = ?1`
    );
    const result = query.get(params.id);
    return result;
  };
  getAllTodo = () => {
    const query = this.db.query("SELECT * FROM todos");
    const results = query.all();
    return results;
  };
}
