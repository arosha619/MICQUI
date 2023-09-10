import React,{useState,useEffect} from "react";
import "./Layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Loading from "../Spinner/Spinner";

function Layout({ children }) {
  const [loading, setLoading] = useState(true);
  const backgroundColor = 'white'; 
  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      
      <div className="wrapper">
      {loading ? <Loading backgroundColor={backgroundColor} />:(<>
        <Header />
        <div className="content">{ children }</div>
        </> )}
      </div>
      
    </div>
  );
}

export default Layout;
