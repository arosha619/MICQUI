import React, { useEffect, useState } from "react";
import "./MyBucketComponent.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle, FaTrash } from "react-icons/fa";
import "./MyBucketComponent.css";
import { useParams } from "react-router-dom";
import "./MyBucketComponent.css";
import {
  getadminbyID,
  addBucket,
  editBucket,
  addQuestion,
  deleteBucketSet,
  editQuestion,
} from "../../API/axios";
import { Button, Modal } from "react-bootstrap";
import Bucketmodal from "../Modal/Bucketmodal";

const BucketHeader = (props) => {
  const navigate = useNavigate();
  const [deleteBucket, setDeleteBucket] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const { bucket_id } = useParams();
  const [createConfirms, setCreateConfirms] = useState(false);
  const [isdelete, setIsdelete] = useState(false);
  const [confirmdelete, setConfirmdelete] = useState(false);
  const [createBucket, setCreateBucket] = useState(false);
  const [updateBucket, setUpdateBucket] = useState(false);
  const [UpdateConfirms, setUpdateConfirms] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [iserror, setIsError] = useState(false);
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  const [addBucketEmptyErr, setaddBucketEmptyErr] = useState('');
  const [addBucketDesEmptyErr, setaddBucketDesEmptyErr] = useState('');


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
        setIsdelete(false);
        setConfirmdelete(true);
      }
    } catch (error) {
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
    if (props.isAdd) {
      if (props.bucketTitle === "bucket") {
        if (props.bucketPropTitle == "" || props.description == "") {
          setaddBucketEmptyErr("Bucket Name is required")
          setaddBucketDesEmptyErr("Bucket Description is required")
        } else {
          const formdata = {
            name: props.bucketPropTitle,
            description: props.description,
            type: props.type,
            publish_status: props.status,
          };

          try {
            const response = await addBucket(formdata);
            if (response.status === 200) {
              const button = document.getElementById("myButton");
              props.setBucketPropTitle("");
              props.setDescription("");
              props.setType("Employee");
              props.setStatus("0");
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
      }
      if (props.bucketTitle === "question") {
        const formdata = {
          bucket_id: bucket_id,
          question: props.bucketPropTitle,
        };
        if (props.bucketPropTitle == "" ) {
          setaddBucketEmptyErr("Question is required")
        } else {
        try {
          const response = await addQuestion(formdata);

          if (response.data.code === 200) {
            const button = document.getElementById("myButton");
            props.setBucketPropTitle("");
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
            if (
              error.response.data.message ===
              "Maximum number of questions reached for this bucket."
            ) {
              const button = document.getElementById("myButton");
              if (button) {
                button.click();
              }
            }
            setErrormsg(error.response.data.message);
            setIsError(true);
          } else {
            setErrormsg(error.message);
            setIsError(true);
          }
        }}
      }
    } else {
      if (props.bucketTitle === "bucket") {
       
        const formdata = {
          name: props.bucketPropTitle,
          description: props.description,
          type: props.type,
          publish_status: props.status,
        };
    
        if (props.bucketPropTitle == "" || props.description == "") {
          setaddBucketEmptyErr("Bucket Name is required")
          setaddBucketDesEmptyErr("Bucket Description is required")
        } else {
        try {
          const response = await editBucket(props.editBucketId, formdata);
          if (response.status === 200) {
            const button = document.getElementById("myButton");
            props.setBucketPropTitle("");
            props.setDescription("");
            props.setType("Employee");
            props.setStatus("0");
            if (button) {
              button.click();
            }
            props.setRefresh(!props.refresh);
            setUpdateBucket(true);
            setUpdateConfirms(true);

            // alert("Successfully updated");
          } else {
            alert("Something went Wrong");
          }
        } catch (error) {
          alert(error.message);
        }
      }
      }
      if (props.bucketTitle === "question") {
        const formdata = {
          question: props.bucketPropTitle,
        };
        if (props.bucketPropTitle == "" ) {
          setaddBucketEmptyErr("Question is required")
        } else {

        try {
          const response = await editQuestion(props.editQuestionId, formdata);

          if (response.status === 200) {
            const button = document.getElementById("myButton");
            props.setBucketPropTitle("");
            props.setEditQuestionId("");
            if (button) {
              button.click();
            }
            props.setQuestionRefresh(!props.refresh);
            setUpdateConfirms(true);
          } else {
            alert("Something went Wrong");
          }
        } catch (error) {
          alert("Question update faild");
        }
      }}
    }
  };

  const handleAddBucket = (event) => {
    event.preventDefault();
    props.setBucketPropTitle("");
    props.setIsAdd(true);
  };

  return (
    <>
      <Bucketmodal
        bucketTitle={props.bucketTitle}
        firstField={props.firstField}
        placeHolder={props.placeHolder}
        bucketPropTitle={props.bucketPropTitle}
        setBucketPropTitle={props.setBucketPropTitle}
        description={props.description}
        setDescription={props.setDescription}
        type={props.type}
        setType={props.setType}
        setStatus={props.setStatus}
        handleClose={handleClose}
        isAdd={props.isAdd}
        setIsAdd={props.setIsAdd}
        editBucketId={props.editBucketId}
        editQuestionId={props.editQuestionId}
        setIsBucketEdit={props.setIsBucketEdit}
        isBucketEdit={props.isBucketEdit}
        status={props.status}
       setaddBucketEmptyErr ={setaddBucketEmptyErr}
       addBucketEmptyErr={addBucketEmptyErr}
       setaddBucketDesEmptyErr={setaddBucketDesEmptyErr}
       addBucketDesEmptyErr={addBucketDesEmptyErr}

      />
      <div className="mb-3 w-100 search-header">
        <div className="w-50 ">
          <input
            onChange={(e) => props.setSearchItem(e.target.value)}
            style={{
              padding: "10px 20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            type="search"
            className="form-control"
            placeholder="Search here by Name..."
          />
        </div>
        <button
          style={{ backgroundColor: "rgb(150, 110, 41)" }}
          type="button"
          className="btn btn-outline-light"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
          onClick={handleAddBucket}
        >
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
          {UpdateConfirms && (
            <Modal
              show={UpdateConfirms}
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
                {updateBucket
                  ? "Bucket Successfully Updated."
                  : "Question Successfully Updated."}
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  style={{ width: "100px" }}
                  onClick={() => {
                    setUpdateConfirms(false);
                  }}
                >
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
          )}
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
                  : "Question Successfully Created."}
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
          {iserror && (
            <Modal
              show={iserror}
              onHide={() => setIsError(false)}
              style={{ background: "rgba(15, 14, 14, 0.144)" }}
            >
              <Modal.Header closeButton>
                <div className="d-flex justify-content-center align-items-center text-danger">
                  <FaExclamationCircle
                    size={24}
                    style={{ marginLeft: "220px" }}
                    onClick={() => setIsError(false)}
                  />
                </div>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                {errormsg}
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  variant="secondary"
                  style={{ width: "100px" }}
                  onClick={() => setIsError(false)}
                >
                  OK
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
