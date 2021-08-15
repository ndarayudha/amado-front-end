import { Layout } from "antd";
import { useLocation, Switch, Route } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import HomeContent from "../Home/HomeContent";
import TechContent from "../Tech/TechContent";
import HospitalContent from "../RS/HospitalContent";
import Login from "../Auth/Login";

export const ClientLayout = (props) => {
  const location = useLocation();

  const toLogin = location.pathname === "/login";

  const hidden = toLogin;

  return (
    <Layout>
      {hidden ? "" : <MainHeader />}
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
      {hidden ? "" : <MainFooter />}
    </Layout>
  );
};

export default ClientLayout;
