import { DB } from "./types";
import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import { config } from "dotenv";

config();
// TODO: honoのenvファイルを使いconfignにまとめる
// import { env } from 'hono/adapter'
// https://hono.dev/docs/helpers/adapter#env

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
  log: (event) => {
    // local開発時は実行されたSQLをはく。event.level: "query" | "error"
    if (event.level == "query") {
      const q = event.query;
      const time = Math.round(event.queryDurationMillis * 100) / 100;
      console.log(
        `\u001b[34mkysely:sql\u001b[0m [${q.sql}] parameters: [${q.parameters}] time: ${time}`
      );
    }
  },
});
