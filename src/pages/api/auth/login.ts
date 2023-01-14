import axios, { AxiosRequestConfig } from "axios";
import { BackendClient } from "common/services/backend_client";
import { basicAuthentication } from "configs/default";
import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import decode, { JwtPayload } from "jwt-decode";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  if (method !== "POST") {
    res.status(404).end();
  }

  try {
    const url = `/auth/login`;

    const config: AxiosRequestConfig = {
      auth: {
        username: basicAuthentication.username,
        password: basicAuthentication.password,
      },
    };

    const response = await BackendClient.getInstance().post(
      url,
      { ...body, grant_type: "password" },
      config
    );

    const user = response.data.user;
    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;
    const { exp } = decode<JwtPayload>(refresh_token);

    if (!exp) {
      res.status(400).end("UNKNOWN");
      return;
    }

    res.setHeader("Set-Cookie", [
      createRefreshTokenCookie(refresh_token, exp, body.keepMeLoggedIn),
    ]);

    res.status(200).json({ access_token, user });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status ?? 400).send(error.response?.data);
    } else {
      res.status(400).end("UNKNOWN");
    }
  }
};

export default login;

export const createRefreshTokenCookie = (
  refreshToken: string,
  exp: number,
  keepMeLoggedIn: boolean
) => {
  let expires: Date = new Date(exp * 1000);
  if (!keepMeLoggedIn) {
    const _expires = new Date();
    _expires.setMinutes(_expires.getMinutes() + 30);
    expires = _expires;
  }
  const options: CookieSerializeOptions = {
    expires,
    httpOnly: true,
    path: "/",
    sameSite: true,
    secure: true,
  };

  return serialize("refresh_token", refreshToken, options);
};
