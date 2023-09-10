import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { deleteQuestionById } from "../../API/axios";
import { BiSolidEdit } from "react-icons/bi";

const BucketDetailCard = (props) => {
  const handleClick = async (event) => {
    event.preventDefault();
    const response = await deleteQuestionById(props.item.q_id);
    if (response.data.code == 200) {
      props.setGetQuestion(!props.getQuestion);
      alert("question delete successfully");
    }
  };

  const handleEditQuestion = (event) => {
    event.preventDefault();
    props.setEditQuestionId(props.item.q_id);
    props.setEditTempQuestionId(props.item.q_id);
    props.setBucketPropTitle(props.item.question);
    props.setIsAdd(false);
    props.setIsBucketEdit(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="col-10 " style={{ padding: "auto" }}>
          <p style={{ margin: "0px" }}>{props.item.question}</p>
        </div>
        <button
          type="button"
          className="btn btn-warning btn-outline-light"
          onClick={handleEditQuestion}
        >
          <BiSolidEdit style={{ color: "blue", fontSize: "30px" }} />
        </button>
        <div
          className="col-1 d-flex justify-content-end "
          style={{ paddingRight: "17px" }}
        >
          <FaTrashCan
            style={{
              color: "red",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          />
        </div>
      </div>

      <hr />
    </div>
  );
};

export default BucketDetailCard;
