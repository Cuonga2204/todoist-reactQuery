import { create } from "zustand";

interface AuthState {
  user: string | null;
  userId: string | null;
  loginStore: (username: string, userId: string) => void;
  logout: () => void;
}

const authStore = create<AuthState>((set) => ({
  user: localStorage.getItem("user"),
  userId: localStorage.getItem("userId"),

  loginStore: (username, userId) => {
    localStorage.setItem("user", username);
    localStorage.setItem("userId", userId);
    set({ user: username, userId });
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, userId: null });
  },
}));

export default authStore;
