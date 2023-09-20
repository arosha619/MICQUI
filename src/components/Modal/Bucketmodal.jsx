import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ModalBody from "../ModalBody/ModalBody";
import './BucketModal.css'

function Bucketmodal(props) {
  return (
    <div>
      {props.isAdd ? (
        <>
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
                <div className="modal-header" style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
                  <h5 className="modal-title" id="exampleModalLongTitle" style={{ margin: "auto", display: "inline-block" }}>
                    {props.bucketTitle == "bucket"
                      ? "Add Bucket"
                      : "Add Question"}
                  </h5>

                  <button
                    type="button"
                    className="btn"
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
                  <ModalBody
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
                    status={props.status}
                    isAdd={props.isAdd}
                  />
                </div>
                <div className="modal-footer" style={{display:"flex", alignItems:'center',  justifyContent: "center"}}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="myButton"
                  >
                     Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={props.handleClose}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
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
                    {props.bucketTitle == "bucket"
                      ? "Edit Bucket"
                      : "Edit Question"}
                  </h5>

                  <button
                    type="button"
                    className="btn"
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
                  <ModalBody
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
                    isAdd={props.isAdd}
                    status={props.status}
                  />
                </div>
                <div className="modal-footer" style={{display:"flex", alignItems:'center',  justifyContent: "center"}}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="myButton"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={props.handleClose}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Bucketmodal;
