import axios from "axios";
import { User } from "../types/auth.types";
import { API_URL } from "../constants/config";

interface PayloadSignUp {
  username: string;
  gmail: string;
  password: string;
}

interface PayloadLogin {
  gmail: string;
  password: string;
}

export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export const signup = async (payload: PayloadSignUp) => {
  const users = await getUsers();
  const existed = users?.find((user: User) => user.gmail === payload.gmail);

  if (existed) {
    return { status: 409, message: "Gmail đã tồn tại." };
  }

  const res = await axios.post(`${API_URL}/users`, payload);

  return { status: 200, data: res.data };
};

export const login = async (payload: PayloadLogin) => {
  try {
    const users = await getUsers();
    if (!users) {
      return { status: 500, message: "Không thể tải danh sách người dùng" };
    }

    const user = users.find((u: User) => u.gmail === payload.gmail);
    if (!user) {
      return { status: 404, message: "Email chưa được đăng ký" };
    }

    if (user.password !== payload.password) {
      return { status: 401, message: "Mật khẩu không đúng" };
    }

    return { status: 200, data: user };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
