import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../API/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal,Button } from "react-bootstrap";
import "./ForgotPassword.css";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setemailname] = useState("");
  const [passwordRes, setpaswordRes] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const errors = {
    email: "Invalid Email",
    noEmail: "Please enter your Email",
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendEmail = async () => {
    try {
      const Email = {
        email: email,
      };
      var response = await forgotPassword(Email);
      setpaswordRes(response);
      setShowModal(true);
    } catch (err) {
      alert("Error please try again!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessages({ name: "noEmail", message: errors.noEmail });
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessages({ name: "invalidEmail", message: errors.invalidEmail });
    } else {
      setErrorMessages("");
      sendEmail();
    }
  };

  // Render error messages
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );
  return (
    <div className="Outercontainer_c">
      <div className="Container_c">
        <h1 className="title_c">Forgot Password ?</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs_container_c">
            <input
              type="Email"
              placeholder="Enter Your Email Here"
              value={email}
              onChange={(e) => setemailname(e.target.value)}
            />
            {renderErrorMsg("email")}
            {renderErrorMsg("noEmail")}
            {renderErrorMsg("invalidEmail")}
          </div>
          <input type="submit" value="Send" className="send_button" />
        </form>
      </div>
      {showModal && (
        <Modal
          style={{ background: "rgba(15, 14, 14, 0.144)" }}
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            {passwordRes.data.success ? (
              <div className="d-flex justify-content-center align-items-center text-danger">
                <FaCheckCircle
                  size={24}
                  style={{ marginLeft: "220px", color: "green" }}
                />
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-center align-items-center text-danger">
                  <FaExclamationCircle
                    size={24}
                    style={{ marginLeft: "220px" }}
                  />
                </div>
              </>
            )}
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center ">
            {passwordRes.data.message}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="dark" onClick={() => setShowModal(false)}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ForgotPassword;
