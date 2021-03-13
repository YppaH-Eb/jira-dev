import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { Project } from "../screens/project-list/list";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(params || {}) }));
  }, [params]);
  return result;
};
