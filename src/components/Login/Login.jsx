import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../Assets/micqui_logo.jpg";
import { database } from "../../Data/Database";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { LoginApi } from "../../API/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

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
        alert("login success");
        window.location.href = `/user-list`;
      } else {
        // Authentication failed
        alert("login failed");
        const errorData = await res.message;
        setError(errorData || "Autenticación fallida");
      }
    } catch (error) {
      alert("login failed");
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
    <div className="Outcontainer">
      <div className="Container1">
        <img className="logo1" src={logo} alt="logo" />
        <h1 className="title1">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs_container1">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {renderErrorMsg("username")}
            {renderErrorMsg("noUsername")}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {renderErrorMsg("password")}
            {renderErrorMsg("noPassword")}
          </div>
          <input type="submit" value="Log In" className="login_button1" />
        </form>
        <div className="link_container">
          <a href="/sign-up" className="signup">
            Do not have an account? Sign Up Here
          </a>
          <a href="/forgot-password" className="small">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
