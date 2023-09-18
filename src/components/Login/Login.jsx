import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../Assets/micqui_logo.jpg";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../API/axios";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import Loading from "../Spinner/Spinner/Spinner";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const errors = {
    username: "Invalid username",
    password: "Invalid password",
    noUsername: "Please enter your username",
    noPassword: "Please enter your password",
  };
  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleSubmit = async (e) => {
    localStorage.clear();
    // Prevent page from reloading
    e.preventDefault();

    if (!username) {
      // Username input is empty
      setErrorMessages({ name: "noUsername", message: errors.noUsername });
      return;
    }

    if (!password) {
      // Password input is empty
      setErrorMessages({ name: "noPassword", message: errors.noPassword });
      return;
    }
    try {
      const data = {
        admin_name: username,
        password: password,
      };
      console.log(data);
      const res = await LoginApi(data);
      console.log(res.data.sub.id);
      if (res.data.success === true) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.sub.id);
        localStorage.setItem("isAuthenticated", true);
        setShowModal1(true);
        // window.location.href = `/user-list`;
      } else {
        // Authentication failed
        setShowModal2(true);
        const errorData = await res.message;
        setError(errorData || "Autenticación fallida");
      }
    } catch (error) {
      setShowModal2(true);
      // Handle any network or server errors
      setError("An error occurred. Please try again later.");
    }
  };

  // Render error messages
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="Outcontainer">
          <div className="Container1">
            <img className="logo1" src={logo} alt="logo" />
            <h1 className="title1"></h1>
            <form onSubmit={handleSubmit}>
              <div className="inputs_container1">
                <div className="input-container">
                  <span className="user-icon">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ paddingLeft: "30px", marginLeft: "5px" }}
                  />
                </div>{" "}
                {renderErrorMsg("username")}
                {renderErrorMsg("noUsername")}
                {/* //old site - https://micqui.web.app/#/buckets */}
                {/* Us:  admin@admin.com */}
                <div className="input-container">
                  <div className="input-field">
                  <div className="password-input-container">
                  <span className="password-icon">
                    <FaLock />
                  </span>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      // type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ paddingLeft: "30px", marginLeft: "5px" }}
                    />

                    {password ? (
                  <span
                    className="password-toggle-icon-login"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                ) : (
                  ""
                )}
                </div>
                    {renderErrorMsg("password")}
                    {renderErrorMsg("noPassword")}
                    {renderErrorMsg("PasswordLength")}
                  </div>
                </div>
                <div class="forget_password">
                  {/* <a href="/forgot-password" className="small">
                    Forgot Password ?
                  </a> */}
                </div>
              </div>
              <div className="buttons">
                <div className="login_button">
                  <span className="play-button">
                    <FaPlay></FaPlay>
                  </span>
                  <input
                    type="submit"
                    value="LOGIN"
                    className="login_button1"
                  />
                </div>
                {/* <div className="login_button">
              <span className="play-button">
                <FaPlay></FaPlay>
              </span>
              <a href="/sign-up" className="login_button1">
                SIGNUP
              </a>
            </div> */}

                <div className="footer-msg">
                  By clicking Login or Signup , You agree to our privacy policy
                  & terms of services
                </div>
              </div>
            </form>
            <div className="link_container"></div>
            {showModal1 && (
              <Modal
                style={{ background: "rgba(15, 14, 14, 0.144)" }}
                show={showModal1}
                onHide={() => setShowModal1(false)}
              >
                <Modal.Header >
                  <div className="d-flex justify-content-center align-items-center text-danger">
                    <FaCheckCircle
                      size={24}
                      style={{ marginLeft: "220px", color: "green" }}
                    />
                  </div>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center ">
                  Login Successfull!
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center ">
                  <Button variant="dark" onClick={() => navigate("/user-list")}>
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
            {showModal2 && (
              <Modal
                style={{ background: "rgba(15, 14, 14, 0.144)" }}
                show={showModal2}
                onHide={() => setShowModal2(false)}
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
                  Login failed!
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center ">
                  <Button variant="dark" onClick={() => setShowModal2(false)}>
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;