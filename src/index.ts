import Koa from "koa";

const app = new Koa();
const PORT = process.env.SERVER_PORT ?? 3000;

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(PORT);
