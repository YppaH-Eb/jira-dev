import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import { useDocumentTitle } from "./utils";

function App() {
  const { user } = useAuth();
  useDocumentTitle("请登录或注册以继续");
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
