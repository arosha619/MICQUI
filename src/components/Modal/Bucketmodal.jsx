import React from "react";
import ModalBody from "../ModalBody/ModalBody";
import "./BucketModal.css";

function Bucketmodal(props) {
  const disabled =
    props.bucketTitle === "bucket"
      ? !(
          props.bucketPropTitle &&
          props.description &&
          props.status &&
          props.type
        )
      : !props.bucketPropTitle;

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
                <div
                  className="modal-header"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h5
                    className="modal-title"
                    id="exampleModalLongTitle"
                    style={{ margin: "auto", display: "inline-block" }}
                  >
                    {props.bucketTitle == "bucket"
                      ? "Add Bucket"
                      : "Add Question"}
                  </h5>
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
                    setaddBucketEmptyErr={props.setaddBucketEmptyErr}
                    addBucketEmptyErr={props.addBucketEmptyErr}
                    setaddBucketDesEmptyErr={props.setaddBucketDesEmptyErr}
                    addBucketDesEmptyErr={props.addBucketDesEmptyErr}
                  />
                </div>
                <div
                  className="modal-footer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="myButton"
                  >
                    Back
                  </button>
                  <button
                    style={
                      disabled
                        ? {
                            backgroundColor: "black",
                            opacity: "0.7",
                            border: "1px solid black",
                          }
                        : { border: "1px solid black" }
                    }
                    // disabled={disabled}
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
                <div
                  className="modal-header"
                  style={{ justifyContent: "center" }}
                >
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    {props.bucketTitle == "bucket"
                      ? "Edit Bucket"
                      : "Edit Question"}
                  </h5>
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
                    setaddBucketEmptyErr={props.setaddBucketEmptyErr}
                    addBucketEmptyErr={props.addBucketEmptyErr}
                    setaddBucketDesEmptyErr={props.setaddBucketDesEmptyErr}
                    addBucketDesEmptyErr={props.addBucketDesEmptyErr}
                  />
                </div>
                <div
                  className="modal-footer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="myButton"
                    onClick={() => {
                      window.location.reload();
                    }}
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
