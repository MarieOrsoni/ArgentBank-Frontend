import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../app/slices";
import { Link } from "react-router-dom";
import "./../../Style/index.css";
import "./index.css";

function NavMenuUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.users);
  const [username, setUsername] = useState("");
  

   
    useEffect(() => {
      const token = localStorage.getItem("authToken");
if (token) { 
      dispatch(fetchUserInfo());
    } 
     } , [dispatch]);
  
    useEffect(() => {
      if (user && user.userName) {
        setUsername(user.userName); 
      }
    }, [user]);

    const handleLogout = () => {
      localStorage.removeItem("authToken");
      window.location.href = "/";
      
    };
 

  return (
    <header>
      <nav className="main-nav main-nav-log">
        <Link to="/" className="main-nav-logged">
          <h1 className="argent-bold">Argent</h1>
          <h1 className="bank-notbold">Bank</h1>
        </Link>

        <div className="settings">
          <p className="username">{username}</p>
          <i className="fa-regular fa-user"></i>
          <i className="fa-solid fa-gear"></i>
          <i className="fa-solid fa-power-off" onClick={handleLogout}></i>
        </div>
      </nav>
    </header>
  );
}
export default NavMenuUser;