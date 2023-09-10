import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import Header from "../Header/Header";
import { getAllUsers, updateUser } from "../../API/axios";
import editIcon from "../../Assets/Icons/editIcon.svg";
import deleteIcon from "../../Assets/Icons/deleteIcon.svg";
import "./UserUpdate.css";
import UpdateUserModal from "./UpdateUserModal";
import { getadminbyID } from "../../API/axios";
import "./UserList.css";

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
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null) {
      alert("Need to login first");
      navigate("/");
    }
  }, []);

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

    try {
      updateUser(userID, formData)
        .then((res) => {
          setOpenmodal(false);
        })
        .catch((err) => {
        });
    } catch (err) {
    }
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
                <tr key={index}>
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
        />
      )}
    </div>
  );
};

export default UserList;
