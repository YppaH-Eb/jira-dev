import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "./Components/lib";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";

import { Route, Navigate, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "./screens/project";
export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        {/*<ProjectListScreen />*/}
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />}></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            <Navigate to={`/projects`} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={2}>
        <SoftwareLogo width={"18rem"} color={"rgb(38,132,255)"} />
        <div>项目</div>
        <div>用户</div>
      </HeaderLeft>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key={"logout"}>
              <a onClick={logout}>登出</a>
            </Menu.Item>
          </Menu>
        }
      >
        <a onClick={(e) => e.preventDefault()}>Hi,{user?.name}</a>
      </Dropdown>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;

const Main = styled.div``;
