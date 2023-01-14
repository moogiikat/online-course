import { JwtToken } from "common/models";

export type TLoginRequest = {
  email?: string;
  password?: string;
};

export type TLoginResponse = {
  access_token: JwtToken;
  user: any;
};

export type TRegisterRequest = {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
};

export type TRegisterResponse = {
  access_token: JwtToken;
  user: any;
};
