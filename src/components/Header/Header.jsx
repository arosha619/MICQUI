import React from 'react';
import "./Header.css"
import profile from "../../Assets/profile.png"

const Header = (props) => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-red" >
      <div className="container">
        <a className="navbar-brand" href="#">
         
        </a>
        <div className="ml-auto d-flex align-items-center" style={{gap:"20px"}}>
          <div className="profile-circle ">
            <img
              src={props.profile_pic ? props.profile_pic : profile}
              alt="Profile"
              className="profile-img"
            />
          </div>
          <div className="ml-2">
            <p className="mb-0 text">{props.admin_name}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;