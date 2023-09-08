import React from "react";
import "./Layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ Title, children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="wrapper">
        <Header Title={Title} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
