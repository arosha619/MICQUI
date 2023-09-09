import React, { useState, useEffect } from "react";
import "./AddBucket.css";
import { addBucket, addQuestion } from "../../API/axios";
import { useParams } from "react-router-dom";

const AddBucket = (props) => {
  const { bucket_id } = useParams();

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group w-100">
              <label htmlFor="exampleInputEmail1">{props.firstField}</label>
              <input
                type="text"
                className="form-control"
                id="bucketTitle"
                aria-describedby="BucketTitle"
                placeholder={props.placeHolder}
                value={props.bucketPropTitle}
                onChange={(e) => {
                  props.setBucketPropTitle(e.target.value);
                }}
              />
            </div>

            {props.bucketTitle === "bucket" ? (
              <>
                <div className="form-group">
                  <label htmlFor="Description">Description</label>
                  <input
                    type="textarea"
                    className="form-control"
                    id="description"
                    aria-describedby="description"
                    placeholder="Description"
                    onChange={(e) => {
                      props.setDescription(e.target.value);
                    }}
                  />
                </div>
                
                <div className="select-container">
                <label htmlFor="Description">Position</label>
                  <select
                    className="select-dropdown"
                    onChange={(e) => {
                      props.setType(e.target.value);
                    }}
                  >
                    <option className="select-option" value="Employee">
                      Employee
                    </option>
                    <option className="select-option" value="Manager">
                      Manager
                    </option>
                  </select>
                </div>
              </>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBucket;
