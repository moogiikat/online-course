import axios, { AxiosRequestConfig } from "axios";
import { BackendClient } from "common/services/backend_client";
import { basicAuthentication } from "configs/default";
import { CookieSerializeOptions, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import decode, { JwtPayload } from "jwt-decode";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  if (method !== "POST") {
    res.status(404).end();
  }

  try {
    const url = `/auth/register`;

    const config: AxiosRequestConfig = {
      auth: {
        username: basicAuthentication.username,
        password: basicAuthentication.password,
      },
    };

    const response = await BackendClient.getInstance().post(
      url,
      { ...body },
      config
    );
    const resData = response.data;

    res.status(201).json({ resData });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status ?? 400).send(error.response?.data);
    } else {
      res.status(400).end("UNKNOWN");
    }
  }
};

export default register;
