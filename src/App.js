import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";
import UserList from "./components/UserList/UserList";
import MyBucket from "./components/MyBucket/MyBucket";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ChangedPassword from "./components/ForgotPassword/ChangedPassword";
function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/my-buckets" element={<MyBucket />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangedPassword />} />
        <Route path="/user/reset" element={<ChangedPassword />} />
      </Routes>
    
  );
}

export default App;