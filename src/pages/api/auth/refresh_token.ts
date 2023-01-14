import { AxiosRequestConfig } from "axios";
import { BackendClient } from "common/services/backend_client";
import { basicAuthentication } from "configs/default";
import { NextApiRequest, NextApiResponse } from "next";
import { createRefreshTokenCookie } from "./login";
import decode, { JwtPayload } from "jwt-decode";

const refreshToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method !== "POST") {
    res.status(404).end();
  }

  try {
    const refresh_token = req.cookies["refresh_token"];

    if (refresh_token) {
      const url = `/auth/refresh`;
      const config: AxiosRequestConfig = {
        auth: {
          username: basicAuthentication.username,
          password: basicAuthentication.password,
        },
        params: {
          refresh_token,
          grant_type: "refresh_token",
        },
      };
      const { exp } = decode<JwtPayload>(refresh_token);

      const response = await BackendClient.getInstance().post(
        url,
        null,
        config
      );
      const access_token = response.data.access_token;
      const user = response.data.user;

      res.setHeader("Set-Cookie", [
        createRefreshTokenCookie(refresh_token, exp || 0, body.keepMeLoggedIn),
      ]);

      res.status(200).json({ access_token, user });
    } else {
      res.status(200).json({ access_token: null });
    }
  } catch (error) {
    res.status(400).end();
  }
};

export default refreshToken;
