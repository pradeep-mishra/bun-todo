import { t } from "elysia";

export const newTodoDto = t.Object({
  name: t.String(),
  done: t.Optional(t.Number())
});

export const updateTodoDto = t.Object({
  id: t.Optional(t.Number()),
  name: t.Optional(t.String()),
  done: t.Optional(t.Union([t.Literal(1), t.Literal(0)])),
  desc: t.Optional(t.Union([t.String(), t.Null()]))
});

export const deleteTodoDto = t.Object({
  id: t.String({ minLength: 1 })
});
