import { Table, Pagination, Space } from "antd";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import fetchUsers from "../api/table.api";
import { useQueryString } from "../utils/ultils";
import { useNavigate } from "react-router-dom";

const LIMIT_PAGE = 5;

export const TableForm = () => {
  const query = useQueryString();
  const navigate = useNavigate();

  const currentPage = Number(query.page) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["usersInfor", currentPage],
    queryFn: () => fetchUsers(currentPage, LIMIT_PAGE),
    placeholderData: keepPreviousData,
  });

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
    { title: "Address", dataIndex: "address" },
    { title: "Email", dataIndex: "email" },
  ];

  const handleChangePage = (page: number) => {
    navigate(`/table?page=${page}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white">
      <Space direction="vertical" size="middle" className="w-full">
        <Table
          dataSource={data?.data || []}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={currentPage}
          pageSize={LIMIT_PAGE}
          total={data?.total}
          onChange={handleChangePage}
          align="center"
        />
      </Space>
    </div>
  );
};
