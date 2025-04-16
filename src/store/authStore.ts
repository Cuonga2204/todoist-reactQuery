import { create } from "zustand";

interface AuthState {
  user: string | null;
  userId: string | null;
  login: (username: string, userId: string) => void;
  signup: (username: string, userId: string) => void;
  logout: () => void;
}

const authStore = create<AuthState>((set) => ({
  user: localStorage.getItem("user"),
  userId: localStorage.getItem("userId"),

  login: (username, userId) => {
    localStorage.setItem("user", username);
    localStorage.setItem("userId", userId);
    set({ user: username, userId });
  },

  signup: (username, userId) => {
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
