import { Hono } from "hono";

const todoRouter = new Hono();

todoRouter.get("/test", (c) => c.text("Hello From Todo Router"));

export { todoRouter };
