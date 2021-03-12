import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import { Button } from "antd";
import styled from "@emotion/styled";
import { Row } from "./Components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft gap={2} between={true}>
          <div>logo</div>
          <div>项目</div>
          <div>用户</div>
        </HeaderLeft>
        <Button type={"primary"} onClick={logout}>
          登出
        </Button>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  height: calc(100vh - 6rem);
`;
