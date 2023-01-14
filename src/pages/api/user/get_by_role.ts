import { AxiosRequestConfig } from "axios";
import { BackendClient } from "common/services/backend_client";
import { NextApiRequest, NextApiResponse } from "next";

const get_by_role = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method !== "POST") {
    res.status(404).end();
  }

  try {
    const url = `/user/role`;
    const access_token = req.headers["Authorization"];

    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${access_token}` },
      params: {
        role: body.role,
      },
    };
    return await BackendClient.getInstance().post(url, null, config);
  } catch (error) {}
};

export default get_by_role;
