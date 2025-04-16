import { Button, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import authStore from "../store/authStore";
import { toast } from "react-toastify";
import { DataLoginForm } from "../types/auth.types";
import { useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const { loginStore } = authStore();
  const { mutate, reset } = useMutation({
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

  const onFinish = (values: DataLoginForm) => {
    reset();
    mutate(values);
  };

  return (
    <div className="max-w-[350px] mx-auto mt-30 p-3 bg-white">
      <Typography.Title className="text-center" level={2}>
        Login
      </Typography.Title>
      <Form
        form={form}
        onFinish={onFinish}
        validateTrigger={["onBlur", "onChange"]}
      >
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
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu " }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" block>
            Login
          </Button>
        </Form.Item>
      </Form>

      <Button type="link" block>
        You haven't account? <Link to="/signup">Sign up</Link>
      </Button>
    </div>
  );
};

export default Login;
