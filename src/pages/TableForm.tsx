import { Table, Pagination, Space } from "antd";
import { useQueryString } from "../utils/ultils";
import { useNavigate } from "react-router-dom";
import { useGetUsersInfor } from "../hooks/useGetUsersInfor";
import { userInforColumns } from "../constants/tableColumns";

const LIMIT_PAGE = 5;

export const TableForm = () => {
  const query = useQueryString();
  const navigate = useNavigate();

  const currentPage = Number(query.page) || 1;

  const { data, isLoading } = useGetUsersInfor({
    currentPage,
    limit: LIMIT_PAGE,
  });

  const handleChangePage = (page: number) => {
    navigate(`/table?page=${page}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white">
      <Space direction="vertical" size="middle" className="w-full">
        <Table
          dataSource={data?.data || []}
          columns={userInforColumns}
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
