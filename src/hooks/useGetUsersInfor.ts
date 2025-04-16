import { keepPreviousData, useQuery } from "@tanstack/react-query";
import fetchUsers from "../api/table.api";
interface UseGetUsersInfoProps {
  currentPage: number;
  limit: number;
}
export const useGetUsersInfor = ({
  currentPage,
  limit,
}: UseGetUsersInfoProps) => {
  return useQuery({
    queryKey: ["usersInfor", currentPage],
    queryFn: () => fetchUsers(currentPage, limit),
    placeholderData: keepPreviousData,
  });
};
