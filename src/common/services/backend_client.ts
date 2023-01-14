import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from "axios";
import { backend } from "configs/default";
const config: AxiosRequestConfig = {
  baseURL: backend.baseUrl,
};
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};
const responseErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};
const requestInterceptor = (
  request: AxiosRequestConfig
): AxiosRequestConfig => {
  return request;
};
const requestErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};
export class BackendClient {
  private static instance: AxiosInstance;
  private constructor() {}
  static getInstance(): AxiosInstance {
    if (!BackendClient.instance) {
      const _instance = axios.create(config);
      _instance.interceptors.response.use(
        responseInterceptor,
        responseErrorInterceptor
      );
      _instance.interceptors.request.use(
        requestInterceptor,
        requestErrorInterceptor
      );
      BackendClient.instance = _instance;
    }
    return BackendClient.instance;
  }
}
