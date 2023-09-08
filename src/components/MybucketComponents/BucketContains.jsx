import React, { useState, useEffect } from "react";
import bucketData from "./BucketContains";
import { useNavigate } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";

const BucketContains = (props) => {
  const navigate = useNavigate();
  const isChecked = (event) => {
    if (event.target.checked) {
      props.setDeleteBucket([...props.deleteBucket, props.item]);
    } else {
      const updatedDeleteBucket = props.deleteBucket.filter(
        (bucketItem) => bucketItem !== props.item
      );
      props.setDeleteBucket(updatedDeleteBucket);
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    navigate(`/bucket-data/${props.item.bucket_id}`);
  };

  const editBucket = () => {
      
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
        <div className="card-content col-10 ">
          <div
            className="p-2"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <h5 className="card-title">{props.item.name}</h5>
            <p className="card-text">{props.item.description}</p>
          </div>
          <div className="edit" style={{display:"flex", float:"right", color:"blue", fontSize:"20px"}}>
            <BiSolidEdit  onClick={editBucket}/>
          </div>

          <div>
            <div className="dropdown ">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {props.item.type}
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
          paddingLeft: "15px",
          paddingRight: "40px",
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
