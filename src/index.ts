import { Elysia } from 'elysia';
import { setupApp } from '@/app.module';

const app = new Elysia()
  .use(setupApp)
  .get('/', ({ set }) => {
    set.redirect = '/swagger';
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running! Access Swagger UI at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);