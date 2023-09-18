import React, { useState,useEffect } from "react";
import { deleteQuestionById } from "../../API/axios";
import { FaTrash } from "react-icons/fa";
import "./BucketCard.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { getQuestions_Answers, getAllUsers } from "../../API/axios";

const BucketDetailCard = (props) => {
  const params = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [Answers, setAnswers] = useState([]);
  const [userdata, setUserData] = useState([]);

  const handleClick = async (event) => {
    event.preventDefault();
    const response = await deleteQuestionById(props.item.q_id);
    if (response.data.code === 200) {
      props.setGetQuestion(!props.getQuestion);
      setDeleteSuccess(true);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUserData(usersData.data.data);
        // console.log(userdata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const response = await getQuestions_Answers(params["bucket_id"]);
        setAnswers(response.data.data);
        console.log(params["bucket_id"]);
        console.log(response.data.data);
      } catch (error) {
        alert("Answers fetching failed");
      }
    };

    getAnswers();
  }, []);

  const handleEditQuestion = (event) => {
    event.preventDefault();
    props.setEditQuestionId(props.item.q_id);
    props.setEditTempQuestionId(props.item.q_id);
    props.setBucketPropTitle(props.item.question);
    props.setIsAdd(false);
    props.setIsBucketEdit(false);
  };
  const userMap = {};
  userdata.forEach((user) => {
    userMap[user.id] = user.full_name;
  });
 const  showAnswers =(id)=>{
  const filteredAnswers = Answers.filter((item) => item.QuestionID === id);
  console.log(filteredAnswers);
 }

  return (
    <div className="bucketq-card">
      <p style={{ margin: "0px" }}>
        {props.index + 1}). {props.item.question}
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
      <button
            className="btn_answers"
            style={{ margin: "10px auto" }}
            onClick={() => showAnswers(props.item.q_id)}
          >
            View Answers
          </button>
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
      <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Answers
            </Modal.Title>
          </Modal.Header>
          {Answers.length > 0 ? (
            <Modal.Body>
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Answer</th>
                      <th>User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Answers.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Question}</td>
                        <td>{item.Answer}</td>
                        <td>{userMap[item.UserID]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Modal.Body>
          ) : (
            <>
              <p style={{ marginLeft: "20px" }}>No Answers available</p>
            </>
          )}
          <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default BucketDetailCard;
