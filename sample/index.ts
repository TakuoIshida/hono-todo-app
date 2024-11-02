import { Hono } from "hono";
import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";
import { z } from "zod";

// Zodで環境変数のスキーマを定義
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  APP_ENV: z.enum(["local", "dev", "prod"]),
});

type Env = {
  Variables: {
    config: {
      DATABASE_URL: string;
      APP_ENV: "local" | "dev" | "prod";
    };
  };
};

const app = new Hono<Env>();

// 環境変数をバリデーションし、Contextに追加するミドルウェア
const loadConfig = createMiddleware<Env>(async (c, next) => {
  // hono/adapterのenv関数を使って環境変数を取得
  const rawEnv = env(c);
  const envResult = envSchema.safeParse(rawEnv);

  if (!envResult.success) {
    // バリデーションが失敗した場合にエラーを投げる
    throw new Error(
      `環境変数のバリデーションに失敗しました: ${envResult.error}`
    );
  }

  // バリデート済みの環境変数をContextにセット
  c.set("config", envResult.data);

  await next();
});

app.use(loadConfig); // ミドルウェアをアプリケーションに登録

// ルートでバリデート済みの環境変数を利用
app.get("/hello", (c) => {
  const { config } = c.var;
  console.log(`App Environment: ${config.APP_ENV}`); // APP_ENVの利用例
  return c.text("Hello, Hono!");
});

export default app;
