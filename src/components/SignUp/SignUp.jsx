import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import profile from "../../Assets/profile.png"
import { createAdmin } from "../../API/axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setemailname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const errors = {
    username: "Invalid username",
    usernameLength:"User name require more than 6 characters",
    email: "Invalid Email",
    noEmail: "Please enter your Email",
    password: "Invalid password",
    noUsername: "Please enter your username",
    noPassword: "Please enter your password",
    invalidEmail: "Invalid email format",
    ComparePassword: "Passwords don't match",
    PasswordLength:"password should be more than 6 characters"

  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendAdminData = async () => {
   
    try {
      const formData = new FormData();
      formData.append("admin_name", username);
      formData.append("email", email);
      formData.append("profile_pic", selectedImage);
      formData.append("password", confirmPassword);

      var response = await createAdmin(formData);
      console.log(username );
      console.log(email );
      console.log(selectedImage );
      console.log(confirmPassword );
      console.log(formData);
      console.log(response);
      alert('successfull')
   
    } catch (err) {
      alert("Error please try again!");
     
    }
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      setErrorMessages({ name: "noUsername", message: errors.noUsername });
      return;
    }
    if (username.length < 6) {
      setErrorMessages({ name: "usernameLength", message: errors.usernameLength });
      return;
    }
    if (!email) {
      setErrorMessages({ name: "noEmail", message: errors.noEmail });
      return;
    } else if (!isValidEmail(email)) {
      setErrorMessages({ name: "invalidEmail", message: errors.invalidEmail });
    }

    if (!password) {
      setErrorMessages({ name: "noPassword", message: errors.noPassword });
      return;
    }
    if (password.length < 6) {
      setErrorMessages({ name: "PasswordLength", message: errors.PasswordLength });
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessages({
        name: "ComparePassword",
        message: errors.ComparePassword,
      });
    } else {
      setErrorMessages("");
      sendAdminData();
    }

  };

  // Render error messages
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );
  const handleImageUpload = (file) => {
    setSelectedImage(file);
  };

  return (
    <div className="Outercontainer">
      <div className="Container">
        <h1 className="title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs_container">
          <label className="image_preview" htmlFor="imageInput">
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
               <img src={profile} alt="selected image"/>
              </div>
            )}
          </label>

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
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {renderErrorMsg("password")}
            {renderErrorMsg("noPassword")}
            {renderErrorMsg("PasswordLength")}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {renderErrorMsg("password")}
            {renderErrorMsg("noPassword")}
            {renderErrorMsg("ComparePassword")}
          </div>
          <input type="submit" value="Sign Up" className="signup_button" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
