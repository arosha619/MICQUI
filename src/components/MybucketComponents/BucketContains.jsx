import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen } from "@fortawesome/free-solid-svg-icons";

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

  const editBucket = () => {};

  return (
    <div>
      <div className="backet-card">
        <div>
          <input
            style={{ scale: "1.5", marginLeft: "15px" }}
            type="checkbox"
            onChange={isChecked}
          />
        </div>
        <p className="card-title">{props.item.name}</p>
        <p className="card-text">{props.item.description}</p>
        <p className="card-text">{props.item.type}</p>
        <div>
          <FontAwesomeIcon
            onClick={handleClick}
            icon={faEye}
            style={{
              color: "black",
              width: "20px",
              height: "20px",
              padding: "2px 20px 2px 0",
              cursor: "pointer",
            }}
          />
          <FontAwesomeIcon
            icon={faPen}
            style={{
              color: "black",
              width: "20px",
              height: "20px",
              padding: "2px 20px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BucketContains;
