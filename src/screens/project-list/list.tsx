import { User } from "./search-panel";
import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal } from "./utils";

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
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const { startEdit } = useProjectModal();
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
    {
      render(value, project) {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"edit"} onClick={() => startEdit(project.id)}>
                  编辑
                </Menu.Item>
                <Menu.Item key={"delete"}>删除</Menu.Item>
              </Menu>
            }
          >
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <Table rowKey={"id"} pagination={false} columns={columns} {...props} />
  );
};
