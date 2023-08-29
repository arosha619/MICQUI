import React, { useState } from "react";
import "./Login.css";
import logo from "../../Assets/micqui_logo.jpg";
import { database } from "../../Data/Database";
import { useNavigate } from "react-router-dom";
import {FaUserAlt} from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const errors = {
    username: "Invalid username",
    password: "Invalid password",
    noUsername: "Please enter your username",
    noPassword: "Please enter your password",
  };

  const handleSubmit = (e) => {
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

    // Search for user credentials
    const currentUser = database.find((user) => user.username === username);

    if (currentUser) {
      if (currentUser.password !== password) {
        // Wrong password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        // Correct password, log in user
      
        setErrorMessages({});
        // setAuthenticated(true);

        localStorage.setItem('isAuthenticated', true);
      
        navigate("/user-list");
      }
    } else {
      // Username doens't exist in the database
      setErrorMessages({ name: "username", message: errors.username });
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
        <img className="logo" src={logo} alt="logo" />
        <h1 className="title">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs_container">
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
          <input type="submit" value="Log In" className="login_button" />
        </form>
        <div className="link_container">
        <a href="/sign-up" className="signup">
            Do not have an account? Sign Up Here
          </a>
          <a href="" className="small">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
