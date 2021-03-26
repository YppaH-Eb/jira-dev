import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useUsers } from "utils/users";
import { Button, Typography } from "antd";
import { useProjectModal, useProjectSearchParams } from "./utils";
import { useProject } from "utils/project";
import { ErrorBox, Row } from "../../components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表");
  const [param, setParam] = useProjectSearchParams();
  const debouncedParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProject(debouncedParam);
  const { data: users } = useUsers();
  const { open } = useProjectModal();
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={open}>新建项目</Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List
        // refresh={retry}
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
