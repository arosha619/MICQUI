import React, { useState } from "react";
import bucketData from "./BucketContains";
import { useNavigate } from "react-router-dom";

const BucketContains = (props) => {


  const isChecked = (event) => {

    if (event.target.checked) {
      
      props.setDeleteBucket([...props.deleteBucket, props.item]);

    } else {

      var index = props.deleteBucket.indexOf(props.item);
      props.deleteBucket.splice(index, 1);
      props.setDeleteBucket(props.deleteBucket);
    }
  };

  return (
    <div>
      <div
        className="card-body d-flex row"
        style={{ marginRight: "0px", marginLeft: "0px" }}
      >
        <div className="form-check col-1 d-flex align-items-center">
          <input
            style={{ scale: "2", marginLeft: "15px" }}
            className="form-check-input"
            type="checkbox"
            onChange={isChecked}
          />
        </div>
        <div className="card-content col-11 ">
          <h5 className="card-title">nnnnnnnnn</h5>
          <p className="card-text">ujgjlikjn</p>
          <div>
            <div className="dropdown ">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User type
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
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <hr />
      </div>
    </div>
  );
};

export default BucketContains;
