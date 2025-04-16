import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { DataSignupForm } from "../types/auth.types";
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
  const [form] = Form.useForm();
  const mutationSignup = useSignup(form);

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
