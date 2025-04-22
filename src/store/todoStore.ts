import { FILTER_STATUSES } from "../constants/filterConstant";
import { create } from "zustand";

interface TodoState {
  filter: FILTER_STATUSES;
  search: string;
  setFilter: (status: FILTER_STATUSES) => void;
  setSearch: (text: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  filter: FILTER_STATUSES.ALL,
  search: "",
  setFilter: (status) => set({ filter: status }),
  setSearch: (text) => set({ search: text }),
}));
