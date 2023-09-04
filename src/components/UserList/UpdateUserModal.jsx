import React, { useState } from "react";

function UpdateUserModal({
  pro_pic,
  fullname,
  setFullname,
  role,
  setRole,
  company,
  setCompany,
  setOpenmodal,
  handleupdate,
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
        <h3 style={{ padding: "10px" }}>Update User</h3>
        <div className="user-update-form" style={{ padding: "0 70px" }}>
          <form style={{ display: "grid" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
            <img
              style={{ maxWidth: "15vw", cursor: "pointer" }}
              src={
                selectedProfilePicture
                  ? URL.createObjectURL(selectedProfilePicture)
                  : pro_pic
              }
              alt="profile_pic"
              onClick={() => {
                document.querySelector('input[type="file"]').click();
              }}
            />
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
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
            <label>Company Name:</label>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            ></input>
          </form>
        </div>
        <button onClick={() => setOpenmodal(false)}>Back</button>
        <button onClick={handleupdate}>Update</button>
      </div>
    </div>
  );
}

export default UpdateUserModal;
