import { useState } from "react";
import Sidebar from "./SideBar";
import "./Admin.scss";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [titlePageAdmin, setTitlePageAdmin] = useState("Dashboard");

  const changeTitleAdmin = (title) => {
    //chus ys
    setTitlePageAdmin(titlePageAdmin);
  };
  return (
    <div className="admin">
      <Header />
      <div className="admin-wrapper">
        <div className="admin-sidebar">
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            changeTitleAdmin={changeTitleAdmin}
          />
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
