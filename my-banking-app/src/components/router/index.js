import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../../pages/home/index.js";
import UserAccount from "../../pages/user-account/index.js";
import SignIn from "../../pages/sign-in/index.js";
import ProtectedRoute from "../../app/protectedRoutes.js";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/user-account" element={<UserAccount />} />
    </Route>
    <Route path ="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRouter;
