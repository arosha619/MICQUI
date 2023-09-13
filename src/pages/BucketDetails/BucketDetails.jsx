import React, { useState, useEffect } from "react";
import BucketDetailCard from "../../components/BucketDetailCard/BucketDetailCard";
import BucketHeader from "../../components/MybucketComponents/BucketHeader";
import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import { getAllQuestion, getBucketById } from "../../API/axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./BucketDetails.css";
import Loading from "../../components/Spinner/Spinner";

const BucketDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  // const [questionList, setQuestionList] = useState([]);
  // const [getQuestion, setGetQuestion] = useState(false);
  // const [questionRefresh, setQuestionRefresh] = useState(false);
  // const [bucketStatus, setBucketStatus] = useState("draft");
  // const [bucketTopic, setBucketTopic] = useState("");
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
  const [loading, setLoading] = useState(true);
  const backgroundColor = "white";
  const height = "100px";

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const response = await getAllQuestion();
        console.log("response : ", response);
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
        setLoading(false);
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

  return (
    <Layout Title="Questions">
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
              {loading ? (
                <Loading backgroundColor={backgroundColor} height={height} />
              ) : (
                <>
                  {filteredData.length > 0 ? (
                    <>
                      {filteredData.map((item, index) => (
                        <>
                          <BucketDetailCard
                            index={index}
                            // item={item}
                            // setGetQuestion={setGetQuestion}
                            // getQuestion={getQuestion}
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
                                // item={item}
                                // setGetQuestion={setGetQuestion}
                                // getQuestion={getQuestion}
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
        </div>
      </div>
    </Layout>
  );
};

export default BucketDetails;
