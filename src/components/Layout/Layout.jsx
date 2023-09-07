import React from "react";
import "./Layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="wrapper">
        <Header />
        <div className="content">{ children }</div>
      </div>
    </div>
  );
}

export default Layout;
