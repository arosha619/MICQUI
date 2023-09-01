import React, { useState, useEffect } from "react";
import "./MyBucket.css";
import SideBar from "../../components/Sidebar/SideBar";
import BucketContains from "./../../components/MybucketComponents/BucketContains";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

import BucketHeader from "./../../components/MybucketComponents/BucketHeader";
import { getAllBuckets } from "../../API/axios";


import { getadminbyID } from "../../API/axios";


const MyBucket = () => {
  const navigate = useNavigate();
  const [deleteBucket, setDeleteBucket] = useState([]);

  const [bucketsData, setBucketsData] = useState([]);

  const [adminData, setAdminData] = useState([]);

  var isAuthenticated = localStorage.getItem("isAuthenticated");
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    var isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated || isAuthenticated == null) {
      alert("Need to login first");
      console.log("not authanticated");
      navigate("/");
    } else {
      const fetchBucketData = async () => {
        try {
          const response = await getAllBuckets();

          const data = response.data.data;


            setBucketsData(data);




        } catch (error) {
          console.error("Error fetching bucket data:", error);
          alert("Data fetching faild")
        }
      };

      fetchBucketData();
    }
  }, []);
    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const AdminData = await getadminbyID(id);
        setAdminData(AdminData.data.data);
        console.log(AdminData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, [id]);
  

  if (!isAuthenticated || isAuthenticated === "false") {
    return null;
  }

  return (
    <div className="d-flex">
      <div>
        <SideBar />
      </div>


      <div className=" w-100" style={{ padding: "15px 20px 15px 20px" }}>
        <Header />

      <div className=" w-100" style={{ padding: "20px" }}>
      {adminData.map((item) => (
          <Header
            key={item.id}
            profile_pic={item.profile_pic}
            admin_name={item.admin_name}
          />
        ))}


        <div className="card">
          <div className="card-header" style={{paddingTop:"0px",paddingBottom:"0px"}}>
            <BucketHeader deleteBucket={deleteBucket} bucketTitle={"bucket"} bucketData={bucketsData}/>
          </div>

          <div>
            <div className="entire">
              
                {bucketsData.map((item, index) => (
                  <BucketContains
                    key = {index}
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
