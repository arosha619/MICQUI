import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers, updateUser } from "../../API/axios";
import "./UserUpdate.css";
import UpdateUserModal from "./UpdateUserModal";
import { getadminbyID } from "../../API/axios";
import "./UserList.css";
import { Button, Modal } from "react-bootstrap";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Layout from "../Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Spinner/Spinner";

const UserList = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isVerified, setIsVerified] = useState();
  const [company, setCompany] = useState("");
  const [userID, setUserId] = useState("");
  const [deleteid, setDeleteid] = useState("");
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  const [isdelete, setIsdelete] = useState(false);
  const [confirmdelete, setConfirmdelete] = useState(false);
  const [confirmupdate, setConfirmupdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const backgroundColor = "white";
  const height = "100px";
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const [loadingData, setLoadingData] = useState(true);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const id = localStorage.getItem("user_id");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null) {
      alert("Need to login first");
      navigate("/");
    }
  }, []);

  // Handle page navigation
  const nextPage = () => {
    if (indexOfLastUser < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setRefresh(false);
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        console.log(usersData.data.data);
        setUserData(usersData.data.data);
        setFilteredData(usersData.data.data);
        setLoadingData(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, [refresh]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const AdminData = await getadminbyID(id);
        setAdminData(AdminData.data.data);
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
      role: role,
      phone_num: phone,
      company_name: company,
      is_verified: isVerified,
    };
    console.log(formData);
    try {
      updateUser(userID, formData)
        .then((res) => {
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
    <Layout
      Title={
        "Users(" +
        (filteredData.length !== null ? filteredData.length : 0) +
        ")"
      }
    >
      {loadingData ? (
        <Loading backgroundColor={backgroundColor} height={height} />
      ) : (
        <div className="d-flex">
          <div className="w-100">
            <form className="mb-3 w-50">
              <div className="input-group w-100">
                <input
                  style={{
                    padding: "10px 20px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  type="search"
                  className="form-control"
                  placeholder="Search here by Name..."
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </form>
            <div className="card_header">
              <p>Name</p>
              <p>Email</p>
              <p>Phone</p>
              <p>Company</p>
              <p>Position</p>
              <p>Status</p>
              <p>Actions</p>
            </div>
            {loading ? (
              <Loading backgroundColor={backgroundColor} height={height} />
            ) : (
              <>
                {currentUsers.reverse().map((item) => {
                  return (
                    <div className="card-wrapper" key={item.id}>
                      <p>{item.full_name}</p>
                      <p>{item.email}</p>
                      <p>{item.phone_num}</p>
                      <p>{item.company_name}</p>
                      <p>{item.role}</p>
                      <p>
                        {item.is_verified === 1 ? "Verified" : "Not Verified"}
                      </p>
                      <div className="action-button">
                        <FontAwesomeIcon
                          onClick={() => {
                            setIsVerified(item.is_verified);
                            setFullname(item.full_name);
                            setRole(item.role);
                            setCompany(item.company_name);
                            setPhone(item.phone_num);
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
              </>
            )}
          </div>

          {openModal && (
            <UpdateUserModal
              isVerified={isVerified}
              setIsVerified={setIsVerified}
              phone={phone}
              setPhone={setPhone}
              fullname={fullname}
              setFullname={setFullname}
              role={role}
              setRole={setRole}
              company={company}
              setCompany={setCompany}
              setOpenmodal={setOpenmodal}
              handleupdate={handleupdate}
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
                User Deleted Successfully!
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  style={{ width: "100px" }}
                  onClick={() => {
                    setConfirmdelete(false);
                    setRefresh(true);
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
                      setRefresh(true);
                    }}
                  />
                </div>
              </Modal.Header>
              <Modal.Body className="d-flex justify-content-center ">
                User Update Successfully!
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  style={{ width: "100px" }}
                  onClick={() => {
                    setConfirmupdate(false);
                    setRefresh(true);
                  }}
                >
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          <div className="pagination">
            <button
              id="previous"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              id="next"
              onClick={nextPage}
              disabled={indexOfLastUser >= filteredData.length}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserList;
