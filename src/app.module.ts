import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  ERROR_CODE_STATUS_MAP,
} from "./errors";
import { authPlugin } from "./users/users.plugin";

export const setupApp = () => {
  return new Elysia()
    .error({
      AUTHENTICATION: AuthenticationError,
      AUTHORIZATION: AuthorizationError,
      BAD_REQUEST: BadRequestError,
    })
    .onError(({ error, code, set }) => {
      set.status = ERROR_CODE_STATUS_MAP.get(code);
      const errorType = "type" in error ? error.type : "internal";
      return { errors: { [errorType]: error.message } };
    })
    .use(
      swagger({
        documentation: {
          info: {
            title: "Bun E-commerce",
            version: "v1",
            description: "Mini e-commerce with bun, elysia",
          },
        },
        exclude: ["/"],
      })
    )
    .group("api", (app) => app.group("/auth", (app) => app.use(authPlugin)));
};
