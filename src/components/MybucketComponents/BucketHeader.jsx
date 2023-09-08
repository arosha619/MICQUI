import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./MyBucketComponent.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { getadminbyID, addBucket, addQuestion } from "../../API/axios";
import AddBucket from "../AddBucket/AddBucket";
import { useParams } from "react-router-dom";

const BucketHeader = (props) => {
  const navigate = useNavigate();
  const [deleteBucket, setDeleteBucket] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [bucketPropTitle, setBucketPropTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const { bucket_id } = useParams();
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

  const handleClose = async (event) => {
    event.preventDefault();

    if (props.bucketTitle === "bucket") {
      const formdata = {
        name: bucketPropTitle,
        description: description,
        type: type,
      };

      try {
        const response = await addBucket(formdata);
        if (response.status === 200) {
          const button = document.getElementById("myButton");
          if (button) {
            button.click();
          }
          props.setRefresh(!props.refresh);
          alert("Successfully add");
        } else {
          alert("Something went Wrong");
        }
      } catch (error) {
        alert(error.message);
      }
    }
    if (props.bucketTitle === "question") {
      const formdata = {
        bucket_id: bucket_id,
        question: bucketPropTitle,
      };

      try {
        const response = await addQuestion(formdata);

        if (response.data.code === 200) {
          const button = document.getElementById("myButton");
          setBucketPropTitle("");
          if (button) {
            button.click();
          }
          props.setQuestionRefresh(!props.refresh);
          alert("Success!");
        } else {
          alert("Something went Wrong");
        }
      } catch (error) {
        if (error.response.data.message) {

          console.log(error.response.data.message);
          
          if (error.response.data.message === "Maximum number of questions reached for this bucket.") {
            const button = document.getElementById("myButton");
            if (button) {
              button.click();
            }
          }
          alert(error.response.data.message);
        } else {
          alert(error.message);
        }
      }
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add Bucket
                </h5>

                <button
                  type="button"
                  class="btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ outline: "none !important" }}
                  onFocus={(e) => e.target.blur()}
                >
                  <AiOutlineCloseCircle
                    style={{ color: "red", fontSize: "30px" }}
                  />
                </button>
              </div>
              <div className="modal-body">
                <AddBucket
                  bucketTitle={props.bucketTitle}
                  firstField={props.firstField}
                  placeHolder={props.placeHolder}
                  bucketPropTitle={bucketPropTitle}
                  setBucketPropTitle={setBucketPropTitle}
                  description={description}
                  setDescription={setDescription}
                  type={type}
                  setType={setType}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="myButton"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClose}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex">
        <div className=" w-100" style={{ padding: "13px 20px 4px 20px" }}>
          <div>
            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-column justify-content-between  align-items-center">
              {props.bucketTitle == "bucket" ? (
                <>
                  <h5 className="">Buckets ({props.bucketData.length})</h5>
                </>
              ) : (
                <>
                  <h5 className="">Questions ({props.questionList.length})</h5>
                </>
              )}

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

              {props.bucketTitle == "bucket" ? (
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
              )}

              {
                <button
                  type="button"
                  className="btn btn-outline-light"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
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
              {props.bucketTitle == "bucket" ? (
                <>
                  {props.deleteBucket.length > 0 ? (
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
