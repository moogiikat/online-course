import axios, { AxiosRequestConfig } from "axios";
import { BackendClient } from "common/services/backend_client";
import { basicAuthentication } from "configs/default";
import { NextApiRequest, NextApiResponse } from "next";

const reset = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  if (method !== "POST") {
    res.status(404).end();
  }

  try {
    const url = `/auth/password/reset`;

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

    res.status(201);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status ?? 400).send(error.response?.data);
    } else {
      res.status(400).end("UNKNOWN");
    }
  }
};

export default reset;
