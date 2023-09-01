import React from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import BucketContains from './BucketContains';
import "./MyBucketComponent.css";

const BucketHeader = (props) => {
  return (



    <div>
      <div className="d-flex flex-xl-row flex-lg-row flex-md-row flex-column justify-content-between  align-items-center">
              <h5 className="">Buckets(7)</h5>
              <div
                className="d-flex d-inline-block search-box"
                style={{ border: "3px solid ", borderRadius: "10px" }}
              >
                <button className="btn btn-outline-light" type="submit">
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ color: "black" }}
                  />
                </button>
                <input
                  className="w-100 search-box-input "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    borderWidth: "0",
                    backgroundColor: "rgba(255,0,0,0)",
                    paddingLeft: "10px",
                    outline: "none",
                  }}
                />
              </div>

{
    props.bucketTitle == "bucket"
}

{
    props.bucketTitle == "bucket" ? (<>
            <div
                className="dropdown"
                style={{
                  border: "3px solid ",
                  borderRadius: "10px",
                  outline: "none",
                }}
              >
                <button
                  className="btn btn-light  dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  User Type
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

    </>) : (<></>)
}

{
                <button type="button" className="btn btn-outline-light">
                  <IoIosAddCircle
                    style={{ color: "green", fontSize: "30px" }}
                  />
                </button>
              }
            </div>

            <div
              className="row"
              style={{ paddingLeft: "15px", marginTop: "15px" }}
             > 


{
    props.bucketTitle == "bucket" ? (<>{props.deleteBucket.length > 0 ? (
        <>
          <FaTrashCan
            className="col-1 "
            style={{
              color: "red",
              fontSize: "30px",
              paddingRight: "45px",
            }}
          />
          <p
            className="col-11"
            style={{ color: "red", fontWeight: "normal" }}
          >
           <b> Delete {props.deleteBucket.length} bucket</b>
          </p>
        </>
      ) : (
        <></>
      )}</>):(<></>)
}



              







            </div>
            <div>
          </div>
    </div>
  );
}

export default BucketHeader;
