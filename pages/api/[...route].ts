// import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { prettyJSON } from "hono/pretty-json";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");
app.use(prettyJSON());

export const config = {
  runtime: "edge",
};

const helloRouters = app
  .post(
    "/hello",
    zValidator(
      "form",
      z.object({
        name: z.string(),
      })
    ),
    (c) => {
      const data = c.req.valid("form");
      return c.json({
        message: `Hello ${data.name}!`,
      });
    }
  )
  .get("/hello", async (c) => {
    return c.json({
      status: 201,
      message: `hello hono! from server `,
    });
  });

// app.route("/users", userRouter);

// server単体で提供する場合
// serve({
//   fetch: app.fetch,
//   port,
// });

export type AppType = typeof helloRouters;
export default handle(app);
