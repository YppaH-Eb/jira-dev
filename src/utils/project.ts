import { useCallback, useEffect } from "react";
import { cleanObject, useDocumentTitle } from "./index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: param })
  );
};
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(["project", id], () => client(`projects/${id}`), {
    enabled: Boolean(id),
  });
};
