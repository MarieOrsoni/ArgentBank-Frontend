import React from "react";
import { Link } from "react-router-dom";
import argentBankLogo from "./../../assets/argentBankLogo.png";
import "./../../Style/index.css";

function NavBar() {
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
          <Link to="/Sign-In" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}
export default NavBar;
