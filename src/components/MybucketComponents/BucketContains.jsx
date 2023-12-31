import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const BucketContains = (props) => {
  const navigate = useNavigate();
  const[check,setCheck] = useState(false)
  const isChecked = (event) => {
    if (event.target.checked) {
      props.setDeleteBucket([...props.deleteBucket, props.item]);
      props.setDeleteBucketIds([
        ...props.deleteBucketIds,
        props.item.bucket_id,
      ]);
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

    navigate(`/my-buckets/bucket-data/${props.item.bucket_id}`);
  };

  useEffect(() => {

if(props.deleteBucketIds.includes(props.item.bucket_id)){
  setCheck(true)
}else{
  setCheck(false)
}
    
  }, [props.deleteBucketIds])
  

  const handleEditBucket = (event) => {
    event.preventDefault();
    props.setIsAdd(false);
    props.setIsBucketEdit(true);
    props.setEditBucketId(props.item.bucket_id);
    props.setEditTempBucketId(props.item.bucket_id);
    props.setBucketPropTitle(props.item.name);
    props.setDescription(props.item.description);
    props.setType(props.item.type);
    if (props.item.publish_status == 1) {
      props.setStatus("1");
    } else {
      props.setStatus("0");
    }
  };

  return (
    <div>
      <div className="backet-card">
        <div>
          <input
            style={{ scale: "1.5", marginLeft: "15px" }}
            type="checkbox"
            onChange={isChecked}
            checked={check}
          />
        </div>
        {props.item.name.length > 20 ? (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-name-${props.item.bucket_id}`}>
                {props.item.name}
              </Tooltip>
            }
          >
            <p className="card-title">
              {props.item.name.slice(0, 20) + " ..."}
            </p>
          </OverlayTrigger>
        ) : (
          <p className="card-title">{props.item.name}</p>
        )}
        {props.item.description.length > 20 ? (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-description-${props.item.bucket_id}`}>
                {props.item.description}
              </Tooltip>
            }
          >
            <p className="card-text">
              {props.item.description.slice(0, 20) + " ..."}
            </p>
          </OverlayTrigger>
        ) : (
          <p className="card-text">{props.item.description}</p>
        )}

        <p className="card-text">{props.item.type}</p>
        <p className="card-text">
          {props.item.publish_status ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                onClick={handleClick}
                icon={faCircleDot}
                style={{
                  color: "green",
                  width: "15px",
                  height: "15px",
                  padding: "2px 10px 2px 0",
                  cursor: "pointer",
                }}
              />
              Published
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                onClick={handleClick}
                icon={faCircleDot}
                style={{
                  color: "gray",
                  width: "15px",
                  height: "15px",
                  padding: "2px 10px 2px 0",
                  cursor: "pointer",
                }}
              />
              Draft
            </div>
          )}
        </p>
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
            onClick={handleEditBucket}
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
