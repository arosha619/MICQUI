import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserList from "./components/UserList/UserList";
import MyBucket from "./pages/MyBucket/MyBucket";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ChangedPassword from "./components/ForgotPassword/ChangedPassword";
import Settings from "./components/Settings/Settings";
import SuccessfullyRegistered from "./components/SignUp/SuccessfullyRegistered";
import BucketDetails from "./pages/BucketDetails/BucketDetails.jsx";
import AddBucket from "./components/AddBucket/AddBucket";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import './App.css'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/user-list" element={<UserList />} />
      <Route path="/my-buckets" element={<MyBucket />} />
      <Route path="/my-buckets/bucket-data/:bucket_id" element={<BucketDetails />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangedPassword />} />
      <Route path="/user/reset" element={<ChangedPassword />} />
      <Route path="/verify" element={<SuccessfullyRegistered />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
