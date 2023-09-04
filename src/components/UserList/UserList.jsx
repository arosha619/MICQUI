import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import Header from "../Header/Header";
import { deleteUser, getAllUsers, updateUser } from "../../API/axios";
import editIcon from "../../Assets/Icons/editIcon.svg";
import deleteIcon from "../../Assets/Icons/deleteIcon.svg";
import "./UserUpdate.css";
import UpdateUserModal from "./UpdateUserModal";
import { getadminbyID } from "../../API/axios";
import "./UserList.css";
import { Button, Modal } from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";

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

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const id = localStorage.getItem("user_id");

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
    <div className="d-flex">
      <SideBar />
      <div className="w-100 p-3">
        {adminData.map((item) => (
          <Header
            key={item.id}
            profile_pic={item.profile_pic}
            admin_name={item.admin_name}
          />
        ))}
        <form className="mb-3">
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search By Name..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </form>
        <div
          className="table-responsive"
          style={{ overflowY: "auto", maxHeight: "540px" }}
        >
          <table className="table table-borderless">
            <thead>
              <tr>
                <th style={{ padding: "10px" }}>
                  <input
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "7px",
                    }}
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  Select All
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <input
                      style={{ width: "20px", height: "20px" }}
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td>
                    <img
                      src={item.profile_pic}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: "45px", height: "45px" }}
                    />
                  </td>
                  <td>{item.full_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.role}</td>
                  <td>
                    {item.is_verified === 1 ? "Verified" : "Not Verified"}
                  </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <img
                        onClick={() => {
                          setPro_pic(item.profile_pic);
                          setFullname(item.full_name);
                          setRole(item.role);
                          setCompany(item.company_name);
                          setUserId(item.id);
                          setOpenmodal(true);
                        }}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "25px",
                          height: "25px",
                          marginRight: "20px",
                          cursor: "pointer",
                        }}
                        src={editIcon}
                      />
                      <img
                        onClick={() => {
                          setDeleteid(item.id);
                          setIsdelete(true);
                        }}
                        style={{
                          width: "25px",
                          height: "25px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        src={deleteIcon}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              <FaExclamationCircle
                size={24}
                style={{ marginLeft: "220px" }}
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
              <FaExclamationCircle
                size={24}
                style={{ marginLeft: "220px" }}
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
  );
};

export default UserList;
