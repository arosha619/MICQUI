import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import profile from "../../Assets/profile.png";
import { updateAdmin } from "../../API/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  const [username, setUsername] = useState("");
  const [email, setemailname] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    var isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated || isAuthenticated == null) {
      alert("Need to login first");
      console.log("not authanticated");
      navigate("/");
    }
  }, []);

  if (!isAuthenticated || isAuthenticated === "false") {
    return null; // Stop rendering
  }

  const errors = {
    username: "Invalid username",
    usernameLength: "User name require more than 6 characters",
    email: "Invalid Email",
    noEmail: "Please enter your Email",
    noUsername: "Please enter your username",
    invalidEmail: "Invalid email format",
    uploadimage: "Please Upload a image",
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // Render error messages
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg_s">{errorMessages.message}</p>
    );
  const handleImageUpload = (file) => {
    setSelectedImage(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setErrorMessages({ name: "uploadimage", message: errors.uploadimage });
      return;
    }

    if (!username) {
      setErrorMessages({ name: "noUsername", message: errors.noUsername });
      return;
    }
    if (username.length < 6) {
      setErrorMessages({
        name: "usernameLength",
        message: errors.usernameLength,
      });
      return;
    }
    if (!email) {
      setErrorMessages({ name: "noEmail", message: errors.noEmail });
      return;
    } else if (!isValidEmail(email)) {
      setErrorMessages({ name: "invalidEmail", message: errors.invalidEmail });
    } else {
      setErrorMessages("");
      sendAdminUpdateData();
    }
  };
  const id=73;
  const sendAdminUpdateData = async () => {
    try {
      const formData = new FormData();
      formData.append("admin_name", username);
      formData.append("email", email);
      formData.append("profile_pic", selectedImage);

      var response = await updateAdmin(formData,id);
      console.log(response);
      setResponse(response);
      setShowModal(true);
    } catch (err) {
      alert("Error please try again!");
    }
  };

  return (
    <div className="d-flex">
      <SideBar />
      <div className="w-100 p-3">
        <div >
          <div>
            <h1 className="title_s">Update Your Profile Here!</h1>
            <form onSubmit={handleSubmit}>
              <div className="inputs_container_s">
                <label className="image_preview_s" htmlFor="imageInput">
                  <input 
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  {selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="circular_image"
                    />
                  ) : (
                    <div className="circular_image_placeholder">
                      <img src={profile} alt="selected image" />
                    </div>
                  )}
                </label>
                <p className="imgErr">{renderErrorMsg("uploadimage")}</p>

                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {renderErrorMsg("username")}
                {renderErrorMsg("noUsername")}
                {renderErrorMsg("usernameLength")}
                <input
                  type="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemailname(e.target.value)}
                />
                {renderErrorMsg("email")}
                {renderErrorMsg("noEmail")}
                {renderErrorMsg("invalidEmail")}
              </div>
              <input type="submit" value="Update Profile" className="update_button" />
            </form>
          </div>
          {showModal && (
            <Modal
              style={{ background: "rgba(15, 14, 14, 0.144)" }}
              show={showModal}
              onHide={() => setShowModal(false)}
            >
              <Modal.Header closeButton>
                {response.data.success ? (
                  <span className="text-success">Success</span>
                ) : (
                  <span className="text-warning ">Warning</span>
                )}
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                {response.data.message}
              </Modal.Body>
              <Modal.Footer>{/* Add any footer content here */}</Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
