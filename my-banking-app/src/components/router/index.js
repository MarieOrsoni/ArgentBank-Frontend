import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./../../pages/home/index.js";
import UserAccount from "../../pages/user-account/index.js";
import SignIn from "../../pages/sign-in/index.js";


const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/user-account" element={<UserAccount />} />
    <Route path="/sign-in" element={<SignIn />} />
   
  </Routes>
);

export default AppRouter;
