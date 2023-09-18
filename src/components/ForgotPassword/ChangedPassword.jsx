import React, { useEffect, useState } from "react";
import "./ChangedPassword.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { resetPasword } from "../../API/axios";

const ChangedPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("id");
    const token = searchParams.get("token");
  }, [location.search]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState("");

  const navigate = useNavigate();

  const errors = {
    password: "Invalid password",
    noUsername: "Please enter your username",
    noPassword: "Please enter your password",
    ComparePassword: "Passwords don't match",
    PasswordLength: "Password should be more than 6 characters",
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendAdminData = async () => {
    try {
      setResponse(response);
      setShowModal(true);
    } catch (err) {
      alert("Error please try again!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setErrorMessages({ name: "noPassword", message: errors.noPassword });
      return;
    }
    if (password.length < 6) {
      setErrorMessages({
        name: "PasswordLength",
        message: errors.PasswordLength,
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessages({
        name: "ComparePassword",
        message: errors.ComparePassword,
      });
    } else {
      setErrorMessages("");

      try {
        const response = await resetPasword({
          newPassword: password,
          confirmPassword: confirmPassword,
        });

        if (response.data.success) {
          setResponse(response);
          setShowModal(true);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Password reset failed. Please try again.");
      }
    }
  };

  // Render error messages
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );

  return (
    <div className="Outercontainer">
      <div className="Container">
        <h1 className="title">Change Your Password Here!</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs_container">
            <div className="input-container">
              <div className="input-field">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {renderErrorMsg("password")}
                {renderErrorMsg("noPassword")}
                {renderErrorMsg("PasswordLength")}
                {password ? (
                  <span
                    className="password-toggle-icon"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="input-container">
              <div className="input-field">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {renderErrorMsg("password")}
                {renderErrorMsg("noPassword")}
                {renderErrorMsg("ComparePassword")}
                {confirmPassword ? (
                  <span
                    className="password-toggle-icon"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Change Password"
            className="password_button"
          />
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
  );
};

export default ChangedPassword;
