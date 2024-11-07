import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../app/Services/loginSlice.js";

import "./../../Style/index.css";

  function LoginForm() { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginStatus = useSelector((state) => state.auth.loginStatus);
    const error = useSelector((state)=> state.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
        {loginStatus === "failed" && <p>Error: {error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
