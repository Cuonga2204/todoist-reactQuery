import axios from "axios";
import { API_URL } from "../constants/config";

const fetchUsers = async (page: number, limit: number | string) => {
  const start = (page - 1) * 5;
  const totalRes = await axios.get(`${API_URL}/usersInfor`);
  const res = await axios.get(`${API_URL}/usersInfor`, {
    params: { _start: start, _limit: limit },
  });

  return {
    data: res.data,
    total: totalRes.data.length,
  };
};

export default fetchUsers;
