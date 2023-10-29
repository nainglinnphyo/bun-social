import { Elysia, t } from "elysia";
import { setupUsers } from "./user.module";

export const authPlugin = new Elysia().use(setupUsers).group(
  "",
  {
    detail: {
      tags: ["Auth"],
    },
  },
  (app) =>
    app
      // app.get("/",
      // ({ store }) => store.usersService.findAll(),
      // )
      // app.post("login", ({ store }) => store.usersService.createEndUser())
      .post("/register", ({ body }) => body, {
        body: t.Object({
          username: t.String(),
          email: t.String(),
          password: t.String(),
        }),
      })
      .post("/login", ({ body }) => body, {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
      })
);
