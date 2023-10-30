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
      .post(
        "/register",
        ({ body, store }) => store.usersService.register(body),
        {
          body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String(),
          }),
          detail: {
            summary: "Register",
            tags: ["Auth"],
          },
          response: {
            200: t.Object({
              accessToken: t.String(),
            }),
            400: t.Object({
              error: t.String(),
            }),
          },
        }
      )
      .post("/login", ({ body, store }) => store.usersService.login(body), {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
        detail: {
          summary: "Login",
          tags: ["Auth"],
        },
      })
      .get(
        "validate",
        async ({ request, store }) =>
          store.usersService.validate(
            await store.authService.getUserIdFromHeader(request.headers)
          ),
        {
          beforeHandle: app.store.authService.requireLogin,
          detail: {
            summary: "Current User",
            tags: ["Auth"],
          },
        }
      )
);
