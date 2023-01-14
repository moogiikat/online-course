import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { JwtToken, User } from "common/models";
import { TRegisterRequest } from "common/types/auth.type";
import { IUserPasswordChange } from "common/models/user.model";
import { TLoginRequest, TLoginResponse } from "common/types";
import { basicAuthentication } from "configs/default";
import { BackendClient } from "./backend_client";

export class AuthRepository {
  private static instance: AuthRepository;
  private constructor(
    protected readonly client: AxiosInstance = BackendClient.getInstance()
  ) {}

  static getInstance(): AuthRepository {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository();
    }
    return this.instance;
  }

  login = async (data: TLoginRequest): Promise<TLoginResponse> => {
    const payload = {
      email: data.email,
      password: data.password,
      grant_type: "password",
    };

    // To BFF
    const url = "/api/auth/login";
    const response = await axios.post(url, payload);

    const { access_token, user } = response.data;

    // set access token
    this.client.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${access_token}`;

    return { access_token: JwtToken.fromString(access_token), user };
  };

  logout = async () => {
    // To BFF
    const url = "/api/auth/logout";
    await axios.post(url);
  };
  getAccessToken = async (keepMeLoggedIn: boolean = false) => {
    try {
      const payload = { keepMeLoggedIn };

      // To BFF
      const url = "/api/auth/refresh_token";
      const response = await axios.post(url, payload);

      const { access_token, user } = response.data;

      // set access token
      this.client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;

      return { access_token: JwtToken.fromString(access_token), user };
    } catch (error) {
      return null;
    }
  };

  getAuth = async (): Promise<User> => {
    const url = "/auth/me";
    const response = await this.client.get(url);

    return User.fromJson(response.data);
  };

  register = async (data: TRegisterRequest): Promise<AxiosResponse> => {
    const url = "/api/auth/register";
    const payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    };
    const response = await axios.post(url, payload);
    const { resData } = response.data;
    return resData;
  };

  update = async (data: User) => {
    const url = "/auth/update";
    const payload = data.toJson();
    await this.client.put(url, payload);
    return;
  };

  passwordChange = async (payload: IUserPasswordChange, token: JwtToken) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = "/auth/password/change";
    return await this.client.post(url, payload, config);
  };

  passwordChangeWToken = async (payload: any, token: string) => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = "/auth/password/change_wtoken";
    return token
      ? await this.client.post(url, payload, config)
      : await this.client.post(url, payload);
  };

  passwordReset = async (email: string) => {
    const url = "/api/auth/reset";
    const payload = {
      email: email,
      grant_type: "password",
    };
    const response = await axios.post(url, payload);
    const { resData } = response.data;
    return resData;
  };
}
