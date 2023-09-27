import React, { useEffect, useState } from "react";
import "./Layout.css";
import logo from "../../Assets/logo/logo.png";
import logoOnly from "../../Assets/logo/logoOnly.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import {
  faBars,
  faBarsStaggered,
  faBucket,
  faRightFromBracket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar(props) {
  const [logoutModal, setLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 960) {
        props.setIsshow(false);
      } else {
        props.setIsshow(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`side-bar ${props.isshow ? "" : "collapsed"}`}>
      {/* <div>
        <FontAwesomeIcon
          onClick={() => {
            props.setIsshow(!props.isshow);
          }}
          icon={!props.isshow ? faBars : faBarsStaggered}
          style={
            props.isshow
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
      </div> */}
      <div className="logo-container">
        <Link to="/my-buckets">
          {props.isshow ? (
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
          {props.isshow && "Bucket List"}
        </NavLink>
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
          {props.isshow && "User List"}
        </NavLink>

        <Link onClick={() => setLogoutModal(true)}>
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
            {props.isshow && "Log Out"}
          </div>
        </Link>
      </div>
      {logoutModal && (
        <Modal
          style={{ background: "rgba(15, 14, 14, 0.144)" }}
          show={logoutModal}
          onHide={() => setLogoutModal(false)}
        >
          <Modal.Header closeButton className="text-center">
            <div className="d-flex justify-content-center align-items-center text-danger">
              <FaExclamationCircle size={24} style={{ marginLeft: "220px" }} />
            </div>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center ">
            Are you sure you want to Logout ?
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="secondary" onClick={() => setLogoutModal(false)}>
              No
            </Button>
            <Button variant="dark" onClick={() => navigate("/")}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Sidebar;
