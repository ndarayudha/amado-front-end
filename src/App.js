import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "./util/global.css";
import { Dashboard } from "./components/dashboard/Dashboard";

const HomeContent = React.lazy(() =>
  import("./components/client/Home/HomeContent")
);
const MainLayout = React.lazy(() =>
  import("./components/client/Partial/MainLayout")
);
const TechContent = React.lazy(() =>
  import("./components/client/Tech/TechContent")
);
const HospitalContent = React.lazy(() =>
  import("./components/client/RS/HospitalContent")
);
// const NotFound = React.lazy(() => import("./components/error/NotFound"));
const Login = React.lazy(() => import("./components/client/Auth/Login"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="centered">
          <Spin />
        </div>
      }
    >
      <MainLayout>
        <Switch>
          <Route path="/" exact>
            <HomeContent />
          </Route>
          <Route path="/teknologi">
            <TechContent />
          </Route>
          <Route path="/untuk-rs">
            <HospitalContent />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </MainLayout>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Suspense>
  );
};

export default App;
