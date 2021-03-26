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

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParams([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });
  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
