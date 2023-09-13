import React, { useEffect, useState } from "react";
import "./Layout.css";
import logo from "../../Assets/logo/logo.png";
import logoOnly from "../../Assets/logo/logoOnly.png";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBarsStaggered,
  faBucket,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [isshow, setIsshow] = useState(true);

  const toggleSidebar = () => {
    setIsshow(!isshow);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 960) {
        setIsshow(false);
      } else {
        setIsshow(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`side-bar ${isshow ? "" : "collapsed"}`}
      style={isshow ? {} : { width: "60px" }}
    >
      <div>
        <FontAwesomeIcon
          onClick={() => {
            setIsshow(!isshow);
          }}
          icon={!isshow ? faBars : faBarsStaggered}
          style={
            isshow
              ? {
                  color: "rgba(0,0,0,0.8)",
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  right: "-50px",
                  top: "35px",
                  cursor: "pointer",
                }
              : {
                  color: "rgba(0,0,0,0.8)",
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  cursor: "pointer",
                  right: "-50px",
                  top: "35px",
                }
          }
        />
      </div>
      <div className="logo-container">
        <Link to="/">
          {isshow ? (
            <img src={logo} alt="Logo" />
          ) : (
            <div className="plane-logo">
              <img src={logoOnly} alt="Logo" />
            </div>
          )}
        </Link>
      </div>

      <div className="menu-wrapper">
        <NavLink
          to="/user-list"
          className="menu-button"
          activeClassName="activeLink"
        >
          <FontAwesomeIcon
            icon={faUsers}
            style={{
              color: "#fff",
              width: "20px",
              height: "20px",
              paddingRight: "20px",
            }}
          />
          {isshow && "User List"}
        </NavLink>
        <NavLink
          to="/my-buckets"
          className="menu-button"
          activeClassName="activeLink"
        >
          <FontAwesomeIcon
            icon={faBucket}
            style={{
              color: "#fff",
              width: "20px",
              height: "20px",
              paddingRight: "20px",
            }}
          />
          {isshow && "Bucket List"}
        </NavLink>
        <Link to="/">
          <div className="menu-button logOut">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{
                color: "#fff",
                width: "20px",
                height: "20px",
                paddingRight: "20px",
              }}
            />
            {isshow && "Log Out"}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
