import React, { useState, useEffect } from "react";
import "./MyBucket.css";
import SideBar from "../../components/Sidebar/SideBar";
import BucketContains from "./../../components/MybucketComponents/BucketContains";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

import BucketHeader from "./../../components/MybucketComponents/BucketHeader";
import { getAllBuckets } from "../../API/axios";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { getadminbyID } from "../../API/axios";

const MyBucket = () => {
  const navigate = useNavigate();
  const [deleteBucket, setDeleteBucket] = useState([]);
  const [deleteBucketIds, setDeleteBucketIds] = useState([]);
  const [buttonId, setButtonId] = useState();
  const [bucketsData, setBucketsData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editBucketId, setEditBucketId] = useState("");
  const [editQuestionId, setEditQuestionId] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  const [isBucketEdit, setIsBucketEdit] = useState(true);
  const [bucketPropTitle, setBucketPropTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Employee");
  const [status, setStatus] = useState("0");

  var isAuthenticated = localStorage.getItem("isAuthenticated");
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    var isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated || isAuthenticated == null) {
      alert("Need to login first");
      navigate("/");
    } else {
      const fetchBucketData = async () => {
        try {
          const response = await getAllBuckets();

          const data = response.data.data;

          setBucketsData(data);
        } catch (error) {
          console.error("Error fetching bucket data:", error);
          alert("Data fetching faild");
        }
      };

      fetchBucketData();
    }
  }, []);

  useEffect(() => {
    var isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated || isAuthenticated == null) {
      alert("Need to login first");
      navigate("/");
    } else {
      const fetchBucketData = async () => {
        try {
          const response = await getAllBuckets();

          const data = response.data.data;

          setBucketsData(data);
        } catch (error) {
          console.error("Error fetching bucket data:", error);
          alert("Data fetching faild");
        }
      };

      fetchBucketData();
    }
  }, [refresh]);

  useEffect(() => {
    if (editQuestionId != "") {
      const button = document.getElementById("hiddenButton");
      if (button) {
        button.click();
      }
    }
  }, [editQuestionId]);

  if (!isAuthenticated || isAuthenticated === "false") {
    return null;
  }

  return (
    <>
      <div className="d-flex">
        <div>
          <SideBar />
        </div>

        <div className=" w-100" style={{ padding: "15px 20px 15px 20px" }}>
          <Header />

          <div className="card">
            <div
              className="card-header"
              style={{ paddingTop: "0px", paddingBottom: "0px" }}
            >
              <BucketHeader
                deleteBucket={deleteBucket}
                bucketTitle={"bucket"}
                bucketData={bucketsData}
                firstField={"Bucket Name"}
                placeHolder={"Enter Bucket Title"}
                refresh={refresh}
                setRefresh={setRefresh}
                setDeleteBucketIds={setDeleteBucketIds}
                deleteBucketIds={deleteBucketIds}
                setDeleteBucket={setDeleteBucket}
                isAdd={isAdd}
                setIsAdd={setIsAdd}
                editBucketId={editBucketId}
                editQuestionId={editQuestionId}
                setIsBucketEdit={setIsBucketEdit}
                isBucketEdit={isBucketEdit}
                bucketPropTitle={bucketPropTitle}
                setBucketPropTitle={setBucketPropTitle}
                description={description}
                setDescription={setDescription}
                type={type}
                setType={setType}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div>
              <div className="entire">
                {bucketsData.length > 0 ? (
                  <>
                    {bucketsData.map((item, index) => (
                      <BucketContains
                        key={index}
                        deleteBucket={deleteBucket}
                        setDeleteBucket={setDeleteBucket}
                        setDeleteBucketIds={setDeleteBucketIds}
                        deleteBucketIds={deleteBucketIds}
                        item={item}
                        setEditQuestionId={setEditQuestionId}
                        setIsAdd={setIsAdd}
                        setIsBucketEdit={setIsBucketEdit}
                        setBucketPropTitle={setBucketPropTitle}
                        setDescription={setDescription}
                        setType={setType}
                        setStatus={setStatus}
                        satatus={status}
                      />
                    ))}
                  </>
                ) : (
                  <></>
                )}

                <button
                  type="button"
                  id="hiddenButton"
                  className="btn btn-warning btn-outline-light d-none"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  New Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBucket;
