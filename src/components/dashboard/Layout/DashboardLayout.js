import React from "react";
import { Link, Switch, Route } from "react-router-dom";
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

const { Content } = Layout;

export const DashboardLayout = () => {
  return (
    <Layout className="full">
      <DashboardSidebar />

      <Layout style={{ height: "100%" }}>
        <DashboardHeader />

        <Content style={{ height: "100%" }}>
          <Switch>
            <Route path="/statistik" exact>
              <Statistik />
            </Route>
            <Route path="/patients">
              <DaftarPasien />
            </Route>
            <Route path="/lokasi-pasien">
              <LokasiPasien />
            </Route>
            <Route path="/kontak-erat">
              <KontakErat />
            </Route>
            <Route path="/rekam-medis" exact>
              <RekamMedis />
            </Route>
            <Route path="/rekam-medis/:id">
              <RekamMedisDetail />
            </Route>
          </Switch>
        </Content>

        <DashboardFooter />
      </Layout>
    </Layout>
  );
};
