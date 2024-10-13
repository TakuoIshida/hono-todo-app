import { Hono } from "hono";
import { ConfigBindings } from "./config";

export const newApp = () => {
  const app = new Hono<ConfigBindings>();
  app.onError((err, c) => {
    console.error(`${err}`);
    return c.text("Custom Error Message", 500);
  });
  return app;
};

export type App = ReturnType<typeof newApp>;
