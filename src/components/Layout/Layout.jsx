import React, { useState, useEffect } from "react";
import "./Layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Loading from "../Spinner/Spinner";

function Layout({ Title, children }) {
  const [loading, setLoading] = useState(true);
  const backgroundColor = "white";
  const [isshow, setIsshow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="layout">
      <Sidebar setIsshow={setIsshow} isshow={isshow} />
      <div className={`wrapper ${isshow ? "" : "wrapper-collapsed"}`}>
        <Header Title={Title} setIsshow={setIsshow} isshow={isshow} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
