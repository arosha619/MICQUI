import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import profile from "../../Assets/profile.png";
import {
  updateAdmin,
  deleteadminbyID,
  uppdtadmin,
  getadminbyID,
} from "../../API/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { BiLogOutCircle } from "react-icons/bi";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  var isAuthenticated = localStorage.getItem("isAuthenticated");
  const [username, setUsername] = useState("");
  const [email, setemailname] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [Logout, setLogout] = useState(false);
  const [DeleteSuccessfull, setDeleteSuccessfull] = useState(false);
  const [response, setResponse] = useState("");
  const id = localStorage.getItem("user_id");
  const [newProfilePic, setNewProfilePic] = useState("");
  useEffect(() => {
    getData();
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
  const getData = async () => {
    getadminbyID(id)
      .then((response) => {
        setUsername(response.data.data[0].admin_name);
        setemailname(response.data.data[0].email);
        setNewProfilePic(response.data.data[0].profile_pic);
        console.log(newProfilePic);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //console.log(email);
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

  const sendAdminUpdateData = async () => {
    const formData = new FormData();
    formData.append("admin_name", username);
    formData.append("email", email);
    formData.append("profile_pic", selectedImage);
    try {
      var response = await updateAdmin(id, formData);
      console.log(response);
      setResponse(response);
      setShowModal(true);
    } catch (err) {
      console.log(err);
      // alert("Error please try again!");
    }
  };

  const deleteAdmin = () => {
    setDeleteModal(true);
  };

  function deleteConfirmed() {
    var res = deleteadminbyID(id)
      .then(() => {
        setDeleteSuccessfull(true);
        setDeleteModal(false);
        localStorage.clear();
      })
      .catch((error) => {
        alert("Error deleting data:");
      });
  }
  function logout() {
    navigate("/");
    localStorage.clear();
  }

  return (
    <div className="d-flex">
      <div className="w-100 p-3">
        <div>
          <div>
            <h1 className="title_s">Update Your Profile Here!</h1>
            <form onSubmit={handleSubmit}>
              <div className="inputs_container_s">
                <label className="image_preview_s" htmlFor="imageInput">
                  <input
                    id="imageInput"
                    type="file"
                    //value={newProfilePic}
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
                      <img src={newProfilePic} style={{width:"100%"}} alt="selected image" />
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
              <input
                type="submit"
                value="Update Profile"
                className="update_button"
              />
            </form>
            <input
              type="submit"
              onClick={deleteAdmin}
              value="Delete Profile"
              className="delete_button"
            />
            <div className="center-container">
              <div className="logout" onClick={() => setLogout(true)}>
                <img
                  className="logout_img"
                  src={require("../../Assets/logout.png")}
                  alt="logout"
                />
                Log Out
              </div>
            </div>
          </div>
          {showModal && (
            <Modal
              style={{ background: "rgba(15, 14, 14, 0.144)" }}
              show={showModal}
              onHide={() => setShowModal(false)}
            >
              <Modal.Header closeButton>
                {response.data.success ? (
                  <div className="d-flex justify-content-center align-items-center text-danger">
                    <FaCheckCircle
                      size={24}
                      style={{ marginLeft: "220px", color: "green" }}
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center text-danger">
                    <FaExclamationCircle
                      size={24}
                      style={{ marginLeft: "220px" }}
                    />
                  </div>
                )}
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                {response.data.message}
              </Modal.Body>
              <Modal.Footer>{/* Add any footer content here */}</Modal.Footer>
            </Modal>
          )}
          {deleteModal && (
            <Modal
              style={{ background: "rgba(15, 14, 14, 0.144)" }}
              show={deleteModal}
              onHide={() => setDeleteModal(false)}
            >
              <Modal.Header closeButton className="text-center">
                <div className="d-flex justify-content-center align-items-center text-danger">
                  <FaExclamationCircle
                    size={24}
                    style={{ marginLeft: "220px" }}
                  />
                </div>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                Do You really want to delete this profile ?
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  variant="secondary"
                  onClick={() => setDeleteModal(false)}
                >
                  No
                </Button>
                <Button variant="dark" onClick={deleteConfirmed}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {DeleteSuccessfull && (
            <Modal
              style={{ background: "rgba(15, 14, 14, 0.144)" }}
              show={DeleteSuccessfull}
              onHide={() => setDeleteSuccessfull(false)}
            >
              <Modal.Header>
                <div className="d-flex justify-content-center align-items-center text-danger">
                  <FaCheckCircle
                    size={24}
                    style={{ marginLeft: "220px", color: "green" }}
                  />
                </div>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                Your Profile is Successfully deleted!
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button variant="dark" onClick={() => navigate("/")}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {Logout && (
            <Modal
              style={{ background: "rgba(15, 14, 14, 0.144)" }}
              show={Logout}
              onHide={() => setLogout(false)}
            >
              <Modal.Header closeButton>
                <div className="d-flex justify-content-center align-items-center text-danger">
                  <FaExclamationCircle
                    size={24}
                    style={{ marginLeft: "220px" }}
                  />
                </div>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                Are you sure you want to log out ?
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button variant="secondary" onClick={() => setLogout(false)}>
                  No
                </Button>
                <Button variant="dark" onClick={logout}>
                  Log Out
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
