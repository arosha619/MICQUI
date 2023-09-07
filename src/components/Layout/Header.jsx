import React, { useEffect, useState } from "react";
import { getadminbyID } from "../../API/axios";
import pro_pic_default from "../../Assets/img/propic.jpeg";

function Header() {
  const id = localStorage.getItem("user_id");
  const [admin_propic, setAdmin_propic] = useState(null);
  const [admin_name, setAdmin_name] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const AdminData = await getadminbyID(id);
        setAdmin_propic(AdminData.data.data[0].profile_pic);
        setAdmin_name(AdminData.data.data[0].admin_name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAdmin();
  }, [id]);

  return (
    <div className="header">
      <div className="menu">
        <div className="menu-title">
          <h3>User List</h3>
        </div>
      </div>
      <div className="menu-profile">
        <div className="menu-profile-name">
          <h5>{admin_name}</h5>
        </div>
        <div className="profile-pic">
          <img
            src={admin_propic || pro_pic_default}
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
