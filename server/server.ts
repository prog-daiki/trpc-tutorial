import express from "express"
import { initTRPC } from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors"
import { z } from "zod"

const app = express();
const PORT = 5001;
app.use(cors())

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

type Todo = {
  id: string;
  content: string;
}

const todoList: Todo[] = [
  {
    id: "1",
    content: "散歩",
  },
  {
    id: "2",
    content: "プログラミング",
  }
]

const appRouter = router({
  test: publicProcedure.query(async () => {
    return "Test TRPC";
  }),
  getTodos: publicProcedure.query(async () => {
    return todoList;
  }),
  addTodo: publicProcedure.input(z.string()).mutation((req) => {
    const id = `${Math.random()}`;
    const todo: Todo = {
      id,
      content: req.input,
    }
    todoList.push(todo);
    return todoList;
  }),
  deleteTodo: publicProcedure.input(z.string()).mutation((req) => {
    const idTodoDelete = req.input;
    const indexToDelete = todoList.findIndex(
      (todo) => todo.id === idTodoDelete
    )

    todoList.splice(indexToDelete, 1);
    return todoList;
  }),

});

app.use("/trpc", trpcExpress.createExpressMiddleware({
  router: appRouter,
}))

app.listen(PORT);

export type appRouter = typeof appRouter;
