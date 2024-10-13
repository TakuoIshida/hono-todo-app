import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { handle } from "hono/vercel";
import { newApp } from "./customHono";

const app = newApp().basePath("/api/");

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
    // console.log("DATABASE_URL", DATABASE_URL);
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
