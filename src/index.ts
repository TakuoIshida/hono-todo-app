import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { DB } from "./database/types";
import { Kysely, MysqlDialect } from "kysely";
import { zValidator } from "@hono/zod-validator";
import { config } from "dotenv";
import { createPool } from "mysql2";
import { z } from "zod";
import { ulid } from "ulid";
import { ok } from "assert";
config();

const dialect = new MysqlDialect({
  pool: createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 7306,
    connectionLimit: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});

const app = new Hono();

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

app.get("/users", async (c) => {
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

app.post("/users", zValidator("json", schema), async (c) => {
  const data = c.req.valid("json");
  const newId = ulid();
  await db
    .insertInto("users")
    .values({
      id: newId,
      name: data.name,
      email: data.email,
    })
    .execute();

  return c.json({
    status: 201,
    message: `user: ${data.name} is created`,
  });
});

const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof app;
