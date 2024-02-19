import { User } from "../../domain/user.entity";

export interface UserService {
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  findUserById(userId: string): Promise<User | null>;
  findUsers(): Promise<User[]>;
}
