import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./../../app/storeSlices/loginSlice.js";

import "./../../Style/index.css";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const validateForm = () => {
    if (!email || !password) {
      setValidationError("Please enter both email and password.");
      return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setValidationError("Please enter a valid email address.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser({ email, password }));
    }
  };

  useEffect(() => {
    if (loginStatus === "succeeded") {
      navigate("/user-account");
    }
  }, [loginStatus, navigate]);

  return (
    <div className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <button type="submit" className="sign-in-button">
          Sign In
        </button>
        {loginStatus === "loading" && <p>Loading...</p>}
        {validationError && <p className="error-message">{validationError}</p>}
        {loginStatus === "failed" && (
          <p className="error-message">
            Incorrect email or password. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
