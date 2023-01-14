import { AxiosRequestConfig } from "axios";
import { BackendClient } from "common/services/backend_client";
import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "POST") {
    res.status(404).end();
  }

  try {
    const url = `/auth/revoke`;

    const refresh_token = req.cookies["refresh_token"];
    const access_token = req.headers["Authorization"];
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${access_token}` },
      params: {
        refresh_token,
      },
    };
    if (refresh_token && typeof access_token === "string") {
      await BackendClient.getInstance().post(url, null, config);
    }

    res.setHeader("Set-Cookie", [expireRefreshTokenCookie()]);

    res.status(200).end();
  } catch (error) {
    const _error = error as Error;
    if (_error?.message === "test") {
      res.status(401).end();
    }
    res.status(400).end();
  }
};

export default logout;

const expireRefreshTokenCookie = () => {
  const options: CookieSerializeOptions = {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: true,
    secure: true,
  };

  return serialize("refresh_token", "token", options);
};
