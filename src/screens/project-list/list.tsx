import { User } from "./search-panel";
import { Table } from "antd";

interface Project {
  name: string;
  personId: string;
  id: string;
  pin: boolean;
  organization: string;
}
interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "负责人",
      render(value, project) {
        return (
          <span>
            {users.find((user) => user.id === project.personId)?.name || "未知"}
          </span>
        );
      },
    },
  ];
  return <Table pagination={false} columns={columns} dataSource={list} />;
};
