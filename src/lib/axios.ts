import axios, { type AxiosError } from "axios";
import Cookies from "js-cookie";

declare module "axios" {
  interface AxiosRequestConfig {
    requireAuth?: boolean;
    silent?: boolean;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    successMessage?: string;
    errorMessage?: string;
  }
}

const createInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
  });

  instance.interceptors.request.use(
    (config) => {
      if (config.requireAuth !== false) {
        const token = Cookies.get("_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (!error.config?.silent) {
        console.log("error", error);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const api = createInstance(process.env.NEXT_PUBLIC_API_URL ?? "");
