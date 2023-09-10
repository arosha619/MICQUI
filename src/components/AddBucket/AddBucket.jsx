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
              <label for="exampleInputEmail1">{props.firstField}</label>
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
                  <label for="Description">Description</label>
                  <input
                    type="textarea"
                    className="form-control"
                    id="description"
                    aria-describedby="description"
                    placeholder="Description"
                    value={props.description}
                    onChange={(e) => {
                      props.setDescription(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <select
                    onChange={(e) => {
                      props.setType(e.target.value);
                    }}
                  >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div>
                  <select
                    onChange={(e) => {
                      props.setStatus(e.target.value);
                    }}
                  >
                    <option value="0">Draft</option>
                    <option value="1">publish</option>
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
