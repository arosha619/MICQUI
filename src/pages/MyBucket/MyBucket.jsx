import React, { useState, useEffect } from "react";
import "./MyBucket.css";
import SideBar from "../../components/Sidebar/SideBar";
import BucketContains from "./../../components/MybucketComponents/BucketContains";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BucketHeader from "./../../components/MybucketComponents/BucketHeader"

const MyBucket = () => {
  const navigate = useNavigate();
  const [deleteBucket, setDeleteBucket] = useState([]);
  var isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    var isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated || isAuthenticated == null) {
      alert("Need to login first");
      console.log("not authanticated");
      navigate("/");
    }
  }, []);



  const bucketData = [1, 2, 3, 4, 5];

  if (!isAuthenticated || isAuthenticated === "false") {
    return null;
  }

  return (
    
    <div className="d-flex">
      <div>
        <SideBar />
      </div>

      <div className=" w-100" style={{ padding: "20px" }}>
      <Header/>

        <div className="card">
          <div className="card-header">
            <BucketHeader deleteBucket = {deleteBucket} bucketTitle = {"bucket"}/>
          </div>

          <div>
            <div className="entire">
              {bucketData.map((item, index) => (
                <BucketContains
                  deleteBucket={deleteBucket}
                  setDeleteBucket={setDeleteBucket}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBucket;
