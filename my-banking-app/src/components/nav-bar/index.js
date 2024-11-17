import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import argentBankLogo from "./../../assets/argentBankLogo.png";
import "./../../Style/index.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../../app/storeSlices/userSlice";

function NavBar() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("authToken");
  const userStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    if (token && userStatus === "idle") {
      dispatch(fetchUserInfo());
    }
  }, [token, userStatus, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <div>
          {token ? (
            <div>
              {" "}
              <Link to="/user-account" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                {user?.userName}
              </Link>
              <button className="signout" onClick={handleLogout}>
                <i className="fa fa-sign-out"></i>
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/sign-in" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
export default NavBar;
