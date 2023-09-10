import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { deleteQuestionById } from "../../API/axios";

const BucketDetailCard = (props) => {
  const handleClick = async (event) => {
    event.preventDefault();
    const response = await deleteQuestionById(props.item.q_id);
    if(response.data.code == 200){
      props.setGetQuestion(!props.getQuestion)
      alert("question delete successfully")     
    }
  };

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
