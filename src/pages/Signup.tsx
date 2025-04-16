import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DataSignupForm } from "../types/auth.types";
import authStore from "../store/authStore";
export const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { loginStore } = authStore();
  const mutationSignup = useMutation({
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
        const user = res.data;
        loginStore(user.username, user.id);
        navigate("/");
      }
    },
    onError: () => {
      toast.error("Sign Up error");
    },
  });

  const onFinish = async (values: DataSignupForm) => {
    mutationSignup.mutate(values);
  };

  return (
    <div className="max-w-[350px] mx-auto mt-30 p-3 bg-white">
      <Typography.Title className="text-center" level={2}>
        Signup
      </Typography.Title>
      <Form
        form={form}
        onFinish={onFinish}
        validateTrigger={["onBlur", "onChange"]}
      >
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="gmail"
          rules={[
            { required: true, message: "Vui lòng nhập Gmail" },
            { type: "email", message: "Gmail không hợp lệ" },
          ]}
        >
          <Input placeholder="Gmail" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, min: 3, message: "Ít nhất 3 ký tự" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Xác nhận lại mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            block
            loading={mutationSignup.isPending}
            type="primary"
          >
            Signup
          </Button>
        </Form.Item>
      </Form>

      <Button type="link" block>
        You have account? <Link to="/login">Login</Link>
      </Button>
    </div>
  );
};
