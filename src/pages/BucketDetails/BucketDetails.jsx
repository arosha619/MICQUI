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

  const [questionList, setQuestionList] = useState([]);
  const [getQuestion, setGetQuestion] = useState(false);
  const [questionRefresh, setQuestionRefresh] = useState(false);
  const [bucketStatus, setBucketStatus] = useState("draft");
  const [bucketTopic, setBucketTopic] = useState("");
  const [bucketdescription, setBucketdescription] = useState("");
  const [loading, setLoading]= useState(true);
  const backgroundColor = "white";
  const height = "100px";

  

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const response = await getAllQuestion();
        console.log("response : ", response);
        // Handle the response here
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
        setBucketdescription(response.data.data[0].description)
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
              />
            </div>
            <div className="q-header">
              <h2>{bucketTopic}</h2>
              <p style={{margin:'0'}}>{bucketdescription}</p>
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
              {questionList.map((item, index) => (
                <>
                  <BucketDetailCard
                    index={index}
                    item={item}
                    setGetQuestion={setGetQuestion}
                    getQuestion={getQuestion}
                  />
                  <hr style={{margin:'0',padding:'0'}} />
                </>
              ))}</>)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BucketDetails;
