import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import BucketDetailCard from "../../components/BucketDetailCard/BucketDetailCard";
import BucketHeader from "../../components/MybucketComponents/BucketHeader";
import { FaQrcode } from "react-icons/fa6";
import { BiArrowBack } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import { getAllQuestion, getBucketById } from "../../API/axios";
import { useNavigate } from "react-router-dom";

const BucketDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [questionList, setQuestionList] = useState([]);
  const [getQuestion, setGetQuestion] = useState(false);
  const [questionRefresh, setQuestionRefresh] = useState(false);
  const [bucketStatus, setBucketStatus] = useState("draft");
  const [bucketTopic, setBucketTopic] = useState("No title");

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
        if (response.data.data[0].publish_status == 1) {
          setBucketTopic(response.data.data[0].name);
          setBucketStatus("Published");
        }
      } catch (error) {
        alert("bucket details fetch faild");
      }
    };

    getBucketByBucketId();
  }, []);

  const handleBack = (event) =>{
event.preventDefault();
navigate("/my-buckets")

  }

  return (
    <div className="d-flex">
      <div>
        <SideBar />
      </div>

      <div className=" w-100" style={{ padding: "20px" }}>
        <div>
          <div className="row">
            <div className="col-4 p-3">
              <div className="d-inline-flex shadow bg-body p-2 rounded" onClick={handleBack} style={{cursor:"pointer"}}>
                <BiArrowBack
                  style={{ borderRadius: "5px", width: "30px", height: "30px" }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-7">
              <h2>Bucket</h2>
              <p>{bucketTopic}</p>
              <div
                className="col d-flex flex-row align-items-center"
                style={{ paddingBottom: "10px" }}
              >
                <GoDotFill
                  style={{ color: bucketStatus == "draft" ? "gray" : "green" }}
                />
                <p style={{ margin: "0px" }}>{bucketStatus}</p>
              </div>
            </div>
            <div className=" col-xl-3 col-lg-3 col-md-4 col-sm-5 col-5 d-flex flex-xl-row flex-lg-row flex-md-row flex-column text-end align justify-content-end">
              <h2 className="p-2">4SGB6TN79</h2>

              <FaQrcode
                className="p-2"
                style={{ color: "yellow", width: "60px", height: "60px" }}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <BucketHeader
              questionList={questionList}
              bucketTitle={"question"}
              firstField={"Question"}
              placeHolder={"Add Your Question Here.."}
              refresh={questionRefresh}
              setQuestionRefresh={setQuestionRefresh}
            />
          </div>

          <div className="p-3">
            {questionList.map((item, index) => (
              <BucketDetailCard
                item={item}
                setGetQuestion={setGetQuestion}
                getQuestion={getQuestion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BucketDetails;
