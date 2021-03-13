import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";

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
      title: "部门",
      dataIndex: "organization",
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
    {
      title: "创建时间",
      render(value, project) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format("YYYY-MM-DD hh:mm")
              : "无"}
          </span>
        );
      },
    },
  ];
  return <Table pagination={false} columns={columns} dataSource={list} />;
};
