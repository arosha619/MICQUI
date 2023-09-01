import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SuccessfullyRegistered.css";

const SuccessfullyRegistered = () => {
  return (
    <div className="Outercontainer_sr">
      <div className="Container_sr">
      <img className="verified" src={require("../../Assets/verified.png")} alt="verified"/>
        <h1 className="title_sr">Successfully Verified !</h1>
      </div>
    </div>
  );
};

export default SuccessfullyRegistered;
