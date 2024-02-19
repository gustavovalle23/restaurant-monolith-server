import { User } from "../../domain/user.entity";
import { UserService } from "./user.service";

export class UserServiceImpl implements UserService {
  createUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  updateUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  findUserById(userId: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  findUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
