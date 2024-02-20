import { Email } from "./user.value-object";

export interface IUser {
  id: string;
  name: string;
  password: string;
  email: string;
}

export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string
}

export interface IUpdateUserRequestDTO {
  name: string;
  email: string;
}

export class User {
  private _id!: string;
  private _name!: string
  private _email!: Email
  private _password!: string

  static create({ email, name, password }: ICreateUserRequestDTO) {
    const newEmail = new Email({ address: email })

    const user = new User()

    user._name = name
    user._email = newEmail
    user._password = password // Todo: encrypt

    return user
  }

  static update(updatedUser: IUpdateUserRequestDTO) {
    if (updatedUser.email) {
      updatedUser.email = new Email({ address: updatedUser.email }).address
    }
    return updatedUser
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get email(): Email {
    return this._email
  }


  get password(): string {
    return this._password
  }
}
