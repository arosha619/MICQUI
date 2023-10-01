import React, { useState } from "react";

function UpdateUserModal({
  isVerified,
  setIsVerified,
  fullname,
  setFullname,
  role,
  setRole,
  company,
  setCompany,
  setOpenmodal,
  handleupdate,
  phone,
  setPhone,
  fullnameError,
  companyError,
  phoneError,
}) 

{
  return (
    <div className="user-update">
      <div className="user-update-container">
        <h3
          style={{
            padding: "15px 20px 25px 10px",
            borderBottom: "1px solid LightGray",
            fontSize: "20px",
          }}
        >
          Update User
        </h3>
        <div className="user-update-form" style={{ padding: "10px 30px" }}>
          <form
            style={{
              display: "grid",
              border: "1px solid LightGray",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <label>Full Name:</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            ></input>
             {!fullname ? ( <p style={{color:'red',textAlign:"left",fontSize:"10px"}}>{fullnameError}</p>) :""}
            <label>Role:</label>
            <select
              type="text"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
            <label>Verification:</label>
            <select
              type="number"
              value={isVerified}
              onChange={(e) => {
                setIsVerified(e.target.value);
              }}
            >
              <option value={1}>Verified</option>
              <option value={0}>Not Verified</option>
            </select>
            <label>Company Name:</label>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            ></input>
            {!company ? ( <p style={{color:'red',textAlign:"left",fontSize:"10px"}}>{companyError}</p>) :""}
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            ></input>
                 {phoneError ? ( <p style={{color:'red',textAlign:"left",fontSize:"10px"}}>{phoneError}</p>) :""}
          </form>
        </div>
        <br />
        <div style={{ borderTop: "1px solid LightGray", padding: "10px" }}>
          <button onClick={() => setOpenmodal(false)}>Back</button>
          <button onClick={handleupdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserModal;
