import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "../Partial/MainFooter";

const MainLayout = (props) => {
  const location = useLocation();

  const toLogin = location.pathname === "/";
  const toTech = location.pathname === "/teknologi";
  const toRs = location.pathname === "/untuk-rs";

  const hidden = toLogin || toTech || toRs;

  return (
    <Layout>
      {hidden ? <MainHeader /> : ""}
      {props.children}
      {hidden ? <MainFooter /> : ""}
    </Layout>
  );
};

export default MainLayout;
