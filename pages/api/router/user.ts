import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { ulid } from "ulid";
import { db } from "../database/client";

const userRouter = new Hono();

userRouter.get("/", async (c) => {
  const result = await db.selectFrom("users").selectAll().execute();
  console.log("result", result);
  return c.json({
    status: 200,
    data: result,
  });
});

const schema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
});

userRouter.post("/", zValidator("json", schema), async (c) => {
  const data = c.req.valid("json");
  const newId = ulid();
  await db.transaction().execute(async () => {
    await db
      .insertInto("users")
      .values({
        id: newId,
        name: data.name,
        email: data.email,
      })
      .execute();
  });

  return c.json({
    status: 201,
    message: `user: ${data.name} is created`,
  });
});

export default userRouter;
