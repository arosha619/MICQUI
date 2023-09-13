import React from "react";
import { deleteQuestionById } from "../../API/axios";
import { FaTrash } from "react-icons/fa";
import "./BucketCard.css";

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
  return (
    <div className="bucketq-card">
      <p style={{ margin: "0px" }}>{props.index+1}). {props.item.question}</p>
      <FaTrash
        style={{
          color: "red",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      />
    </div>
  );
};

export default BucketDetailCard;
