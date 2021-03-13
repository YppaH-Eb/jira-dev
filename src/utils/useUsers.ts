import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { User } from "../screens/project-list/search-panel";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(params || {}) }));
  }, [params]);
  return result;
};
