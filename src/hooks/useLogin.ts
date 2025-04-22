import { useMutation } from "@tanstack/react-query";
import { FormInstance } from "antd";
import { useNavigate } from "react-router-dom";
import { DataLoginForm } from "../types/auth.types";
import { login } from "../api/auth.api";
import { toast } from "react-toastify";
import authStore from "../store/authStore";
import { useLocation } from "react-router-dom";

export const useLogin = (form: FormInstance<DataLoginForm>) => {
  const navigate = useNavigate();
  const { loginStore } = authStore();
  const location = useLocation();
  return useMutation({
    mutationFn: (payload: DataLoginForm) => login(payload),

    onSuccess: (res) => {
      if (!res) {
        toast.error("Sign up error");
        return;
      }
      switch (res.status) {
        case 404: {
          form.setFields([{ name: "gmail", errors: [res.message as string] }]);
          break;
        }

        case 401: {
          form.setFields([
            { name: "password", errors: [res.message as string] },
          ]);
          break;
        }

        case 200: {
          const user = res.data;
          loginStore(user.username, user.id);
          const redirectPath = location.state?.from || "/";
          navigate(redirectPath);
          break;
        }
        default: {
          toast.error("Sign up error");
        }
      }
    },

    onError: () => {
      toast.error("Sign up error");
    },
  });
};
