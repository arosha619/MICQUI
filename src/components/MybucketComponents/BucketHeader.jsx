import React, { useEffect, useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import "./MyBucketComponent.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { getadminbyID } from "../../API/axios";
import SideBar from '../Sidebar/SideBar';

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
    <div className="d-flex">

      <div className=" w-100" style={{ padding: "13px 20px 4px 20px" }}>

    <div>
      <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-column justify-content-between  align-items-center">

      {
    props.bucketTitle == "bucket" ? (<><h5 className="">Buckets ({props.bucketData.length})</h5></>):(<><h5 className="">Questions ({props.questionList.length})</h5></>)
}
              
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

{
    props.bucketTitle == "bucket" ? (<>
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

    </>) : (<></>)
}

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
{
    props.bucketTitle == "bucket" ? (<>{props.deleteBucket.length > 0 ? (
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
           <b> Delete {props.deleteBucket.length} bucket</b>
          </p>
        </>
      ) : (
        <></>
      )}</>):(<></>)
}
       {deleteBucket.length > 0 ? (
          <>
 
                </>
              ) : (
                <></>
              )}
                </div>
              </div>
            </div>
            <div>
          </div>
    </div>
  );
}

export default BucketHeader;
