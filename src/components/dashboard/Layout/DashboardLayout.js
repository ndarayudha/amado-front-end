import React, { useContext } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import "./dashboard.css";
import { Layout } from "antd";

import { DashboardSidebar } from "../Sidebar/DashboardSidebar";
import { DashboardHeader } from "../Header/DashboardHeader";
import { DashboardFooter } from "../Footer/DashboardFooter";
import { Statistik } from "../Content/Statistik";
import { DaftarPasien } from "../Content/DaftarPasien";
import { LokasiPasien } from "../Content/LokasiPasien";
import { KontakErat } from "../Content/KontakErat";
import { RekamMedis } from "../Content/RekamMedis";
import { RekamMedisDetail } from "../Table/RekamMedisDetail";
import { Profil } from "../Content/Profil";
import { Oksigen } from "../Content/Oksigen";
import { Ruangan } from "../Content/Ruangan";
import AuthContext from "../../../context/auth-context";

const { Content } = Layout;

export const DashboardLayout = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Layout className="full">
      <DashboardSidebar />

      <Layout style={{ height: "100%" }}>
        <DashboardHeader />

        <Content style={{ height: "100%" }}>
          <Switch>
            <Route path="/statistik" exact>
              {authCtx.isLoggedIn && <Statistik />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/patients">
              {authCtx.isLoggedIn && <DaftarPasien />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/lokasi-pasien">
              {authCtx.isLoggedIn && <LokasiPasien />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/kontak-erat">
              {authCtx.isLoggedIn && <KontakErat />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/rekam-medis" exact>
              {authCtx.isLoggedIn && <RekamMedis />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/rekam-medis/:id">
              {authCtx.isLoggedIn && <RekamMedisDetail />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/oksigen" exact>
              {authCtx.isLoggedIn && <Oksigen />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/ruangan" exact>
              {authCtx.isLoggedIn && <Ruangan />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/profil" exact>
              {authCtx.isLoggedIn && <Profil />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
          </Switch>
        </Content>

        <DashboardFooter />
      </Layout>
    </Layout>
  );
};
