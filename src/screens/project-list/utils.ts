import { useUrlQueryParams } from "../../utils/url";
import { useMemo } from "react";

//项目列表搜索的参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(["name", "personId"]);
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined };
    }, [param]),
    setParam,
  ] as const;
};
