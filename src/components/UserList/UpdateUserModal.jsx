import React, { useState } from "react";

function UpdateUserModal({
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
  handleProfilePictureChange,
}) {
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfilePicture(file);
    handleProfilePictureChange(file);
  };

  return (
    <div className="user-update">
      <div className="user-update-container">
        <h3
          style={{
            padding: "20px 20px 30px 10px",
            borderBottom: "1px solid LightGray",
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
            <label>Company Name:</label>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            ></input>
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            ></input>
          </form>
        </div>
        <br/>
        <div style={{borderTop:'1px solid LightGray', padding:'10px'}}>
          <button onClick={() => setOpenmodal(false)}>Back</button>
          <button onClick={handleupdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserModal;
