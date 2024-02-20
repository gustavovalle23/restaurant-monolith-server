import Router from "koa-router";
import { UserService } from "../application/user/user.service";
import { User } from "../domain/user.entity";

const userRouter = new Router();

export const createUserRouter = (userService: UserService) => {
  userRouter.post('/user', async (ctx) => {
    try {
      const user = User.create(ctx.body);

      if (!user || typeof user !== 'object') {
        ctx.throw(400, 'Invalid user data');
      }

      const createdUser = await userService.createUser(user);
      ctx.status = 201;
      ctx.body = createdUser;

    } catch (error) {
      if (error instanceof Error) {
        ctx.throw(500, error.message);
      }
    }
  });

  userRouter.put('/user', async (ctx) => {
    try {
      const user = await userService.createUser(ctx.body);
      if (!user || typeof user !== 'object') {
        ctx.throw(400, 'Invalid user data');
      }
      const updatedUser = await userService.updateUser(user);
      ctx.body = updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        ctx.throw(500, error.message);
      }
    }
  });

  userRouter.get('/user', async (ctx) => {
    try {
      const users = await userService.findUsers();
      ctx.body = users;
    } catch (error) {
      if (error instanceof Error) {
        ctx.throw(500, error.message);
      }
    }
  });

  userRouter.get('/user/:id', async (ctx) => {
    try {
      const userId: string = ctx.params.id;
      if (!userId) {
        ctx.throw(400, 'User ID is required');
      }
      const user = await userService.findUserById(userId);
      if (!user) {
        ctx.throw(404, 'User not found');
      }
      ctx.body = user;
    } catch (error) {
      if (error instanceof Error) {
        ctx.throw(500, error.message);
      }
    }
  });

  return userRouter.routes();
};
