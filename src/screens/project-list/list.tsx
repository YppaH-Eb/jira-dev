import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../Components/pin";
import { useEditProject } from "../../utils/project";

export interface Project {
  name: string;
  personId: number;
  id: number;
  pin: boolean;
  organization: string;
}
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);

  const columns = [
    {
      title: <Pin checked={true} disabled={true} />,
      render(value, project) {
        return (
          <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
        );
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      render(value, project) {
        return <Link to={project.id.toString()}>{project.name}</Link>;
      },
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
  return (
    <Table rowKey={"id"} pagination={false} columns={columns} {...props} />
  );
};
