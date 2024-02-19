import Koa from "koa";
import { UserServiceImpl } from "./application/user/user.service.impl";
import { createUserRouter } from "./infraestructure/user.router";

const app = new Koa();
const PORT = process.env.SERVER_PORT ?? 3000;

const userService = new UserServiceImpl();

app.use(createUserRouter(userService));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
