import React, { useState, useEffect } from "react";
import "./MyBucket.css";
import BucketContains from "./../../components/MybucketComponents/BucketContains";
import { useNavigate } from "react-router-dom";
import BucketHeader from "./../../components/MybucketComponents/BucketHeader";
import { getAllBuckets } from "../../API/axios";
import { getadminbyID } from "../../API/axios";
import Layout from "../../components/Layout/Layout";

const MyBucket = () => {
  const navigate = useNavigate();
  const [deleteBucket, setDeleteBucket] = useState([]);
  const [deleteBucketIds, setDeleteBucketIds] = useState([]);
  const [bucketsData, setBucketsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editBucketId, setEditBucketId] = useState("");
  const [editTempBucketId, setEditTempBucketId] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  const [isBucketEdit, setIsBucketEdit] = useState(true);
  const [bucketPropTitle, setBucketPropTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Employee");
  const [status, setStatus] = useState("0");
  const [searchItem, setSearchItem] = useState("");

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
          console.log("data : ", data);

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

  useEffect(() => {
    if (bucketsData.length > 0) {
      const filteredItems = bucketsData.filter((item) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setFilteredData(filteredItems);
    }
  }, [searchItem]);

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
          console.log("data : ", data);

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
    if (editTempBucketId != "") {
      const button = document.getElementById("hiddenButton");
      if (button) {
        button.click();
      }
    }
    setEditTempBucketId("");
  }, [editTempBucketId]);

  if (!isAuthenticated || isAuthenticated === "false") {
    return null;
  }

  return (
    <Layout Title={"Buckets(" + bucketsData.length + ")"}>
      <div className="d-flex">
        <div className=" w-100">
          <div className=" w-100">
            <div className="bucket_header">
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
                setSearchItem={setSearchItem}
              />
            </div>
            <div>
              <div>
                <div className="bucket-card-header">
                  <p>Check</p>
                  <p>Bucket Name</p>
                  <p>Description</p>
                  <p>position</p>
                  <p>Status</p>
                  <p>Actions</p>
                </div>

                {filteredData.length > 0 ? (
                  <>
                    {filteredData.map((item, index) => (
                      <BucketContains
                        key={index}
                        deleteBucket={deleteBucket}
                        setDeleteBucket={setDeleteBucket}
                        setDeleteBucketIds={setDeleteBucketIds}
                        deleteBucketIds={deleteBucketIds}
                        item={item}
                        setEditBucketId={setEditBucketId}
                        setEditTempBucketId={setEditTempBucketId}
                        setIsAdd={setIsAdd}
                        setIsBucketEdit={setIsBucketEdit}
                        setBucketPropTitle={setBucketPropTitle}
                        setDescription={setDescription}
                        setType={setType}
                        setStatus={setStatus}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {!searchItem ? (
                      <>
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
                                setEditBucketId={setEditBucketId}
                                setEditTempBucketId={setEditTempBucketId}
                                setIsAdd={setIsAdd}
                                setIsBucketEdit={setIsBucketEdit}
                                setBucketPropTitle={setBucketPropTitle}
                                setDescription={setDescription}
                                setType={setType}
                                setStatus={setStatus}
                              />
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
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
    </Layout>
  );
};

export default MyBucket;
