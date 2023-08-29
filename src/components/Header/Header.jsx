import React from 'react';
import "./Header.css"
import profile from "../../Assets/profile.png"

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-red" >
      <div className="container">
        <a className="navbar-brand" href="#">
         
        </a>
        <div className="ml-auto d-flex align-items-center" style={{gap:"20px"}}>
          <div className="profile-circle ">
            <img
              src={profile}
              alt="Profile"
              className="profile-img"
            />
          </div>
          <div className="ml-2">
            <p className="mb-0 text">Admin Name</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;