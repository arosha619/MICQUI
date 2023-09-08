import React, { useEffect, useState } from "react";
import "./MyBucketComponent.css";
import { useNavigate } from "react-router-dom";
import { getadminbyID } from "../../API/axios";
import { FaTrash } from "react-icons/fa";

const BucketHeader = (props) => {
  const navigate = useNavigate();
  const [deleteBucket, setDeleteBucket] = useState([]);
  const [adminData, setAdminData] = useState([]);
  var isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    var isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated || isAuthenticated == null) {
      alert("Need to login first");
      console.log("not authanticated");
      navigate("/");
    }
  }, []);
  const id = 1;
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
    <>
      <div className="mb-3 w-100 search-header">
        <div className="w-50 ">
          <input
            style={{
              padding: "10px 20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            type="search"
            className="form-control"
            placeholder="Search here..."
            // onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button>Add Bucket</button>
      </div>
      <div className="">
        <div className=" w-100">
          <div>
            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-column justify-content-between  align-items-center">
              {/* {props.bucketTitle == "bucket" ? (
                <>
                  <h5 className="">Buckets ({props.bucketData.length})</h5>
                </>
              ) : (
                <>
                  <h5 className="">Questions ({props.questionList.length})</h5>
                </>
              )} */}
              {/* {props.bucketTitle == "bucket" ? (
                <>
                  <div
                    className="dropdown"
                    style={{
                      border: "3px solid ",
                      borderRadius: "10px",
                      outline: "none",
                    }}
                  >
                    <button
                      className="btn btn-light  dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      User Type
                    </button>
                    <ul className="dropdown-menu dropdown-menu-light">
                      <li>
                        <a className="dropdown-item " href="#">
                          Manager
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Employee
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <></>
              )} */}
            </div>

            <div
              className="row"
              style={{ paddingLeft: "0px", marginTop: "10px" }}
            >
              {props.bucketTitle == "bucket" ? (
                <>
                  {props.deleteBucket.length > 0 ? (
                    <>
                      <FaTrash
                        className="col-1 "
                        style={{
                          color: "red",
                          fontSize: "20px",
                          paddingRight: "5px",
                          cursor:"pointer"
                        }}
                      />
                      <p
                        className="col-11"
                        style={{ color: "red", fontWeight: "500" }}
                      >
                        Delete {props.deleteBucket.length} bucket
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              {deleteBucket.length > 0 ? <></> : <></>}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default BucketHeader;
