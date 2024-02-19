import Router from "koa-router";
import { UserService } from "../application/user/user.service";

const userRouter = new Router();

export const createUserRouter = (userService: UserService) => {
  userRouter.post('/user', async (ctx) => {
  });

  userRouter.put('/user', async (ctx) => {
  });

  userRouter.get('/user', async (ctx) => {
  });

  userRouter.get('/user/:id', async (ctx) => {
  });

  return userRouter.routes();
};
