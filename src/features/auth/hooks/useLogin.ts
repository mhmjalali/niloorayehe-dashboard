import { api } from "@/lib/axios";
import { LOGIN } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  data: {
    expert_id: number;
    token: string;
    token_type: string;
    roles: string[];
  };
}

export function useLogin() {
  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationFn: async (payload) => {
      const response = await api.post<LoginResponse>(LOGIN, payload, {
        requireAuth: false,
      });
      return response.data;
    },
    onSuccess: (response) => {
      Cookies.set("_token", response.data.token);
    },
  });
}
