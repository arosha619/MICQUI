import React from "react";
import ModelBody from "../ModelBody/ModelBody";
import { AiOutlineCloseCircle } from "react-icons/ai";

const BucketModal = (props) => {
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
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Add Bucket
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
                  <ModelBody
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
                    onClick={props.handleClose}
                  >
                    Save changes
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
                    Edit Bucket
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
                  <ModelBody
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
                    onClick={props.handleClose}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BucketModal;
