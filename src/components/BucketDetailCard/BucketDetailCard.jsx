import React from "react";
import { deleteQuestionById } from "../../API/axios";
import { FaTrash } from "react-icons/fa";
import "./BucketCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const BucketDetailCard = (props) => {
  const handleClick = async (event) => {
    event.preventDefault();
    const response = await deleteQuestionById(props.item.q_id);
    console.log("response", response.data.code);
    if (response.data.code == 200) {
      props.setGetQuestion(!props.getQuestion);
      alert("Question delete successfully");
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
    <div className="bucketq-card">
      <p style={{ margin: "0px" }}>
        {props.index + 1}). {props.item.question}
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FontAwesomeIcon
          onClick={handleEditQuestion}
          icon={faPen}
          style={{
            color: "black",
            width: "20px",
            height: "20px",
            padding: "0px 20px",
            cursor: "pointer",
          }}
        />
        <FaTrash
          style={{
            color: "red",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default BucketDetailCard;
