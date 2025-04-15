import { DataSignupForm } from "../types/auth.types";
import { signup } from "../api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
interface MutaionSignupProps {
  payload: DataSignupForm;
}
export const useMutationSignup = ({ payload }: MutaionSignupProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useMutation({
    mutationFn: () => signup(payload),
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
