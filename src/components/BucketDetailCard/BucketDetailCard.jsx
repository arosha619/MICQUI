import React, { useState } from "react";
import { deleteQuestionById } from "../../API/axios";
import { FaTrash } from "react-icons/fa";
import "./BucketCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const BucketDetailCard = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    const response = await deleteQuestionById(props.item.q_id);
    if (response.data.code === 200) {
      props.setGetQuestion(!props.getQuestion);
      setDeleteSuccess(true);
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
          onClick={() => setDeleteModal(true)}
        />
      </div>
      {deleteModal && (
        <Modal
          style={{ background: "rgba(15, 14, 14, 0.144)" }}
          show={deleteModal}
          onHide={() => setDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <div className="d-flex justify-content-center align-items-center text-danger">
              <FaExclamationCircle size={24} style={{ marginLeft: "220px" }} />
            </div>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center ">
            Are you sure you want to delete this question ?
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center ">
            <Button variant="dark" onClick={handleClick}>
              Yes
            </Button>
            <Button variant="dark" onClick={() => setDeleteModal(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {deleteSuccess && (
        <Modal
          style={{ background: "rgba(15, 14, 14, 0.144)" }}
          show={deleteSuccess}
          onHide={() => setDeleteSuccess(false)}
        >
          <Modal.Header closeButton>
            <div className="d-flex justify-content-center align-items-center text-success">
              <FaCheckCircle
                size={24}
                style={{ marginLeft: "220px", color: "green" }}
              />
            </div>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            Question Deleted Successfully!
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="dark" onClick={() => setDeleteSuccess(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BucketDetailCard;
