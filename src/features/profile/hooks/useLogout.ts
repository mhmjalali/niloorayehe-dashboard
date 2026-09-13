import { useRouter } from "@/i18n/navigation";
import { api } from "@/lib/axios";
import { LOGOUT } from "@/lib/routes";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: () => api.post(LOGOUT),
    onSettled: () => {
      Cookies.remove("_token");
      router.push("/");
    },
  });
}
