import React from "react";
import { FaTrashCan } from "react-icons/fa6";

const BucketDetailCard = (props) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="col-11 " style={{ padding: "auto" }}>
          <p style={{ margin: "0px" }}>{props.item.question}</p>
        </div>
        <div
          className="col-1 d-flex justify-content-end "
          style={{ paddingRight: "17px" }}
        >
          <FaTrashCan
            style={{
              color: "red",
              fontSize: "20px",
            }}
          />
        </div>
      </div>

      <hr />
    </div>
  );
};

export default BucketDetailCard;
