import { ERoles } from "common/enums";
import dayjs from "dayjs";

export interface IUser {
  id?: string;
  email: string;
  name: string;
  firstname?: string;
  lastname?: string;
  role?: string;
  phoneNumber?: string;
  password?: string;
  createdAt?: string;
}

export interface MapUser {
  name?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
  companyId?: number;
  createdAt?: Date;
}
export class User implements IUser {
  readonly email!: string;
  readonly id?: string;
  readonly name!: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly role?: string;
  readonly password?: string;
  readonly phoneNumber?: string;
  readonly companyName?: string;
  readonly userCount?: number;
  readonly initialPassword?: string;
  readonly createdAt?: string | undefined;

  constructor(json?: Partial<RemoveMethods<User>>) {
    Object.assign(this, {
      ..._default,
      ...json,
    });
  }

  static fromJson = (json: { [key: string]: any }): User => {
    // let _role: ERoles = ERoles.VIEWER;
    // switch (json["role"]?.code) {
    //   case ERoles.ADMIN.code:
    //     _role = ERoles.ADMIN;
    //     break;
    //   case ERoles.SUPER_ADMIN.code:
    //     _role = ERoles.SUPER_ADMIN;
    //   default:
    //     break;
    // }

    return new User({
      email: json["email"],
      id: json["id"],
      name: json["name"],
      firstname: json["firstname"],
      lastname: json["lastname"],
      role: json["role"],
      phoneNumber: json["phoneNumber"],
      userCount: json["userCount"],
      initialPassword: json["initialPassword"],
      createdAt:
        json["createdAt"] && dayjs(json["createdAt"]).format("YYYY-MM-DD"),
    });
  };

  public toJson = (): { [key: string]: any } => {
    return JSON.parse(
      JSON.stringify({
        name: this.name,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        email: this.email,
        phoneNumber: this.phoneNumber,
        role: this.role,
      })
    );
  };
}

export interface IUserPasswordChange {
  oldPassword: string;
  newPassword: string;
  rePassword?: string;
}
export interface IUserPasswordReset {
  newPassword: string;
  rePassword?: string;
}

const _default: IUser = {
  id: "",
  email: "",
  name: "",
  firstname: "",
  lastname: ""
};
