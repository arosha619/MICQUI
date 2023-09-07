import React, { useState } from "react";
import "./AddBucket.css";
import { addBucket } from "../../API/axios";

const AddBucket = () => {
  const [bucketTitle, setBucketTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const createBucketData = () => {
    const formdata = {
      name: bucketTitle,
      description: description,
      type: type,
    };
    try{
        addBucket(formdata).then((res)=>{
            console.log(res.data.code);
            if(res.data.code == 200){
                alert("Success!")
            }else{
                alert("Something went Wrong")
            }
        })

    }catch{
        console.log("error");
    }
  };
  console.log(bucketTitle);
  console.log(description);
  console.log(type);
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={{ createBucketData }}>
            <div className="form-group w-100">
              <label for="exampleInputEmail1">Bucket Name</label>
              <input
                type="text"
                className="form-control"
                id="bucketTitle"
                aria-describedby="BucketTitle"
                placeholder="Enter Bucket Title"
                onChange={(e) => {
                  setBucketTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label for="Description">Description</label>
              <input
                type="textarea"
                className="form-control"
                id="description"
                aria-describedby="description"
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div>
              <select
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            {/* <div className="dropdown model-drop-down pt-3">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"F
        aria-expanded="false"
        
      >
        Type
      </button>
      <ul
        className="dropdown-menu dropdown-menu-wide pt-2" // Add custom class for full width
        aria-labelledby="dropdownMenuButton1"
      >
        <li><a className="dropdown-item" href="#" value="Employee" onSelect={(e) => {setType(e.target.textContent)}}>Employee</a></li>
        <li><a className="dropdown-item" href="#" value="Manager" onSelect={(e) => {setType(e.target.value)}}>Manager</a></li>
      </ul>
    </div> */}
          </form>
        </div>
      </div>
      <button onClick={createBucketData}>Submit</button>
    </div>
  );
};

export default AddBucket;
