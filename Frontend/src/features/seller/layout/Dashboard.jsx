import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import SellerNavbar from "../components/SellerNavbar.jsx";

const DashboardLayout = () => {
  return (
    <div className="h-full w-full flex ">
      <Sidebar />

      <div className="flex-1">
        <div className="sticky top-0 z-20">
          <SellerNavbar />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
