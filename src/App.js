import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import "./util/global.css";

import { ClientLayout } from "./components/client/Partial/ClientLayout";
import { DashboardLayout } from "./components/dashboard/Layout/DashboardLayout";
import dashboardRoute from "./routes/routes";


const App = () => {
  const location = useLocation();

  const toDashboard = dashboardRoute
    .map((route) => {
      return location.pathname.includes(route);
    })
    .reduce((total, num) => {
      return total + num;
    });

  return (
    <Fragment>{toDashboard ? <DashboardLayout /> : <ClientLayout />}</Fragment>
  );
};

export default App;
