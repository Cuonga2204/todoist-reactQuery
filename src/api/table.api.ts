import axios from "axios";
const fetchUsers = async (page: number, limit: number | string) => {
  const start = (page - 1) * 5;
  const totalRes = await axios.get("http://localhost:3001/usersInfor");
  const res = await axios.get("http://localhost:3001/usersInfor", {
    params: { _start: start, _limit: limit },
  });

  return {
    data: res.data,
    total: totalRes.data.length,
  };
};

export default fetchUsers;
