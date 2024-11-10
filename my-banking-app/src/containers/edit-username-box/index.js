import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../../app/storeSlices/updateUserSlice.js";
import CollapsibleList from "./../../components/dropdown/index";
import "./../edit-username-box/index.css";
import "./../../Style/index.css";
import { fetchUserInfo } from "../../app/storeSlices/userSlice.js";

const EditUserNameBox = ({ setIsEditBoxOpen }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const [isOpen, setIopen] = useState(true);
  const [user, setUser] = useState({
    userName: userInfo?.userName || "",
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
  });

  useEffect(() => {
    if (userInfo) {
      setUser({
        userName: userInfo.userName || "",
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
      });
    }
  }, [userInfo]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUserName(user)).then(() => {
      dispatch(fetchUserInfo());
    });
  };

  const closeBox = () => {
    setIopen(false);
    setIsEditBoxOpen(false);
  };

  return (
    <CollapsibleList
      className="edit-user-box"
      title="Edit Username"
      isOpen={isOpen}
    >
      <h1 className="title">Edit user info</h1>
      <form id="edit-box">
        <div className="form-group">
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            id="username"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
            placeholder={user.userName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First name:</label>
          <input
            className="no-edit-field"
            type="text"
            id="firstname"
            value={user.firstName}
            readOnly
            placeholder={user.lastName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last name:</label>
          <input
            className="no-edit-field"
            type="text"
            id="lastname"
            value={user.lastName}
            readOnly
            placeholder={user.lastName}
          />
        </div>
        <div className="form-button">
          <button
            onClick={handleUpdateUser}
            className="edit-button"
            type="submit"
          >
            Save
          </button>
          <button onClick={closeBox} className="edit-button" type="reset">
            Cancel
          </button>
        </div>
      </form>
    </CollapsibleList>
  );
};

export default EditUserNameBox;
