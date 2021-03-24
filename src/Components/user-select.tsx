import { useUsers } from "../utils/useUsers";
import { IdSelect } from "./id-select";
import { ReactChild } from "react";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
