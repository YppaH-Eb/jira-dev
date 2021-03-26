import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useUsers } from "utils/users";
import { Button, Typography } from "antd";
import { useProjectSearchParams } from "./utils";
import { useProject } from "utils/project";
import { Row } from "../../components/lib";

export const ProjectListScreen = (props: {
  setProjectModalOpen: (boolean) => void;
}) => {
  useDocumentTitle("项目列表");
  const [param, setParam] = useProjectSearchParams();
  const debouncedParam = useDebounce(param, 500);
  const { isLoading, error, data: list, retry } = useProject(debouncedParam);
  const { data: users } = useUsers();
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error && (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      )}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
