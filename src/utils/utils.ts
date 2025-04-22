import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const [searchParam] = useSearchParams();
  return Object.fromEntries(searchParam.entries());
};
