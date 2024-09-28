import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { prettyJSON } from "hono/pretty-json";
import userRouter from "./router/user";

const app = new Hono();
app.use(prettyJSON());

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

app.route("/users", userRouter);

const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof app;
