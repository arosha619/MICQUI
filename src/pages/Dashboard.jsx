import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  var isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {

    var isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated || isAuthenticated == null) {
    alert("Need to login first");
    navigate("/");
  }

  }, [])

  if (!isAuthenticated || isAuthenticated === "false") {
    return null; // Stop rendering
  }

  return <div className="title"> Dashboard</div>;
};

export default Dashboard;
