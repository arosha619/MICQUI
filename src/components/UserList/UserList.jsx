import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers, updateUser } from "../../API/axios";
import editIcon from "../../Assets/Icons/editIcon.svg";
import deleteIcon from "../../Assets/Icons/deleteIcon.svg";
import "./UserUpdate.css";
import UpdateUserModal from "./UpdateUserModal";
import { getadminbyID } from "../../API/axios";
import "./UserList.css";
import { Button, Modal } from "react-bootstrap";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Layout from "../Layout/Layout";
import pro_pic_default from "../../Assets/person_four.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Spinner/Spinner";

const UserList = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [pro_pic, setPro_pic] = useState(null);
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [userID, setUserId] = useState("");
  const [deleteid, setDeleteid] = useState("");
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  const [isdelete, setIsdelete] = useState(false);
  const [confirmdelete, setConfirmdelete] = useState(false);
  const [confirmupdate, setConfirmupdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const backgroundColor = 'white'; 
  const height = '100px';

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null) {
      alert("Need to login first");
      navigate("/");
    }
  }, []);

  const handleProfilePictureChange = (file) => {
    setPro_pic(file);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUserData(usersData.data.data);
        setFilteredData(usersData.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const AdminData = await getadminbyID(id);
        setAdminData(AdminData.data.data);
        console.log(AdminData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, [id]);

  if (!isAuthenticated || isAuthenticated === "false") {
    return null;
  }

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedData = filteredData.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setFilteredData(updatedData);
  };

  const handleCheckboxChange = (index) => {
    const updatedData = [...filteredData];
    updatedData[index].selected = !updatedData[index].selected;
    setFilteredData(updatedData);
  };

  const handleSearch = (searchTerm) => {
    const filtered = userData.filter((item) =>
      item.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleupdate = async () => {
    const formData = {
      full_name: fullname,
      profile_pic: pro_pic,
      role: role,
      company_name: company,
    };
    console.log(formData);

    try {
      updateUser(userID, formData)
        .then((res) => {
          console.log(res);
          setOpenmodal(false);
          setConfirmupdate(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = (id) => {
    setIsdelete(false);
    deleteUser(id)
      .then((res) => {
        console.log(res);
        setConfirmdelete(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="d-flex">
        <div className="w-100">
          <form className="mb-3 w-50">
            <div className="input-group w-100">
              <input
              style={{padding:'10px 20px',boxShadow:'0 2px 4px rgba(0, 0, 0, 0.1)'}}
                type="search"
                className="form-control"
                placeholder="Search here..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </form>
          <div className="card_header">
            <p>Image</p>
            <p>Name</p>
            <p>Email</p>
            <p>Phone</p>
            <p>Position</p>
            <p>Status</p>
            <p>Actions</p>
          </div>
          {loading ? <Loading backgroundColor={backgroundColor} height={height} /> : (<>
          {filteredData.map((item) => {
            return (
              <div className="card-wrapper" key={item.id}>
                <div className="profile-picture">
                  <img src={item.profile_pic} />
                </div>
                <p>{item.full_name}</p>
                <p>{item.email}</p>
                <p>077 8126872</p>
                <p>{item.role}</p>
                <p>{item.is_verified === 1 ? "Verified" : "Not Verified"}</p>
                <div className="action-button">
                  <FontAwesomeIcon
                    onClick={() => {
                      setPro_pic(item.profile_pic);
                      setFullname(item.full_name);
                      setRole(item.role);
                      setCompany(item.company_name);
                      setUserId(item.id);
                      setOpenmodal(true);
                    }}
                    icon={faPen}
                    style={{
                      color: "#000",
                      width: "20px",
                      height: "20px",
                      padding: "2px 10px",
                      cursor: "pointer",
                    }}
                  />
                  <FontAwesomeIcon
                    onClick={() => {
                      setDeleteid(item.id);
                      setIsdelete(true);
                    }}
                    icon={faTrash}
                    style={{
                      color: "red",
                      width: "20px",
                      height: "20px",
                      padding: "2px 10px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            );
          })}
          </> )}
        </div>
        {openModal && (
          <UpdateUserModal
            pro_pic={pro_pic}
            fullname={fullname}
            setFullname={setFullname}
            role={role}
            setRole={setRole}
            company={company}
            setCompany={setCompany}
            setOpenmodal={setOpenmodal}
            handleupdate={handleupdate}
            handleProfilePictureChange={handleProfilePictureChange}
          />
        )}
        {isdelete && (
          <Modal
            show={isdelete}
            onHide={() => setIsdelete(false)}
            style={{ background: "rgba(15, 14, 14, 0.144)" }}
          >
            <Modal.Header closeButton>
              <div className="d-flex justify-content-center align-items-center text-danger">
                <FaExclamationCircle
                  size={24}
                  style={{ marginLeft: "220px" }}
                  onClick={() => setIsdelete(false)}
                />
              </div>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center ">
              Are you sure to delete this user?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                variant="secondary"
                style={{ width: "100px" }}
                onClick={() => setIsdelete(false)}
              >
                No
              </Button>
              <Button
                variant="dark"
                style={{ width: "100px" }}
                onClick={() => handleDelete(deleteid)}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {confirmdelete && (
          <Modal
            show={confirmdelete}
            onHide={() => setConfirmdelete(false)}
            style={{ background: "rgba(15, 14, 14, 0.144)" }}
          >
            <Modal.Header closeButton>
              <div className="d-flex justify-content-center align-items-center text-danger">
                <FaCheckCircle
                  size={24}
                  style={{ marginLeft: "220px", color: "green" }}
                  onClick={() => setConfirmdelete(false)}
                />
              </div>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center ">
              User Deleted Successfully?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                variant="dark"
                style={{ width: "100px" }}
                onClick={() => {
                  setConfirmdelete(false);
                  window.location.reload();
                }}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {confirmupdate && (
          <Modal
            show={confirmupdate}
            onHide={() => setConfirmupdate(false)}
            style={{ background: "rgba(15, 14, 14, 0.144)" }}
          >
            <Modal.Header closeButton>
              <div className="d-flex justify-content-center align-items-center text-danger">
                <FaCheckCircle
                  size={24}
                  style={{ marginLeft: "220px", color: "green" }}
                  onClick={() => {
                    setConfirmupdate(false);
                    window.location.reload();
                  }}
                />
              </div>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center ">
              User Update Successfully?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                variant="dark"
                style={{ width: "100px" }}
                onClick={() => {
                  setConfirmupdate(false);
                  window.location.reload();
                }}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default UserList;
