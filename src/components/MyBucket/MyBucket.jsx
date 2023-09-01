import React, { useState, useEffect } from "react";
import "./MyBucket.css";
import SideBar from "../Sidebar/SideBar";
import BucketContains from "../MybucketComponents/BucketContains";
import { IoIosAddCircle } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { getadminbyID } from "../../API/axios";

const MyBucket = () => {
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
        {adminData.map((item) => (
          <Header
            key={item.id}
            profile_pic={item.profile_pic}
            admin_name={item.admin_name}
          />
        ))}

        <div className="card">
          <div className="card-header">
            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-column justify-content-between  align-items-center">
              <h5 className="">Buckets(7)</h5>
              <div
                className="d-flex d-inline-block search-box"
                style={{ border: "3px solid ", borderRadius: "10px" }}
              >
                <button className="btn btn-outline-light" type="submit">
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ color: "black" }}
                  />
                </button>
                <input
                  className="w-100 search-box-input "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    borderWidth: "0",
                    backgroundColor: "rgba(255,0,0,0)",
                    paddingLeft: "10px",
                    outline: "none",
                  }}
                />
              </div>
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
              {
                <button type="button" className="btn btn-outline-light">
                  <IoIosAddCircle
                    style={{ color: "green", fontSize: "30px" }}
                  />
                </button>
              }
            </div>
            <div
              className="row"
              style={{ paddingLeft: "15px", marginTop: "15px" }}
            >
              {deleteBucket.length > 0 ? (
                <>
                  <FaTrashCan
                    className="col-1 "
                    style={{
                      color: "red",
                      fontSize: "30px",
                      paddingRight: "45px",
                    }}
                  />
                  <p
                    className="col-11"
                    style={{ color: "red", fontWeight: "normal" }}
                  >
                    <b> Delete {deleteBucket.length} bucket</b>
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
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
