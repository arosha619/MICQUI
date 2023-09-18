import React, { useState, useEffect } from "react";
import BucketDetailCard from "../../components/BucketDetailCard/BucketDetailCard";
import BucketHeader from "../../components/MybucketComponents/BucketHeader";
import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import { getAllQuestion, getBucketById } from "../../API/axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./BucketDetails.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getQuestions_Answers, getAllUsers } from "../../API/axios";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BucketDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [bucketdescription, setBucketdescription] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [getQuestion, setGetQuestion] = useState(false);
  const [questionRefresh, setQuestionRefresh] = useState(false);
  const [bucketStatus, setBucketStatus] = useState("draft");
  const [bucketTopic, setBucketTopic] = useState("No title");
  const [editQuestionId, setEditQuestionId] = useState("");
  const [editTempQuestionId, setEditTempQuestionId] = useState("");
  const [bucketPropTitle, setBucketPropTitle] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  const [isBucketEdit, setIsBucketEdit] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [Answers, setAnswers] = useState([]);
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUserData(usersData.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const response = await getAllQuestion();
        if (response.data.code == 400) {
          alert(response.data.message);
        } else {
          const data = response.data.data;
          const filteredData = data.filter(
            (item) => item.bucket_id == params["bucket_id"]
          );
          setQuestionList(filteredData);
        }
      } catch (error) {
        alert("data fetch failed..!");
      }
    };

    getAllQuestions();
  }, [getQuestion, questionRefresh]);

  useEffect(() => {
    const getBucketByBucketId = async () => {
      try {
        const response = await getBucketById(params["bucket_id"]);
        setBucketTopic(response.data.data[0].name);
        setBucketdescription(response.data.data[0].description);
        if (response.data.data[0].publish_status == 1) {
          setBucketStatus("Published");
        }
      } catch (error) {
        alert("bucket details fetch faild");
      }
    };

    getBucketByBucketId();
  }, []);

  useEffect(() => {
    if (questionList.length > 0) {
      const filteredItems = questionList.filter((item) =>
        item.question.toLowerCase().includes(searchItem.toLowerCase())
      );

      setFilteredData(filteredItems);
    }
  }, [searchItem]);

  useEffect(() => {
    if (editTempQuestionId != "") {
      const button = document.getElementById("hiddenButton");
      if (button) {
        button.click();
      }
    }
    setEditTempQuestionId("");
  }, [editTempQuestionId]);

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/my-buckets");
  };

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const response = await getQuestions_Answers(params["bucket_id"]);
        setAnswers(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        alert("Answers fetching failed");
      }
    };

    getAnswers();
  }, []);

  const userMap = {};
  userdata.forEach((user) => {
    userMap[user.id] = user.full_name;
  });

  return (
    <Layout
      Title={
        <>
          <FontAwesomeIcon
            onClick={handleBack}
            icon={faCaretLeft}
            style={{
              color: "rgb(0,0,0,.7)",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              paddingRight: "10px",
            }}
          />
          Questions
        </>
      }
    >
      <div className="d-flex">
        <div className=" w-100">
          <div>
            <div>
              <BucketHeader
                questionList={questionList}
                bucketTitle={"question"}
                firstField={"Question"}
                placeHolder={"Add Your Question Here.."}
                refresh={questionRefresh}
                setQuestionRefresh={setQuestionRefresh}
                bucketPropTitle={bucketPropTitle}
                setBucketPropTitle={setBucketPropTitle}
                isAdd={isAdd}
                setIsAdd={setIsAdd}
                setIsBucketEdit={setIsBucketEdit}
                isBucketEdit={isBucketEdit}
                editQuestionId={editQuestionId}
                setEditQuestionId={setEditQuestionId}
                setSearchItem={setSearchItem}
              />
            </div>

            <div className="q-header">
              <h2>{bucketTopic}</h2>
              <p style={{ margin: "0" }}>{bucketdescription}</p>
              <div className="q-status">
                <GoDotFill
                  style={{
                    color: bucketStatus == "draft" ? "gray" : "green",
                  }}
                />
                <p style={{ margin: "0px" }}>{bucketStatus}</p>
              </div>
            </div>
            <div className="q-container">
              {filteredData.length > 0 ? (
                <>
                  {filteredData.map((item, index) => (
                    <>
                      <BucketDetailCard
                        index={index}
                        item={item}
                        setGetQuestion={setGetQuestion}
                        getQuestion={getQuestion}
                        setEditQuestionId={setEditQuestionId}
                        setEditTempQuestionId={setEditTempQuestionId}
                        setBucketPropTitle={setBucketPropTitle}
                        setIsAdd={setIsAdd}
                        setIsBucketEdit={setIsBucketEdit}
                      />
                      <hr style={{ margin: "0", padding: "0" }} />
                    </>
                  ))}
                </>
              ) : (
                <>
                  {!searchItem ? (
                    <>
                      {questionList.map((item, index) => (
                        <>
                          <BucketDetailCard
                            index={index}
                            item={item}
                            setGetQuestion={setGetQuestion}
                            getQuestion={getQuestion}
                            setEditQuestionId={setEditQuestionId}
                            setEditTempQuestionId={setEditTempQuestionId}
                            setBucketPropTitle={setBucketPropTitle}
                            setIsAdd={setIsAdd}
                            setIsBucketEdit={setIsBucketEdit}
                          />
                          <hr style={{ margin: "0", padding: "0" }} />
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            <button
              type="button"
              id="hiddenButton"
              className="btn btn-warning btn-outline-light d-none"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalCenter"
            >
              edit question
            </button>
          </div>
          <button
            className="btn_answers"
            onClick={() => setModalShow(true)}
            style={{ margin: "10px auto" }}
          >
            View Answers
          </button>
        </div>
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
    </Layout>
  );
};

export default BucketDetails;
