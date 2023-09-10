import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
const BucketContains = (props) => {
  
  const navigate = useNavigate();
  const isChecked = (event) => {
    if (event.target.checked) {
      props.setDeleteBucket([...props.deleteBucket, props.item]);
      props.setDeleteBucketIds([...props.deleteBucketIds, props.item.bucket_id]);
    } else {
      const updatedDeleteBucket = props.deleteBucket.filter(
        (bucketItem) => bucketItem !== props.item
      );

      const updatedDeleteBucketIds = props.deleteBucketIds.filter(
        (bucketItemId) => bucketItemId !== props.item.bucket_id
      );
      props.setDeleteBucket(updatedDeleteBucket);
      props.setDeleteBucketIds(updatedDeleteBucketIds);
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    navigate(`/bucket-data/${props.item.bucket_id}`);
  };

  const handleEditBucket = (event) => {
event.preventDefault()
props.setIsAdd(false)
props.setIsBucketEdit(true)
props.setEditQuestionId(props.item.bucket_id)
props.setBucketPropTitle(props.item.name)
props.setDescription(props.item.description)
props.setType(props.item.type)
if(props.item.publish_status == 1){
  props.setStatus("1")
  console.log("status publish");
}else{
  console.log("status draft");
  props.setStatus("0")
}
  }

  

  return (
    
    
      
 

    <div>
      <div
        className="card-body d-flex row"
        style={{ marginRight: "0px", marginLeft: "0px" }}
      >
        <div className="form-check col-1 d-flex align-items-center">
          <input
            style={{ scale: "2", marginLeft: "15px",cursor:"pointer" }}
            className="form-check-input"
            type="checkbox"
            onChange={isChecked}
          />
        </div>
        <div className="card-content col-11 ">
          <div
            className="p-2"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <h5 className="card-title">{props.item.name}</h5>
            <p className="card-text">{props.item.description}</p>
          </div>

          
          <div className="edit row" style={{display:"flex", float:"right", color:"blue", fontSize:"20px",cursor:"pointer"}} onClick={handleEditBucket}>
           <button
                  type="button"
                  className="btn btn-warning btn-outline-light"
                  // data-bs-toggle="modal"
                  // data-bs-target="#exampleModalCenter"
                  // buttonID = {props.bucket_id}
                  
                  
                >

                <BiSolidEdit
                  
                  style={{color:"blue" , fontSize: "30px"}}
                />  
            </button>
          </div>
          

          <div className="w-75">
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
