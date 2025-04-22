import { DataSignupForm } from "../types/auth.types";
import { signup } from "../api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { FormInstance } from "antd";
import { useNavigate } from "react-router-dom";

export const useSignup = (form: FormInstance<DataSignupForm>) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: DataSignupForm) => signup(payload),
    onSuccess: (res) => {
      if (!res) return;
      if (res.status === 409) {
        form.setFields([
          {
            name: "gmail",
            errors: [res.message!],
          },
        ]);
      } else {
        navigate("/login");
      }
    },
  });
};
