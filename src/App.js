import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "./util/global.css";
import { DashboardLayout } from "./components/dashboard/Layout/DashboardLayout";
import { Statistik } from "./components/dashboard/Content/Statistik";
import { DaftarPasien } from "./components/dashboard/Content/DaftarPasien";
import { KontakErat } from "./components/dashboard/Content/KontakErat";
import { RekamMedis } from "./components/dashboard/Content/RekamMedis";
import { LokasiPasien } from "./components/dashboard/Content/LokasiPasien";
import { RekamMedisDetail } from "./components/dashboard/Table/RekamMedisDetail";

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
      <DashboardLayout>
        <Switch>
          <Route path="/statistik" exact>
            <Statistik />
          </Route>
          <Route path="/patients" exact>
            <DaftarPasien />
          </Route>
          <Route path="/lokasi-pasien" exact>
            <LokasiPasien />
          </Route>
          <Route path="/kontak-erat" exact>
            <KontakErat />
          </Route>
          <Route path="/rekam-medis" exact>
            <RekamMedis />
          </Route>
          <Route path="/rekam-medis/:id">
            <RekamMedisDetail />
          </Route>
        </Switch>
      </DashboardLayout>
    </Suspense>
  );
};

export default App;
