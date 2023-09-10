import React, { useEffect, useState } from "react";
import "./MyBucketComponent.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle, FaTrash } from "react-icons/fa";
import "./MyBucketComponent.css";
import { useParams } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./MyBucketComponent.css";
import {
  getadminbyID,
  addBucket,
  addQuestion,
  deleteBucketSet,
} from "../../API/axios";
import AddBucket from "../AddBucket/AddBucket";
import { Button, Modal } from "react-bootstrap";

const BucketHeader = (props) => {
  const navigate = useNavigate();
  const [deleteBucket, setDeleteBucket] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [bucketPropTitle, setBucketPropTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Employee");
  const [status, setStatus] = useState("0");
  const { bucket_id } = useParams();
  const [createConfirms, setCreateConfirms] = useState(false);
  const [isdelete, setIsdelete] = useState(false);
  const [confirmdelete, setConfirmdelete] = useState(false);
  const [createBucket, setCreateBucket] = useState(false);

  var isAuthenticated = localStorage.getItem("isAuthenticated");

  const deleteBucketList = async (event) => {
    event.preventDefault();
    const formData = {
      bucketIds: props.deleteBucketIds,
    };

    try {
      const response = await deleteBucketSet(formData);
      if (response.status === 200) {
        props.setRefresh(!props.refresh);
        props.setDeleteBucket([]);
        props.setDeleteBucketIds([]);
        setConfirmdelete(true);
        setIsdelete(false);
      }
    } catch (error) {
      console.log(error);
      alert("Delete faild");
    }
  };

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
        publish_status: status,
      };

      try {
        const response = await addBucket(formdata);
        if (response.status === 200) {
          const button = document.getElementById("myButton");
          if (button) {
            button.click();
          }
          props.setRefresh(!props.refresh);
          setCreateBucket(true);
          setCreateConfirms(true);
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
          setCreateConfirms(true);
        } else {
          alert("Something went Wrong");
        }
      } catch (error) {
        if (error.response.data.message) {
          console.log(error.response.data.message);

          if (
            error.response.data.message ===
            "Maximum number of questions reached for this bucket."
          ) {
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
                  {props.bucketTitle == "question"
                    ? "Add Question"
                    : "Add Bucket"}
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
                  setStatus={setStatus}
                />
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  style={{
                    width: "100px",
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px 0",
                  }}
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  id="myButton"
                >
                  Close
                </button>
                <button
                  style={{
                    width: "100px",
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px 0",
                  }}
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClose}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        <button data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
          {props.bucketTitle == "question" ? "Add Question" : "Add Bucket"}
        </button>
      </div>
      <div className="">
        <div className=" w-100">
          <div>
            <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-column justify-content-between  align-items-center"></div>

            <div style={{ display: "flex", padding: "0 10px" }}>
              {props.bucketTitle == "bucket" ? (
                <>
                  {props.deleteBucket.length > 0 ? (
                    <>
                      <FaTrash
                        style={{
                          color: "red",
                          fontSize: "20px",
                          paddingRight: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setIsdelete(true);
                        }}
                      />
                      <p
                        style={{
                          color: "red",
                          fontWeight: "500",
                          paddingLeft: "20px",
                        }}
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
        <div>
          {createConfirms && (
            <Modal
              show={createConfirms}
              onHide={() => setCreateConfirms(false)}
              style={{ background: "rgba(15, 14, 14, 0.144)" }}
            >
              <Modal.Header closeButton>
                <div className="d-flex justify-content-center align-items-center text-danger">
                  <FaCheckCircle
                    size={24}
                    style={{ marginLeft: "220px", color: "green" }}
                    onClick={() => {
                      setCreateConfirms(false);
                      window.location.reload();
                    }}
                  />
                </div>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                {createBucket
                  ? "Bucket Successfully Created."
                  : "Question Successfully Added."}
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  style={{ width: "100px" }}
                  onClick={() => {
                    setCreateConfirms(false);
                  }}
                >
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {isdelete && (
            <Modal
              show={isdelete}
              onHide={() => setIsdelete(false)}
              style={{ background: "rgba(15, 14, 14, 0.144)" }}
            >
              <Modal.Header closeButton>
                <div className="d-flex justify-content-center align-items-center text-danger">
                  <FaExclamationCircle
                    size={24}
                    style={{ marginLeft: "220px" }}
                    onClick={() => setIsdelete(false)}
                  />
                </div>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                Are you sure to delete this Bucket?
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  variant="secondary"
                  style={{ width: "100px" }}
                  onClick={() => setIsdelete(false)}
                >
                  No
                </Button>
                <Button
                  variant="dark"
                  style={{ width: "100px" }}
                  onClick={deleteBucketList}
                >
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {confirmdelete && (
            <Modal
              show={confirmdelete}
              onHide={() => setConfirmdelete(false)}
              style={{ background: "rgba(15, 14, 14, 0.144)" }}
            >
              <Modal.Header closeButton>
                <div className="d-flex justify-content-center align-items-center text-danger">
                  <FaCheckCircle
                    size={24}
                    style={{ marginLeft: "220px", color: "green" }}
                    onClick={() => setConfirmdelete(false)}
                  />
                </div>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                Bucket Successfully Deleted.
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  style={{ width: "100px" }}
                  onClick={() => {
                    setConfirmdelete(false);
                  }}
                >
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default BucketHeader;
